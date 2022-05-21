/*
  Warnings:

  - Made the column `name` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Deck` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Rule` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Card` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Deck` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Rule` MODIFY `name` VARCHAR(191) NOT NULL;
