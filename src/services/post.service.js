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

    const checkCategory = await Category.findAll({ raw: true });
    const allCatIds = checkCategory.flatMap((i) => Object.values(i));
    const checkValues = allCatIds.some((e) => categoryIds.includes(e));
    if (!checkValues) throw new CustomError(400, '"categoryIds" not found');

    const userId = await postService.getUser(user);
    
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
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
    ] });
    if (!postById) throw new CustomError(404, 'Post does not exist');
    return postById;
  },

  update: async (id, { title, content, user }) => {
    if (!title || !content) throw new CustomError(400, 'Some required fields are missing');
    
    const userId = await postService.getUser(user);
    const postId = await postService.getById(id);
    
    if (postId.userId !== userId) throw new CustomError(401, 'Unauthorized user');
    const updatedPost = await BlogPost.update({ title, content }, { where: { id } });

    return updatedPost; 
  },

  delete: async (id, { user }) => {
    const userId = await postService.getUser(user);
    // console.log(userId);
    const postId = await postService.getById(id);
    if (postId.userId !== userId) throw new CustomError(401, 'Unauthorized user');

    // const deletePost = await BlogPost.destroy({ where: { id } });
    // return deletePost;
  },
};

module.exports = postService;