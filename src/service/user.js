const models = require("../models")
const path = require("path")
const Sequelize = models.Sequelize
const { signToken } = require('../utils/jwt')





exports.addRole = async (reqBody) => {
    const { roleName, description } = reqBody
        const roleExists = await models.role.findOne({ where: { roleName: roleName } })

        if (roleExists) {return { message: "Role already exists" }}
        const role = await models.role.create({ roleName, description,createdBy:1,updatedBy:1 })
        return role

}

exports.register = async (reqBody) => {
    const { name, email, mobileNumber, password } = reqBody
        const userExists = await models.user.findOne({
            where: { email: email }
        })
        if (userExists) {
            return {
                message:"User already Exists",
                status:409
            }
        }
        else {
            const result = await models.user.create({ name, email, mobileNumber, password, roleId: 2, isActive: true })
            return {
                message:result,
                status:201
            }
        }
    
}

exports.login= async (reqBody) => {
    const { email, password } = reqBody
    const result = await models.user.findOne({
        where: {
            email
        },
        include:[{
            model:models.role
        }]
    })
    if (!result) {
        return {
            status:404,
            message:'User not found'
        }

    } else {
        const checkPassword = await result.comparePassword(password)
        if (checkPassword) {
            const token = await signToken({
                email: result.dataValues.email,
                mobileNumber: result.dataValues.mobileNumber,
                roleId: result.roles[0].id,
                id: result.dataValues.id
            })
            console.log(token,'signtoken')
            await models.userToken.create({
                userId: result.dataValues.id,
                token: token
            })
            return {
                message: "User Login Successfully",
                token: token,
                name: result.name,
                email: result.email,
                status:200
            }
        } else {
            return{
                status:400,
                message: "Wrong Credentials"
            }
        }
    }
}

exports.logout = async (req) => {
    const user = await models.user.findOne({
        where: { email: req.userDetails.email }
    })
    const remove = await models.userToken.destroy({
        where: { userId: user.id }
    })
    return remove
}

exports.getAllRegisterUser = async (req) => {
        const result = await models.user.findAll({
            include: [{
                model: models.role
            }]
        })
        return result
    
}
