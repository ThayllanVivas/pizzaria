import {Request, Response} from 'express'
import { AddItem_SERVICE } from '../../services/order/AddItem_Service'

class AddItem_CONTROLLER {
    async handle(req: Request, resp: Response) {
        const {order_id, product_id, amount} = req.body

        const addItem = new AddItem_SERVICE;

        const result = await addItem.execute({order_id, product_id, amount})

        resp.json(result)
    }
}

export { AddItem_CONTROLLER }