-- CreateTable
CREATE TABLE "ConfDate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institution" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scheduleId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "paperUrl" TEXT NOT NULL,
    "isPresented" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    CONSTRAINT "Session_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "ConfDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reviewerId" INTEGER NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "contribution" INTEGER NOT NULL,
    "weakness" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "paperId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Presentation" (
    "paperId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "sessionId" INTEGER NOT NULL,
    CONSTRAINT "Presentation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "affiliationId" INTEGER NOT NULL,
    "isPresenter" BOOLEAN NOT NULL,
    "paperId" INTEGER NOT NULL,
    CONSTRAINT "Author_affiliationId_fkey" FOREIGN KEY ("affiliationId") REFERENCES "Institution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Author_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reviewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PaperToReview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PaperToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "Review" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PaperToReviewer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PaperToReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperToReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviewer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ReviewerToReview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ReviewerToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Review" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReviewerToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviewer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PaperToReview_AB_unique" ON "_PaperToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_PaperToReview_B_index" ON "_PaperToReview"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PaperToReviewer_AB_unique" ON "_PaperToReviewer"("A", "B");

-- CreateIndex
CREATE INDEX "_PaperToReviewer_B_index" ON "_PaperToReviewer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewerToReview_AB_unique" ON "_ReviewerToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewerToReview_B_index" ON "_ReviewerToReview"("B");
