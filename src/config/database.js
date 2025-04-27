export default {
  dialect: 'postgres', // QUAL TIPO DE BANCO DE DADOS
  host: 'localhost',
  port: 5432, // PORTA QUE ESTA FUNCINANDO A API
  username: 'postgres', // NOME QUE ESTA NO BANCO DE DADOS DE LOGIN
  password: 'postgres', // SENHA DO BANCO DE DADOS LOGIN
  database: 'devburger', // NOME DE BANCO
  define: {
    timestamps: true,
    underscored: true, // CRIAR EM MINUSCULO E SEPARANDO COM ANDERLINE
    underscoredAll: true,
  },
};
// TIMESSTAMPS: TRUE -> CRIAR REGISTRO DE QUANDO FOI "CREATE_AT"  CRIADO O USUARIO "PUT" , "UPDATE_AT" E QUANDO ELE FOI ATUALIZADO "PUSH"
