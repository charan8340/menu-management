const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./category');
const SubCategory = require('./subcategory');

const Item = sequelize.define('Item', {
  name: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  taxApplicable: { type: DataTypes.BOOLEAN, defaultValue: false },
  taxRate: { type: DataTypes.FLOAT },
  taxType: { type: DataTypes.STRING },
  baseAmount: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  totalAmount: { type: DataTypes.FLOAT }
}, {
  tableName: 'items',
  timestamps: true,
});

// Associations
Item.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Item.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });

// Auto-calculate total before saving
Item.beforeCreate((item) => {
  item.totalAmount = item.baseAmount - (item.discount || 0);
});

module.exports = Item;
