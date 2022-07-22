import prismaClient from "../../prisma";

interface ORDERREQUEST {
    order_id: string
}

class DeleteOrder_SERVICE {
    async execute({order_id}: ORDERREQUEST){
        const response = await prismaClient.order.delete(
            {
                where: {
                    id: order_id
                }
            }
        )

        return response;
    }
}

export { DeleteOrder_SERVICE }