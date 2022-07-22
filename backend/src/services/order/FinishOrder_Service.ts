import prismaClient from "../../prisma";

class FinishOrder_SERVICE{
    async execute(order_id: string) {
        const result = await prismaClient.order.update(
            {
                where: {
                    id: order_id
                },
                data: {
                    status: true
                }
            }
        )

        return result
    }   
}

export { FinishOrder_SERVICE }