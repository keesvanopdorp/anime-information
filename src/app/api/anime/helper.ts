import prisma from "@/libs/prisma";
import { Prisma, Serie } from "@prisma/client";

const selectOptions: Prisma.SerieFindManyArgs = {
	include: {
		seasons: {
			select: {
				season: true,
				name: true,
				episodes: true,
			},
		},
		alternativeTitles: {
			select: {
				lang: true,
				title: true,
			},
		},
	},
};

export async function getSeries(): Promise<Serie[]> {
	return await prisma.serie.findMany(selectOptions);
}
