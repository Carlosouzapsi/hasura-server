// Transformar esse código em uma classe
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Transactions", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
