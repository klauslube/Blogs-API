const { BlogPost, sequelize, PostCategory, User } = require('../database/models');
const CustomError = require('../middlewares/CustomError');
// const jwt = require('jsonwebtoken');

const postService = {

  getUser: async (email) => {
    const userId = await User.findOne({ where: { email } });
    // console.log(userId);
    const { id } = userId;
    return id;
  },

  create: async ({ title, content, categoryIds, user }) => {
    if (!title || !content || !categoryIds) {
      throw new CustomError(400, 'Some required fields are missing');
    }

    const userId = await postService.getUser(user);
    
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
      // console.log(newPost);
      const { id: postId } = newPost;
      const categories = categoryIds
      .map((catId) => ({ categoryId: catId, postId }));
     await PostCategory.bulkCreate(categories, { transaction: t });
    
      return newPost;
    });
    return result;
  },
};

module.exports = postService;