import {Request, Response} from 'express'
import { SendOrder_SERVICE } from '../../services/order/SendOrder_Service'

class SendOrder_CONTROLLER {
    async handle(req: Request, resp: Response) {
        const {order_id} = req.body

        const sendOrder = new SendOrder_SERVICE

        const result = await sendOrder.execute(order_id)

        resp.json(result)
    }
}   

export { SendOrder_CONTROLLER }