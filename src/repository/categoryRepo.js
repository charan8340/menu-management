import { Category } from "../models/index.js";

export const categoryRepo = {
  async createCategory(data) {
    return await Category.create(data);
  },

  async getAllCategories() {
    return await Category.findAll();
  },

  async getCategoryById(id) {
    return await Category.findByPk(id);
  },

  async updateCategory(id, data) {
    const [updated] = await Category.update(data, { where: { id } });
    return updated ? await Category.findByPk(id) : null;
  },

  async deleteCategory(id) {
    return await Category.destroy({ where: { id } });
  },
};
