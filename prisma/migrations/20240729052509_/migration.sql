-- CreateEnum
CREATE TYPE "AdminLevel" AS ENUM ('SuperAdmin', 'Admin', 'RoleAdmin');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Editor', 'AdsManager', 'Analyst');

-- CreateEnum
CREATE TYPE "NewsArticleStatus" AS ENUM ('Draft', 'Publish', 'OnlyMe', 'Schedule', 'Trash');

-- CreateEnum
CREATE TYPE "LogModel" AS ENUM ('Thread', 'Ad', 'Story', 'Gallery', 'NewsArticle', 'NewsArticleComment', 'NewsCategory', 'VideoArticle', 'VideoArticleComment', 'VideoCategory', 'User', 'Cartoon', 'TopPicture', 'Horoscope');

-- CreateTable
CREATE TABLE "PublicUser" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "facebookId" TEXT,
    "googleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role",
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "level" "AdminLevel" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "mediaURL" TEXT,
    "audioURL" TEXT,
    "videoURL" TEXT,
    "documentURL" TEXT,
    "additionalImageURLs" TEXT,
    "categoryId" TEXT NOT NULL,
    "tags" JSONB,
    "publishedAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hotNews" BOOLEAN NOT NULL DEFAULT false,
    "leadNews" BOOLEAN NOT NULL DEFAULT false,
    "breakingNews" BOOLEAN NOT NULL DEFAULT false,
    "updateNews" BOOLEAN NOT NULL DEFAULT false,
    "videoNews" BOOLEAN NOT NULL DEFAULT false,
    "photoNews" BOOLEAN NOT NULL DEFAULT false,
    "status" "NewsArticleStatus",
    "threadId" TEXT,
    "relatedNewsArticleIds" JSONB,
    "topPicture" BOOLEAN NOT NULL DEFAULT false,
    "newsEditor" TEXT,
    "viewCount" INTEGER DEFAULT 0,
    "commentSection" BOOLEAN,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsArticleComment" (
    "id" TEXT NOT NULL,
    "newsArticleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "newsArticleCommentId" TEXT,

    CONSTRAINT "NewsArticleComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCategory" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "home" BOOLEAN NOT NULL DEFAULT false,
    "navBar" BOOLEAN NOT NULL DEFAULT false,
    "superCategoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "NewsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoArticle" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortVideo" BOOLEAN DEFAULT false,
    "videoURL" TEXT,
    "mediaURL" TEXT,
    "summary" TEXT,
    "categoryId" TEXT,
    "tags" JSONB,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VideoArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoArticleComment" (
    "id" TEXT NOT NULL,
    "videoArticleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoArticleComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoCategory" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "VideoCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "tags" JSONB,
    "mediaURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "thumbnailURL" TEXT NOT NULL,
    "mediaURL" TEXT,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "mediaURL" TEXT,
    "redirectURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "headerTitle" TEXT NOT NULL,
    "innerTitle" TEXT NOT NULL,
    "navBar" BOOLEAN NOT NULL DEFAULT false,
    "summary" TEXT NOT NULL,
    "coverPhotoURL" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userRole" TEXT NOT NULL,
    "modelName" "LogModel" NOT NULL,
    "itemId" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cartoon" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Cartoon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horoscope" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "dayName" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "auspiciousFromTime" TIMESTAMP(3) NOT NULL,
    "auspiciousToTime" TIMESTAMP(3) NOT NULL,
    "ourContinentFromTime" TIMESTAMP(3) NOT NULL,
    "ourContinentToTime" TIMESTAMP(3) NOT NULL,
    "rahuFromTime" TIMESTAMP(3) NOT NULL,
    "rahuToTime" TIMESTAMP(3) NOT NULL,
    "mainPhotoURL" TEXT,
    "subaTimeBackgroundPhotoURL" TEXT,
    "summary" TEXT,
    "content" TEXT,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Horoscope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchiveNewsArticle" (
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "summary" TEXT,
    "content" TEXT,
    "imageURL" TEXT,
    "videoURL" TEXT,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ArchiveNewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editors" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "newsCount" INTEGER,

    CONSTRAINT "Editors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_email_key" ON "PublicUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsCategory_id_key" ON "NewsCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NewsCategory_categoryName_key" ON "NewsCategory"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "VideoCategory_id_key" ON "VideoCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VideoCategory_categoryName_key" ON "VideoCategory"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Editors_id_key" ON "Editors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Editors_email_key" ON "Editors"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsArticle" ADD CONSTRAINT "NewsArticle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "NewsCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsArticle" ADD CONSTRAINT "NewsArticle_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsArticle" ADD CONSTRAINT "NewsArticle_newsEditor_fkey" FOREIGN KEY ("newsEditor") REFERENCES "Editors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsArticleComment" ADD CONSTRAINT "NewsArticleComment_newsArticleId_fkey" FOREIGN KEY ("newsArticleId") REFERENCES "NewsArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsArticleComment" ADD CONSTRAINT "NewsArticleComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsArticleComment" ADD CONSTRAINT "NewsArticleComment_newsArticleCommentId_fkey" FOREIGN KEY ("newsArticleCommentId") REFERENCES "NewsArticleComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsCategory" ADD CONSTRAINT "NewsCategory_superCategoryId_fkey" FOREIGN KEY ("superCategoryId") REFERENCES "NewsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoArticle" ADD CONSTRAINT "VideoArticle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "VideoCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoArticleComment" ADD CONSTRAINT "VideoArticleComment_videoArticleId_fkey" FOREIGN KEY ("videoArticleId") REFERENCES "VideoArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoArticleComment" ADD CONSTRAINT "VideoArticleComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "NewsCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
