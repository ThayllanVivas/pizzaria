import prismaClient from "../../prisma";

class ListOrder_SERVICE{
    async execute(){
        const result = await prismaClient.order.findMany(
            {
                where: {
                    draft: false,
                    status: false
                },
                orderBy: {
                    created_at: 'desc'
                },
                select: {
                    id: true,
                    name: true,
                    table: true,
                    status: true,
                    draft: true,
                    created_at: true,
                    updated_at: true,
                }
            }
        )

        return result

    }
}

export {ListOrder_SERVICE}