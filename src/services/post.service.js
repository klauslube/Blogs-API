const { BlogPost, sequelize, PostCategory, User, Category } = require('../database/models');
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

  getAll: async () => {
    const allPost = await BlogPost.findAll(
      { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
       { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );
    return allPost;
  },

  getById: async (id) => {
    const postById = await BlogPost.findOne({ where: { id },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
   ],
 });
    if (!postById) throw new CustomError(404, 'Post does not exist');
    return postById;
  },
};

module.exports = postService;