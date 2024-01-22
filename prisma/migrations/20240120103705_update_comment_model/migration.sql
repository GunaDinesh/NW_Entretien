/*
  Warnings:

  - You are about to drop the column `description` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Comment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Comment_title_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "description",
DROP COLUMN "title";
