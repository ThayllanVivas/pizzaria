import {Request, Response, NextFunction} from 'express'
import { CreateProduct_SERVICE } from '../../services/product/CreateProduct_Service'

class CreateProduct_CONTROLLER{
    async handle (req: Request, resp: Response){
        const createProduct_service = new CreateProduct_SERVICE()
        const {name, price, description, category_id} = req.body;

        if(!req.file){
            throw new Error("Error upload file")
        } else {

            const {originalname, filename: banner} = req.file

            const newProduct = await createProduct_service.execute({name, price, description, banner, category_id})

            return resp.json(newProduct)
        }

        

    }
}

export {CreateProduct_CONTROLLER}