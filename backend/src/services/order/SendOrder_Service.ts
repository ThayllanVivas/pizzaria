import prismaClient from "../../prisma";

class SendOrder_SERVICE{
    async execute(order_id: string) {
        const result = await prismaClient.order.update(
            {
                where: {
                    id: order_id
                },
                data: {
                    draft: false
                }
            }
        )

        return result
    }   
}

export { SendOrder_SERVICE }