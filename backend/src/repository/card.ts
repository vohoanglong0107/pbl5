import { PrismaClient } from '@prisma/client'

class CardRepo {

    prisma = new PrismaClient()

    constructor() { }

    create(props: any) {
        return this.prisma.card.create(props)
    }

    getAll() {
        return this.prisma.card.findMany()
    }

    getByID(props: any) {
        return this.prisma.card.findUnique({
            where: {
                id: props
            }
        })
    }

    getByMechanic(props: any) {
        return this.prisma.card.findMany({
            where: {
                name: props
            }
        })
    }

    getBySetSheetMechanic(set: string, sheet: string, mechanic: string) {
        return this.prisma.card.findMany({
            where: {
                set: set,
                sheet: sheet,
                name: mechanic
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

export default new CardRepo();