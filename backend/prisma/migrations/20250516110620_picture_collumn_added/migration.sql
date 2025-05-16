-- AlterTable
ALTER TABLE "User" ADD COLUMN     "picture" TEXT NOT NULL DEFAULT 'blue';

-- CreateTable
CREATE TABLE "Friends" (
    "friendId" INTEGER NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("savedAt","friendId")
);

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
