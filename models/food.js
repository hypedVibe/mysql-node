const food = (sequelize, DataTypes) => {
  const Food = sequelize.define('food', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
    },
    expirationTime: {
      type: DataTypes.DATEONLY,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });
  
  Food.associate = models => {
    Food.belongsTo(models.User);
    Food.hasOne(models.BookedFood);
  };

  return Food;
};

module.exports = food;