/*
  Warnings:

  - You are about to drop the column `user_id` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `users_profiles` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `users_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `documents` DROP COLUMN `user_id`,
    ADD COLUMN `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users_profiles` DROP COLUMN `user_id`,
    ADD COLUMN `id_user` INTEGER NOT NULL;
