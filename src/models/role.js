module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
      // attributes
      roleName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
      isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
      },
      createdBy: {
          type: DataTypes.INTEGER,
      },
      updatedBy: {
          type: DataTypes.INTEGER,
      },
  }, {
      freezeTableName: true,
      allowNull: false,
      tableName: 'role',
  });


  Role.findUniqueRole = (roleName) => Role.findOne({ where: { roleName } });


  Role.removeRole = (id) => Role.update({ isActive: false }, { where: { id: id, isActive: true } });

  Role.addRole = (roleName, description, createdBy, updatedBy) => Role.create({ roleName, description, createdBy, updatedBy });

  Role.updateRole = (roleName, description, updatedBy, id) => Role.update({ roleName, description, updatedBy }, { where: { id } });

  Role.deleteRole = (id) => Role.update({ isActive: false }, { where: { id } });

  Role.associate = function (models) {
      Role.belongsToMany(models.user, { through: models.userRole });
      Role.belongsToMany(models.permission, { through: models.rolePermission });
      Role.belongsTo(models.user, { foreignKey: 'createdBy', as: 'createdByUser' });
      Role.belongsTo(models.user, { foreignKey: 'updatedBy', as: 'updatedByUser' });
  }

  return Role;
}
