import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const series: Prisma.SerieCreateInput[] = [
    {
        title: "One Piece",
        description: "Luffy want to become the pirate king",
        seasonAmount: 13,
        source: "Manga",
        poster: "test",
        rating: "PG-13",
        wiki: "https://onepiece.fandom.com/wiki/One_Piece_Wiki",
        startDate: "1999-09-19T22:00:00.000Z",
        status: "Ongoing",
        seasons: {
            createMany: {
                data: [
                    {
                        name: "East Blue Saga",
                        season: 1,
                    },
                    {
                        name: "Arabasta Saga",
                        season: 2,
                    },
                    {
                        name: "Sky Island Saga",
                        season: 3,
                    },
                    {
                        name: "Water 7 Saga",
                        season: 4,
                    }
                ]
            }
        },
        alternativeTitles: {
            createMany: {
                data: [
                    {
                        lang: "en",
                        title: "One Piece"
                    },
                    {
                        lang: "ja",
                        title: "One Piece"
                    }
                ]
            }
        }
    }
]

async function main() {
    for (const serie of series) {
        await prisma.serie.create({
            data: serie,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });