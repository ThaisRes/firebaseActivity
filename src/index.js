import "dotenv/config";
import express from "express";
import cors from "cors";
//tem que importar as rotas aqui
import produtosRouter from "./routers/produtosRouter.js";
import usuariosRouter from "./routers/usuariosRouter.js";

const server = express();
server.use(cors({origin: "*"})); //qualquer origem pode acessar nossos endpoints da api
server.use(express.json()); // Para o Express entender JSON no body. Todas as requisições ele converte pra JSON

const port = process.env.PORT || 3000;

//incorpora as rotas no servidor
server.use(produtosRouter);
server.use(usuariosRouter);

server.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
  console.log(`Acesso em: http://localhost:${port}`);
});


