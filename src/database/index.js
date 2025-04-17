import Sequelize from 'sequelize';

import configDatabase from '../config/database.js';

import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';
const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(configDatabase);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
