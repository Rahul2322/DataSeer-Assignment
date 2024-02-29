module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('userRole', {
        // attributes
        userId: {
            type: DataTypes.INTEGER,
        },
        roleId: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'user_role'
    });

    UserRole.getAllRole = (userId) => UserRole.findAll({ where: {userId, isActive: true }, attributes: ['roleId']});

    UserRole.getAllUser = (roleId) => UserRole.findAll({ where: {roleId, isActive: true }, attributes: ['userId']});
    
    UserRole.associate = function(models) {
        UserRole.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
        UserRole.belongsTo(models.role, { foreignKey: 'roleId', as: 'role' });
    }


    return UserRole;
}
