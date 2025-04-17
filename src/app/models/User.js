import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        // Configuração para que o Sequelize gerencie automaticamente createdAt e updatedAt
        timestamps: true, // Isso indica que o Sequelize deve adicionar os campos createdAt e updatedAt
        //tableName: 'users', // Caso o nome da tabela seja diferente
        underscored: true,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });
    return this;
  }
  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
