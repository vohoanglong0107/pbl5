import { Card, Prisma, PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import e from "cors";

const prisma = new PrismaClient()

async function main() {
    type MasterCard = {
        Prompt: string
        Mechanic: string
        Set: string
        Sheet: number
        Picture: string
        other: string
    };

    (() => {
        const csvFilePath = path.resolve(`../backend/data/Exploding Kittens Card List - Master Card List.csv`);

        const headers = ['Prompt', 'Mechanic', 'Set', 'Sheet', 'Picture', `Cards with paw prints are marked with " * "`];

        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

        parse(fileContent, {
            delimiter: ',',
            columns: headers,
        }, (error, result: MasterCard[]) => {


            if (error) {
                console.error(error);
            }

            // console.log("Result", result);

            // for (let i = 0; i < result.length; i++) {
            //     CardArr.push({ id: 0, name: result[i].Mechanic, description: result[i].Prompt, imgUrl: result[i].Picture })
            //     console.log(result[i].Mechanic)
            // }

            let xx = 0;

            result.forEach(async element => {
                await prisma.card.create({
                    data: {
                        name: element.Mechanic,
                        description: element.Prompt,
                        imgUrl: element.Picture
                    },
                })
                console.log(xx++)
            }

            );

        });
    })();

    // console.log(CardArr)

    // const createMany = await prisma.card.createMany({
    //     data: CardArr
    // })

}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })