const models = require("../models")
exports.checkRolePermission = async (req, res, next) => {
console.log('sjfskksdhshkdshakdhsdjlsjdlwdjlwdjwjdwljdwljdwjedwjdj')
    try {
        const role = req.userDetails.roleId;
        console.log(role,'role')
        // const role = req.user.roleId
        const result = await models.rolePermission.findAll({
            where: { roleId: role }

        })
        let match = false;
        result.map((e) => {
            if (e.dataValues.permissionSystemInfo.dataValues.systemInfo.method === req.method && e.dataValues.permissionSystemInfo.dataValues.systemInfo.baseUrl === req.baseUrl && e.dataValues.permissionSystemInfo.dataValues.systemInfo.path == req.url) {
                match = true
            }
        })
        if (match) {
            next()
        } else {
            res.status(403).json({ message: 'forbidden' })
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({ status: true, message: "Please signin again!", data: err })
    }
}