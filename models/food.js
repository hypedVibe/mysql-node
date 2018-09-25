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
  });
  
  Food.associate = models => {
    Food.belongsTo(models.User);
  };

  return Food
};

module.exports = food;