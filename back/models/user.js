import Sequelize from 'sequelize';

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({}, {});
  }

  static associate(db) {}
}

export default User;
