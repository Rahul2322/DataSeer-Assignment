const bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mobileNumber: {
      type: Sequelize.STRING, // Assuming mobile number is stored as string
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isNumeric: true, // Validates if it's a numeric value
        len: [10], // Validates length, you can adjust as per your requirements
      },
    },
    fileName: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true, // Assuming isActive defaults to true
    },
  }, {
    freezeTableName: true,
    tableName: "user",
    modelName: 'User',
  });

  //associations
  User.associate = function (models) {
    User.belongsToMany(models.role, { through: models.userRole });
  };

  // Hash password before creating a user
  User.beforeCreate(async (user, options) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
  });

  //compare password
  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
