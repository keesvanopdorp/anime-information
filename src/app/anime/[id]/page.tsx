import { getSerie } from "@/app/api/anime/[id]/helper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

interface PageProps {
	params: {
		id: number;
	};
}

async function getData(id: number) {
	try {
		return await getSerie(id);
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
			notFound();
		}
	}
}

export default async function ShowSerieDetails({ params: { id } }: PageProps) {
	const serie = await getData(parseInt(id.toString()));

	if (serie !== undefined) {
		const { title } = serie;

		return (
			<div className="container px-2 py-3">
				<h1 className="text-4xl">{title}</h1>
			</div>
		);
	}
}
