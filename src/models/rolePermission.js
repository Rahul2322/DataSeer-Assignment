module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('rolePermission', {
        // attributes
        roleId: {
            type: DataTypes.INTEGER,
        },
        permissionId: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'role_permission'
    });

    RolePermission.associate = function(models) {
        RolePermission.belongsTo(models.role, { foreignKey: 'roleId', as: 'role' });
        RolePermission.belongsTo(models.permission, { foreignKey: 'permissionId', as: 'permission' });
    }
    
    return RolePermission;
}
