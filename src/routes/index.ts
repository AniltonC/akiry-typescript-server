// Arquivo que indexa as rotas a serem utilizadas pelo servidor express
// Para criar rotas basta criar dentro do diretório "routes" arquivos de rota
// Exemplo: "user.routes.ts" para criar rotas destinadas a "user"

import { Router } from "express";
//import itemsRouter from "./items.routes";
import locationsRouter from "./locations.routes";

const routes = Router();

//routes.use('/items', itemsRouter);
//routes.use('/locations',locationsRouter)
export default routes;