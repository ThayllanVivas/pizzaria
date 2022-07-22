import { Request, Response } from "express";
import { DetailOrder_SERVICE } from "../../services/order/DetailOrder_Service";

class DetailOrder_CONTROLLER {
    async handle(req: Request, resp: Response){
        const order_id = req.query.order_id as string

        const detailOrder = new DetailOrder_SERVICE;

        const result = await detailOrder.execute(order_id)

        resp.json(result)
    }
}

export { DetailOrder_CONTROLLER }