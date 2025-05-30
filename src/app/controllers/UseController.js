import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string()
        .strict(true)
        .matches(/^[A-Za-z\s]+$/, 'O nome deve conter apenas letras')
        .required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(8, 'A senha tem que ter no minimo 8 caracteres')
        .required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = request.body;

    const userExists = await User.findOne({
      where: {
        email,
      },
    });
    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });
    return response.status(201).json({
      id: user.id,
      name,
      email,
      admin,
    });
  }
  async index(request, response) {
    const allUsers = await User.findAll();

    return response.json(allUsers);
  }
}

export default new UserController();
