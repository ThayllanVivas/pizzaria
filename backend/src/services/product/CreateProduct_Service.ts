import prismaClient from "../../prisma";

interface PRODUCT_REQUEST{
    name: string,
    price: string, 
    description: string,
    banner: string,
    category_id: string
}

class CreateProduct_SERVICE {
    async execute({name, price, description, banner, category_id}: PRODUCT_REQUEST){

        const newProduct = prismaClient.product.create(
            {
                data: {
                    name: name,
                    price: price,
                    description: description,
                    banner: banner,
                    category_id: category_id
                }
            }
        )

        return newProduct;
    }
}

export {CreateProduct_SERVICE}