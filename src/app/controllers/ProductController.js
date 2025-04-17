
// Importa a biblioteca 'yup' para validação de dados
import * as Yup from 'yup';
import Product from '../models/Product.js'; // Model que representa a tabela de produtos

class ProductController {
  // Criação de um novo produto
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required'),
      category: Yup.string().required('Category is required'),
    });

    try {
      // Validação dos dados da requisição
     schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verifica se o arquivo foi enviado (ex: imagem do produto)
    if (!request.file) {
      return response.status(400).json({ error: 'File is required.' });
    }

    const { filename: path } = request.file;
    const { name, price, category } = request.body;

    // Cria o produto no banco de dados
    const product = await Product.create({
      name,
      price,
      category,
      path,
    });

    return response.status(201).json({product});
  }

  // Listagem de todos os produtos
  async index(request, response) {
    const products = await Product.findAll();
    console.log({userId: request.userId});
  // Log para debugging (pode ser removido em produção)
    return response.json(products);
  }
}

export default new ProductController();

