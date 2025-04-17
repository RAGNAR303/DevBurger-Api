// Importa a função 'multer' do módulo 'multer' para salvar e gerenciar arquivos pdv, fotos , etc....
import multer from 'multer';

// Importa a função 'v4' do módulo 'uuid' para gerar identificadores únicos.
import { v4 } from 'uuid';

// Importa as funções 'extname' e 'resolve' do módulo 'node:path'.
// 'extname' é usada para pegar a extensão do arquivo (ex: .jpg, .png, .pdf),
// 'resolve' é usada para gerar um caminho absoluto.
import { extname, resolve } from 'node:path';

// Exporta a configuração do armazenamento do Multer.
// Essa configuração será usada para armazenar os arquivos enviados.
export default {
  // Define o 'storage' como 'multer.diskStorage', que salva os arquivos no disco rígido.
  storage: multer.diskStorage({
    // Define o diretório onde os arquivos serão armazenados.
    // 'resolve' ajuda a criar um caminho absoluto, o que é importante para garantir que o caminho seja correto em diferentes sistemas operacionais.
    destination: resolve(__dirname, '..', '..', 'uploads'),
    // __dirname é o diretório atual onde o arquivo está localizado
    // '..' sobe um nível de diretório, e '..' novamente sobe mais um nível, levando à raiz do projeto
    // Então, o caminho final será a pasta 'uploads' na raiz do projeto.

    // Define o nome do arquivo ao ser salvo no disco.
    filename: (_request, file, callback) =>
      // 'v4()' gera um identificador único (UUID) para o nome do arquivo.
      // 'extname(file.originalname)' pega a extensão original do arquivo (ex: .jpg, .pdf).
      // O callback é usado para informar ao Multer qual nome de arquivo salvar.
      callback(null, v4() + extname(file.originalname)),
  }),
};
