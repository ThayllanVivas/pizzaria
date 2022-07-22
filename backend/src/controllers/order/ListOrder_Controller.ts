import {Request, Response} from 'express'
import { ListOrder_SERVICE } from '../../services/order/ListOrder_Service'

class ListOrder_CONTROLLER {
    async handle(req: Request, resp: Response){
        const listOrder = new ListOrder_SERVICE

        const result = await listOrder.execute()

        resp.json(result)
    }
}

export {ListOrder_CONTROLLER}