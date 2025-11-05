const sequelize = require('../config/db');
const Category = require('./category');
const SubCategory = require('./subcategory');
const Item = require('./item');

Category.hasMany(SubCategory, {
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });

SubCategory.hasMany(Item, {
  foreignKey: 'subCategoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Item.belongsTo(SubCategory, { foreignKey: 'subCategoryId' });

const syncDB = async (opts = { alter: true }) => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection OK');
    await sequelize.sync(opts);
    console.log('✅ Models synced');
  } catch (err) {
    console.error('❌ DB sync error', err);
    throw err;
  }
};

module.exports = {
  sequelize,
  Category,
  SubCategory,
  Item,
  syncDB
};
