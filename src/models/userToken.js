module.exports = (sequelize, Sequelize) => {
    const userToken = sequelize.define('userToken', {
      userId: {
        type: Sequelize.INTEGER,
        field: "user_id",
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "token"
      },
    }, {
      freezeTableName: true,
      tableName: "userToken",
    })
    return userToken
  }