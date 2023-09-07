import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";

const searchSchema = z
	.object({
		q: z.string(),
		limit: z.optional(z.number()),
		page: z.optional(z.number()),
	})
	.refine((schema) => (schema.page !== undefined && schema.limit === undefined ? false : true), {
		message: "Page is only available when also using limit",
	});

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const { q, limit, page } = await searchSchema.parseAsync({
			q: searchParams.get("q"),
			...(searchParams.get("page") !== null && {
				page: parseInt(searchParams.get("page") as string),
			}),
			...(searchParams.get("limit") !== null && {
				limit: parseInt(searchParams.get("limit") as string),
			}),
		});

		const series = await prisma.serie.findMany({
			where: {
				title: {
					contains: q,
				},
			},
			...(limit !== undefined && { take: limit }),
			...(limit !== undefined && page !== undefined && { skip: page * limit }),
		});

		const seriesCount = series.length;

		if (seriesCount <= 0) {
			return NextResponse.json({ message: "No series found", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ count: seriesCount, series, status: 200 }, { status: 200 });
	} catch (e) {
		if (e instanceof ZodError) {
			console.log((e as ZodError).errors);
			return NextResponse.json({ message: (e as ZodError).message, status: 400 }, { status: 400 });
		}
		return NextResponse.json({ message: "A unkown server error has occurred", status: 500 }, { status: 500 });
	}
}
