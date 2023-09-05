-- CreateTable
CREATE TABLE `Serie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `season_amount` INTEGER NOT NULL,
    `source` VARCHAR(100) NOT NULL,
    `poster` VARCHAR(191) NOT NULL,
    `wiki` VARCHAR(255) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `status` VARCHAR(100) NOT NULL,
    `rating` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Serie_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlternativeTitles` (
    `lang` VARCHAR(2) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `serie_id` INTEGER NOT NULL,

    PRIMARY KEY (`lang`, `title`, `serie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `season` INTEGER NOT NULL,
    `serie_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `airing_date` DATE NOT NULL,
    `episode_number` INTEGER NOT NULL,
    `runtime_text` VARCHAR(191) NOT NULL,
    `runtime` INTEGER NOT NULL,
    `wiki` VARCHAR(255) NOT NULL,
    `serie_id` INTEGER NOT NULL,
    `seasonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SerieToTag` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SerieToTag_AB_unique`(`A`, `B`),
    INDEX `_SerieToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AlternativeTitles` ADD CONSTRAINT `AlternativeTitles_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Season` ADD CONSTRAINT `Season_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `Season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SerieToTag` ADD CONSTRAINT `_SerieToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Serie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SerieToTag` ADD CONSTRAINT `_SerieToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
