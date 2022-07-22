import {Request, Response} from 'express'
import { CreateOrder_Service } from '../../services/order/CreateOrder_Service'

class CreateOrder_Controller{
    async handle(req: Request, resp: Response){
        const {table} = req.body

        const createOrder_Controller = new CreateOrder_Service()

        const order = await createOrder_Controller.execute({table})

        resp.json(order)
    }
}

export {CreateOrder_Controller}