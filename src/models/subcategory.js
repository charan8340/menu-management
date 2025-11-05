const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./category');

const SubCategory = sequelize.define('SubCategory', {
  name: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  taxApplicable: { type: DataTypes.BOOLEAN },
  taxRate: { type: DataTypes.FLOAT },
  taxType: { type: DataTypes.STRING }
}, {
  tableName: 'subcategories',
  timestamps: true,
});

// Associations
Category.hasMany(SubCategory, {
  foreignKey: 'categoryId',
  as: 'subcategories',
  onDelete: 'CASCADE'
});
SubCategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

module.exports = SubCategory;
