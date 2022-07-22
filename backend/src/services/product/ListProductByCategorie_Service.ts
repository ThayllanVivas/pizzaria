import prismaClient from "../../prisma";

class ListProductByCategories_SERVICE {
    async execute(category_id: string){
        const listOfFilteredProducts = await prismaClient.product.findMany(
            {
                where: {
                    category_id: category_id
                },
                select: {
                    name: true,
                    id: true
                }
            }
        )

        return listOfFilteredProducts;
    }
}

export {ListProductByCategories_SERVICE}