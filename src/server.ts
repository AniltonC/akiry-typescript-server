import cors from 'cors';
import { errors } from 'celebrate';
import express from 'express';
import path from 'path';
import routes from './routes';

import chalk from 'chalk';

const PORT = process.env.PORT || 7070;
const baseUrl = `http://localhost:${PORT}`;
const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST'
}));

app.use(express.json());

app.use(routes);    // Indicar ao servidor o uso das rotas criadas no diretório "routes"

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(PORT, () => {
    console.log(chalk.bold('\nHome'));
    console.log(baseUrl);

    console.log(chalk.bold('\nResources'));
    console.log(`${baseUrl}/items`);
    console.log(`${baseUrl}/locations\n`);
});

export default PORT;