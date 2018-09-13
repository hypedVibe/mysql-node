const bar = (sequelize, DataTypes) => {
  const Bar = sequelize.define('bar', {
    age: {
      type: DataTypes.INTEGER
    }
  });
  
  Bar.associate = models => {
    Bar.belongsTo(models.Foo);
  };

  return Bar
};

module.exports = bar;