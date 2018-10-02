const bookedFood = (sequelize, DataTypes) => {
  const BookedFood = sequelize.define('booked_food', {
    supplierId: {
      type: DataTypes.INTEGER
    },
    recipientId: {
      type: DataTypes.INTEGER
    }
  }, { freezeTableName: true });
  
  BookedFood.associate = models => {
    BookedFood.belongsTo(models.User);
    BookedFood.belongsTo(models.Food);
  };

  return BookedFood;
};

module.exports = bookedFood;