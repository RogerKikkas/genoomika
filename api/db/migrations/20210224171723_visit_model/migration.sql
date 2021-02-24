-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "visitTime" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "idCode" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
