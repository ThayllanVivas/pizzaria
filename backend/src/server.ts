import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import { router } from './routes';
import path from 'path'

const app = express();
const PORT = 3333;

app.use(express.json()); //Explicitar que iremos usar o express no formato JSON

app.use(cors()); //Permitir que qualquer IP faça requisição

app.use(router); //Chama o arquivo routes através da constante 'router'

app.use('/files',
express.static(path.resolve(__dirname, '..', 'tmp')))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        //se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    // se não for da instância acima, mas for um erro
    return res.status(500).json({
        status: "error",
        message: 'Internal server error.'
    })
})


app.listen(PORT, () => console.log("Servidor online!")); //ficar "ouvindo" a porta especificada e avisar que está ativo