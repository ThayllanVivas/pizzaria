import prismaClient from "../../prisma";

class DetailOrder_SERVICE {
    async execute(order_id: string){
        const result = await prismaClient.item.findMany(
            {
                where: {
                    order_id: order_id
                },
                include: {
                    product: true,
                    order: true
                }
            }
        )

        return result
    }
}

export { DetailOrder_SERVICE }