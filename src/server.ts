// Criando um servidor Express:
import { errors } from 'celebrate';
import express from 'express';
import routes from './routes';

const PORT = process.env.PORT || 7070;

const app = express();

app.use(express.json());

app.use(routes);    // Indicar ao servidor o uso das rotas criadas no diretório "routes"

app.use(errors());

app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT));

export default PORT;