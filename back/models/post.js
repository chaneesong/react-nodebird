const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({}, {});
  }

  static associate(db) {}
}

export default Post;
