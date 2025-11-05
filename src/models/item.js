const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  tax_applicable: { type: DataTypes.BOOLEAN, defaultValue: false },
  tax: { type: DataTypes.FLOAT, defaultValue: 0 },
  base_amount: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  total_amount: { type: DataTypes.FLOAT, allowNull: false },
  // subCategoryId will be added by association
  subCategoryId: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'Items',
  timestamps: true,
});

// calculate total_amount before create and before update if needed
Item.beforeCreate((item) => {
  item.total_amount = Number(item.base_amount) - Number(item.discount || 0);
});
Item.beforeUpdate((item) => {
  if (item.base_amount !== undefined || item.discount !== undefined) {
    item.total_amount = Number(item.base_amount) - Number(item.discount || 0);
  }
});

module.exports = Item;
