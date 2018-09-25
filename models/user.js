const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName:{
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    rate: {
      type: DataTypes.DOUBLE,
    }
  });
  
  User.associate = models => {
    User.hasMany(models.Food);
  };

  return User;
};

module.exports = user;