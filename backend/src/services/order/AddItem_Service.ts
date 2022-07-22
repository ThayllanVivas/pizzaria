import prismaClient from "../../prisma";

interface ADDITEMREQUEST {
    amount: number,
    order_id: string,
    product_id: string
}

class AddItem_SERVICE {
    async execute({order_id, product_id, amount}: ADDITEMREQUEST){

        const result = await prismaClient.item.create(
            {
                data: {
                    amount: amount,
                    order_id: order_id,
                    product_id: product_id,
                }
            }
        )

        return result
    }
}

export { AddItem_SERVICE}