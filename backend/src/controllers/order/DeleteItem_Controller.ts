import { Request, Response } from "express";
import { DeleteItem_SERVICE } from "../../services/order/DeleteItem_Service";

class DeleteItem_CONTROLLER{
    async handle(req: Request, resp: Response){
       const item_id = req.query.item_id as string;

       const deleteItem = new DeleteItem_SERVICE;

       const result = await deleteItem.execute(item_id)

       resp.json(result)

    }

}

export { DeleteItem_CONTROLLER }