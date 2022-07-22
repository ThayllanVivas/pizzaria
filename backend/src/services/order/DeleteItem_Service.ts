import prismaClient from "../../prisma";

class DeleteItem_SERVICE {
    async execute(item_id: string){
        const result = await prismaClient.item.delete(
            {
                where: {
                    id: item_id
                }
            }
        )

        return result;
    }
}

export {DeleteItem_SERVICE}