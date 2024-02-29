module.exports = (sequelize, DataTypes) => {
    const ErrorLogger = sequelize.define('errorLogger', {
        message: {
            type: DataTypes.TEXT
        },
        url: {
            type: DataTypes.STRING
        },
        method: {
            type: DataTypes.STRING,
        },
        host: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.TEXT
        },
        userData: {
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        }
    }, {
        freezeTableName: true,
        tableName: 'error_logger',
        timestamps: false
    })
    return ErrorLogger;

}