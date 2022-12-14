const { Category } = require('../database/models');
// const CustomError = require('../middlewares/CustomError');

const categoryService = {
  create: async (name) => {
    const newCategory = await Category.create({ name });

    // if (!name) throw new CustomError(400, '"name" is required');
    
    return newCategory;
  },
  getAll: async () => {
    const allCategory = await Category.findAll();
    
    return allCategory;
  },
};

module.exports = categoryService;