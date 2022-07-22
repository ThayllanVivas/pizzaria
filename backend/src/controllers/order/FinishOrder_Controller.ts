import {Request, Response} from 'express'
import { FinishOrder_SERVICE } from '../../services/order/FinishOrder_Service'

class FinishOrder_CONTROLLER {
    async handle(req: Request, resp: Response) {
        const {order_id} = req.body

        const FinishOrder = new FinishOrder_SERVICE

        const result = await FinishOrder.execute(order_id)

        resp.json(result)
    }
}   

export { FinishOrder_CONTROLLER }