/*
  Warnings:

  - You are about to drop the column `set` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `sheet` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `set` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sheet` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Card` ADD COLUMN `set` VARCHAR(191) NOT NULL,
    ADD COLUMN `sheet` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Deck` DROP COLUMN `set`,
    DROP COLUMN `sheet`;
