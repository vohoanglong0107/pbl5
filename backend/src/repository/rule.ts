import { PrismaClient } from '@prisma/client'

class RuleRepo {

    prisma = new PrismaClient()

    constructor() { }

    create(props: any) {
        return this.prisma.rule.create(props)
    }

    getAll() {
        return this.prisma.rule.findMany()
    }

    getByID(props: any) {
        return this.prisma.rule.findUnique({
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

export default new RuleRepo();