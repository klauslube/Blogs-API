module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {type: DataTypes.INTEGER, },
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'BlogPosts'
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    })
  };

  return BlogPost;
};