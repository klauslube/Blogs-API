const categoryService = require('../services/category.service');
const CustomError = require('../middlewares/CustomError');

const categoriesController = {
  create: async (req, res) => {
    const { name } = req.body;
    if (!name) throw new CustomError(400, '"name" is required');
    const category = await categoryService.create(name);

    return res.status(201).json(category);
  },

  getAll: async (req, res) => {
    const category = await categoryService.getAll();
    return res.status(200).json(category);
  },
};

module.exports = categoriesController;