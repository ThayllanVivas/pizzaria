import prismaClient from "../../prisma";

class ListProduct_SERVICE {
    async execute(){

        const listofProducts = await prismaClient.product.findMany(
            {
                select: {
                    id: true,
                    name: true
                }
            }
        )

        return listofProducts;
    }
}

export {ListProduct_SERVICE}