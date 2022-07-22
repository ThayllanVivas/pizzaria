import {Request, Response} from 'express'
import { ListProduct_SERVICE } from '../../services/product/ListProduct_Service';

class ListProduct_CONTROLLER{
    async handle(req: Request, res: Response){

        const listProduct_Service = new ListProduct_SERVICE

        const listofProducts = await listProduct_Service.execute()

        return res.json(listofProducts)
    }
}

export {ListProduct_CONTROLLER}

