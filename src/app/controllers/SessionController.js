// Importa o model 'User' (provavelmente definido com Sequelize)
import User from '../models/User.js';

// Importa tudo da biblioteca Yup para fazer validação de dados
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

// Define a classe 'SessionController' que vai lidar com login/autenticação
class SessionController {
  // Método assíncrono chamado 'store', que será chamado ao tentar fazer login
  async store(request, response) {
    // Cria um schema Yup para validar os dados da requisição
    // Valida se o email é válido e se a senha tem pelo menos 8 caracteres
    const schema = Yup.object({
      email: Yup.string().email().required(), // Email obrigatório e com formato válido
      password: Yup.string().min(8).required(), // Senha obrigatória e com no mínimo 8 caracteres
    });
    // Valida os dados do request.body com base no schema
    // Retorna true ou false
    const isValid = await schema.isValid(request.body);

    // Função auxiliar que envia uma resposta de erro padrão
    const emailOrPasswordIncorrect = () =>
      response
        .status(401) // Código HTTP 401: Não autorizado
        .json({ error: 'Make sure your email or password are correct' });
    // Se os dados enviados forem inválidos, retorna erro
    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    // Extrai email e password do corpo da requisição
    const { email, password } = request.body;

    // Procura um usuário no banco de dados com o email fornecido
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Se o usuário não existir, retorna erro
    if (!user) {
      return emailOrPasswordIncorrect();
    }

    // Verifica se a senha informada bate com a senha do usuário
    // Presume-se que o método 'checkPassword' esteja definido no model User (ex: usando bcrypt)
    const isSamePassword = await user.checkPassword(password);

    // Se a senha estiver errada, retorna erro
    if (!isSamePassword) {
      return emailOrPasswordIncorrect();
    }

    // Se estiver tudo certo, retorna os dados do usuário autenticado
    return response.status(201).json({
      id: user.id, // ID do usuário
      name: user.name, // Nome
      email, // Email
      admin: user.admin, // Se é admin ou não (se houver esse campo)
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      // } ),
    });
  }
}

// Exporta uma nova instância do SessionController
// Assim, você pode usá-lo diretamente nas rotas
export default new SessionController();

// 🔐 Resumo do que esse código faz:
// Valida os dados do login (email e senha).

// Procura o usuário pelo email no banco.

// Compara a senha informada com a senha salva.

// Se estiver tudo certo, retorna os dados do usuário.
