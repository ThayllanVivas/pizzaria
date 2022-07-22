import {Request, Response} from 'express'
import { ListProductByCategories_SERVICE } from '../../services/product/ListProductByCategorie_Service';

class ListProductByCategories_CONTROLLER{
    async handle(req: Request, res: Response){
        const category_id = req.query.category_id as string;

        const listProductByCategorie_Service = new ListProductByCategories_SERVICE

        const listOfFilteredProducts = await listProductByCategorie_Service.execute(category_id)

        return res.json(listOfFilteredProducts)
    }
}

export {ListProductByCategories_CONTROLLER}

