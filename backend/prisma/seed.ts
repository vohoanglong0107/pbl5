import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse";
import * as fs from "fs";
import * as path from "path";
import { URL } from "url";

const prisma = new PrismaClient();

async function main() {
  (() => {
    const csvFilePath = path.resolve(`./data/MasterCardList.csv`);

    const headers = [
      "promt",
      "mechanic",
      "set",
      "sheet",
      "picture",
      "originLink",
    ];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    parse(
      fileContent,
      {
        delimiter: ",",
        columns: headers,
      },
      async (error, result) => {
        if (error) {
          console.error(error);
        }

        let datas: Array<{
          name: string;
          imgUrl: string;
          description: string;
          set: string;
          sheet: string;
        }> = new Array();

        for (let i = 1; i < result.length; i++) {
          if (!result[i]["originLink"]) continue;
          const googleDriveImgUrl = new URL(result[i]["originLink"]);

          const googleDriveImgFileId = path.basename(
            path.dirname(googleDriveImgUrl.pathname)
          );
          path.join();
          const selfHostedImages = path.join(
            process.env.IMAGE_PREFIX_URL as string,
            `${googleDriveImgFileId}.jpeg`
          );
          datas.push({
            name: result[i]["mechanic"],
            description: result[i]["promt"],
            imgUrl: selfHostedImages,
            set: result[i]["set"],
            sheet: result[i]["sheet"],
          });
        }

        await prisma.card.createMany({
          data: datas,
        });
      }
    );
  })();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
