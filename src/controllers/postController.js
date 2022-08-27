const postService = require('../services/post.service');

const postController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { user } = req.email;
    // console.log(user);
    const newPost = await postService.create({ title, content, categoryIds, user });
    return res.status(201).json(newPost);
  },
};

module.exports = postController;