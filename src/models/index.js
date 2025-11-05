const sequelize = require('../config/db');
const Category = require('./category');
const SubCategory = require('./subcategory');
const Item = require('./item');

// ✅ Define model associations before syncing
Category.hasMany(SubCategory, {
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',
});
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });

SubCategory.hasMany(Item, {
  foreignKey: 'subCategoryId',
  onDelete: 'CASCADE',
});
Item.belongsTo(SubCategory, { foreignKey: 'subCategoryId' });

// You can optionally also make Items directly belong to Category
Item.belongsTo(Category, { foreignKey: 'categoryId' });

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    await sequelize.sync({ alter: true }); // use { force: true } to reset
    console.log('✅ All models synced successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};

module.exports = { sequelize, Category, SubCategory, Item, syncDB };
