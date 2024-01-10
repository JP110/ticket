-- CreateEnum
CREATE TYPE "Category" AS ENUM ('furniture', 'computer', 'other');

-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('low', 'normal', 'high');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('submitted', 'ongoing', 'done');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handled_at" TIMESTAMP(3),
    "done_at" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "PriorityLevel" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'submitted',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
