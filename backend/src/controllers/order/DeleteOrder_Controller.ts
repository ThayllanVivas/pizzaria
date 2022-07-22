import {Request, Response} from 'express'
import { DeleteOrder_SERVICE } from '../../services/order/DeleteOrder_Service';

class DeleteOrder_CONTROLLER {
    async handle(req: Request, resp: Response){
        const order_id = req.query.order_id as string

        const deleteOrder_Service = new DeleteOrder_SERVICE;

        const response = await deleteOrder_Service.execute({order_id})

        resp.json(response)
    }
}

export { DeleteOrder_CONTROLLER }