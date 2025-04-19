// importação dos arquivos em outras pasta.
import { Router } from 'express'; // Esta importando o objeto Router do express,que permite importação rotas separada
import multer from 'multer';
import multerConfig from './config/multer.js';
import authMiddleware from './app/middlewares/auth.js';
import UseController from './app/controllers/UseController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';

// Cria uma nova instância do Router do Express.
// O Router é um objeto que permite definir rotas específicas para diferentes URLs e métodos HTTP.
const routes = new Router();

// Configura o middleware multer para lidar com o upload de arquivos.
// 'multerconfig' provavelmente contém as configurações para onde os arquivos serão armazenados,
// quais tipos de arquivos são permitidos, tamanho máximo, etc.
const upload = multer(multerConfig);

// Rota POST para criar um novo usuário
// Define uma rota que responde a requisições HTTP POST no caminho '/users'.
// Quando uma requisição POST é feita para '/users', a função 'store' do 'UseController' será executada.
// Essa função provavelmente conterá a lógica para receber os dados do novo usuário e salvá-los no banco de dados.
routes.post('/users', UseController.store);
routes.get('/users', UseController.index);
// Rota POST para login usuário ja castrado
// Define uma rota que responde a requisições HTTP POST no caminho '/session'.
// Quando uma requisição POST é feita para '/session', a função 'store' do 'SessionController' será executada.
// Essa função provavelmente conterá a lógica para autenticar um usuário existente (verificar suas credenciais).
routes.post('/session', SessionController.store);

// Rota POST para acesso a area de cadastro do site
// Define uma rota que responde a requisições HTTP POST no caminho '/products'.
// Esta rota utiliza o middleware 'uploads.single('file')' antes de executar o 'ProductController.store'.
// 'uploads.single('file')' indica que esta rota espera um único arquivo no corpo da requisição com o nome de campo 'file'.
// O multer irá processar este arquivo antes que a função 'store' do 'ProductController' seja chamada.
// A função 'store' do 'ProductController' provavelmente conterá a lógica para receber os dados do produto (incluindo o arquivo enviado) e salvá-los.
routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);

// Exporta a constante 'routes'.
// Isso torna o objeto 'routes' disponível para ser importado e usado em outros arquivos do projeto,
// geralmente no arquivo principal do servidor para definir todas as rotas da aplicação Express.

export default routes;
