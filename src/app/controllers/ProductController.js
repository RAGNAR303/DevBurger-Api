import * as Yup from 'yup';
import Product from '../models/Product.js'; // Model que representa a tabela de produtos
import Category from '../models/Category.js';
import User from '../models/User.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required'),
      category_id: Yup.number().required('Category is required'),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    if (!request.file) {
      return response.status(400).json({ error: 'File is required.' });
    }
    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    const { filename: path } = request.file;
    const { name, price, category_id, offer } = request.body;

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });
    console.log(product);
    return response.status(201).json(product);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      // Validação dos dados da requisição
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verifica se o arquivo foi enviado (ex: imagem do produto)

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }
    const { id } = request.params;

    const findProduct = await Product.findByPk(id);

    if (!findProduct) {
      return response
        .status(400)
        .json({ error: 'Make sure your product Id is correct' });
      // 'Certifique-se de que o ID do seu produto esteja correto'
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name, price, category_id, offer } = request.body;

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: {
          id,
        },
      },
    );

    return response.status(200).json();
  }

  // Listagem de todos os produtos
  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });
    // console.log({ userId: request.userId });
    // Log para debugging (pode ser removido em produção)
    return response.json(products);
  }
}

export default new ProductController();
