// Criando um servidor Express:
import express from 'express';
import routes from './routes';

const PORT = process.env.PORT || 7070;

const app = express();

app.use(express.json());

app.use(routes);    // Indicar ao servidor o uso das rotas criadas no diretório "routes"

app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT));

export default PORT;

/* const insertProduct = (req: Request, res: Response) => {

    {
        const product = req.body;
        if (!product)
            return badRequest(res, "Produto inválido");

        if (!product.name)
            return badRequest(res, 'Informe o nome do produto');

        if (!validateNumber(product.price))
            return badRequest(res, 'Informe o preço');
    }

    const product = req.body as Product;
    return productModel.insertProduct(product)
        .then(product => {
            res.json(product);
        })
        .catch(err => internalServerError(res, err));
} */