import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import e from "cors";

const prisma = new PrismaClient()

async function main() {

    (() => {
        const csvFilePath = path.resolve(`../backend/data/MasterCardList.csv`);

        const headers = ['promt', 'mechanic', 'set', 'sheet', 'picture', 'originLink'];

        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

        parse(fileContent, {

            delimiter: ',',
            columns: headers,

        }, async (error, result) => {

            if (error) {
                console.error(error);
            }

            let datas: Array<{ name: string, imgUrl: string, description: string, set: string, sheet: string }> = new Array();

            for (let i = 1; i < result.length; i++) {
                // if (result[i]['mechanic'] == 'See the Future 3x' ||
                //     result[i]['mechanic'] == 'See the Future 5x' ||
                //     result[i]['mechanic'] == 'Defuse' ||
                //     result[i]['mechanic'] == 'Shuffle' ||
                //     result[i]['mechanic'] == 'Attack 2x' ||
                //     result[i]['mechanic'] == 'Attack 3x' ||
                //     result[i]['mechanic'] == 'Skip' ||
                //     result[i]['mechanic'] == 'Super Skip') {
                //     datas.push({ name: result[i]['mechanic'], description: result[i]['promt'], imgUrl: result[i]['originLink'], set: result[i]['set'], sheet: result[i]['sheet']  })
                // }
                datas.push({ name: result[i]['mechanic'], description: result[i]['promt'], imgUrl: result[i]['originLink'], set: result[i]['set'], sheet: result[i]['sheet'] })
            }

            await prisma.card.createMany({
                data: datas
            })

        });

    })();

}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })