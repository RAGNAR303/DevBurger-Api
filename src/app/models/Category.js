import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          llowNull: false,
        },
      },
      {
        sequelize,
        // tableName: 'categories',
        // modelName: 'Category',
        // underscored: true, // se você usa created_at / updated_at no padrão snake_case
      },
    );
    return this;
  }
}

export default Category;
