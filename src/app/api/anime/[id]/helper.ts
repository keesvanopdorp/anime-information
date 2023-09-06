import prisma from "@/libs/prisma";

export async function getSerie(id: number) {
    return await prisma.serie.findFirstOrThrow({
      where: {
        id: {
          equals:id,
        },
      },
        include: {
          seasons: true,
          alternativeTitles: true,
          tags: true,
      }
    });
  }