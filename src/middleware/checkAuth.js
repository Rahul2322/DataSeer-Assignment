const { verifyToken } = require('../utils/jwt');
const db = require('../models');
const redisClient = require('../utils/redis');

exports.verifyTokenMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ success: false, message: 'Token Validation Failed: Authorization header missing' });
        }

        const token = authorizationHeader.split(' ')[1];
        const tokenInRedis = await redisClient.get(token);

        if (tokenInRedis) {
            const userDetails = await verifyToken(tokenInRedis);
            req.userDetails = userDetails;
            console.log(req.userDetails,'userDetails')
            next();
        } else {
            console.log('first')
            const tokenData = await db.userToken.findOne({ where: { token } });

            if (!tokenData) {
                return res.status(401).json({ success: false, message: 'Token Validation Failed: Invalid token' });
            }

            const userDetails = await verifyToken(token);
            if (!userDetails) {
                return res.status(401).json({ success: false, message: 'Token Validation Failed: Invalid user details' });
            }
            const activeUser = await db.user.findOne({ where: { email: userDetails.email, isActive: true } });

            if (!activeUser) {
                return res.status(401).json({ success: false, message: 'Token Validation Failed: User not active or unauthorized' });
            }

            await redisClient.setEx(token, 1800, token);
            req.userDetails = userDetails;
           
            next();
        }
    } catch (error) {
        console.error('Error in token verification middleware:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
