const foo = (sequelize, DataTypes) => {
  const Foo = sequelize.define('foo', {
    name: {
      type: DataTypes.STRING
    }
  })

  Foo.associate = models => {
    Foo.hasMany(models.Bar);
  };

  return Foo;
};

module.exports = foo;