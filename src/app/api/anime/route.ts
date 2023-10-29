import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { getSeries } from "./helper";

export async function GET() {
	try {
		return NextResponse.json(await getSeries());
	} catch (e) {
		return NextResponse.json({ message: "A unkown server error has occurred", status: 500 }, { status: 500 });
	}
}

const createSerieSchema = z.object({
	title: z.string(),
	description: z.string(),
	wiki: z.string(),
	source: z.string(),
	poster: z.string(),
	startDate: z.date(),
	endDate: z.optional(z.date()),
	status: z.string(),
	rating: z.string(),
	tags: z.array(z.string()),
	seasons: z.array(
		z.object({
			name: z.string(),
			season: z.number(),
		})
	),
	alternativeTitles: z.array(z.object({ lang: z.string(), title: z.string() })),
});

export async function POST(req: NextRequest) {
	try {
		const { title, alternativeTitles, source, startDate, endDate, description, tags, seasons, wiki, poster, rating } =
			await createSerieSchema.parseAsync(await req.json());
		const serie = await prisma.serie.create({
			data: {
				title,
				source,
				startDate,
				endDate,
				description,
				rating,
				status,
				wiki,
				poster,
				seasonAmount: seasons.length,
				alternativeTitles: {
					createMany: {
						data: alternativeTitles,
						skipDuplicates: true,
					},
				},
				seasons: {
					createMany: {
						skipDuplicates: true,
						data: seasons,
					},
				},
				tags: {
					connectOrCreate: tags.map((tag) => {
						return {
							where: { name: tag },
							create: { name: tag },
						};
					}),
				},
			},
		});
		return NextResponse.json({ message: "created", serie, status: 201 }, { status: 201 });
	} catch (e) {
		if (e instanceof ZodError) {
			const zodError = e as ZodError;
			const errors = zodError.flatten();
			return NextResponse.json({ errors: errors.fieldErrors, status: 400 }, { status: 400 });
		}
	}
}
