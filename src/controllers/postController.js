// const categoryService = require('../services/category.service');
const postService = require('../services/post.service');

const postController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { user } = req.email;

    const newPost = await postService.create({
      title,
      content,
      categoryIds,
      user,
    });

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

  update: async (req, res) => {
    const { id } = req.params;
    const { user } = req.email;
    const { title, content } = req.body;
    const updatePost = await postService.update(id, { title, content, user });
    return res.status(200).json(updatePost);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { user } = req.email;
    await postService.delete(id, { user });
    return res.status(204).end();
  },
};

module.exports = postController;
