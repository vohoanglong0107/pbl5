import { PrismaClient } from '@prisma/client'

class DeckRepo {

    prisma = new PrismaClient()

    constructor() { }

    create(props: any) {
        return this.prisma.deck.create(props)
    }

    getAll() {
        return this.prisma.deck.findMany()
    }

    getByID(props: any) {
        return this.prisma.deck.findUnique({
            where: {
                id: props
            }
        })
    }

    updateByID(id: any, data: any) {
        return this.prisma.deck.update({
            where: {
                id: id
            },
            data: data
        })
    }

    deleteByID(props: any) {
        return this.prisma.deck.delete({
            where: {
                id: props
            }
        })
    }

}

export default new DeckRepo();