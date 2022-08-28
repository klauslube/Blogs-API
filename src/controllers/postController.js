// const categoryService = require('../services/category.service');
const postService = require('../services/post.service');
const { Category } = require('../database/models');
// const CustomError = require('../middlewares/CustomError');

const postController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { user } = req.email;
    
    const checkCategory = await Category.findAll({ raw: true });
    
    const allCatIds = checkCategory.flatMap((i) => Object.values(i));
    console.log(allCatIds);
    const checkValues = allCatIds.some((e) => categoryIds.includes(e));
    console.log(checkValues);
    
    // if (!checkValues) throw new CustomError(400, 'categoryIds not found');
  //  if (!checkValues) return res.status(400).json({ message: 'teste' });
    const newPost = await postService.create({ title, content, categoryIds, user });
    
    return res.status(201).json(newPost);
  },

  getAll: async (req, res) => {
    const allPosts = await postService.getAll();
    return res.status(200).json(allPosts);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const postById = await postService.getById(id);
    return res.status(200).json(postById);
  },
};

module.exports = postController;