module.exports = (sequelize, DataTypes) => {
    const Entity = sequelize.define('entity', {
        // attributes
        entityName: {
            type: DataTypes.STRING,
            field: 'entity_name',
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            field: 'description'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true,
        }
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'entity',
    });


    Entity.associate = function (models) {
        Entity.hasMany(models.permission, { foreignKey: 'entityId', as: 'permission' });
    }

    return Entity;
}
