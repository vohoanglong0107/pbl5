/*
  Warnings:

  - Added the required column `set` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sheet` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Deck` ADD COLUMN `set` VARCHAR(191) NOT NULL,
    ADD COLUMN `sheet` VARCHAR(191) NOT NULL;
