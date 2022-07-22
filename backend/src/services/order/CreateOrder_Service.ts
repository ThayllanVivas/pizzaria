import prismaClient from "../../prisma";

interface OPENTABLE{
    table: number
}

class CreateOrder_Service{
    async execute({table}: OPENTABLE){
        const veriFyTableNumber = await prismaClient.order.findFirst({
            where: {
                table: table
            }
        })
        if(veriFyTableNumber){
            throw new Error('Mesa já existente no banco de dados')
        }
        
        const openTable = await prismaClient.order.create(
            {
                data:{
                    table: table
                },
                select: {
                    id: true
                }
            }
        )

        return openTable
    }
}

export {CreateOrder_Service}