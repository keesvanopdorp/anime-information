import SerieCard from "@/components/SerieCard/SerieCard";
import Link from "next/link";
import { getSeries } from "./api/anime/helper";

export default async function Home() {
	const series = await getSeries();

	return (
		<main className="px-2 py-3 bg-gray-100">
			<h1 className="text-4xl">Home</h1>
			<h2 className="text-lg">All series</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 mt-[10px]">
				{series.map((serie) => (
					<Link key={serie.id} href={`/anime/${serie.id}`}>
						<SerieCard serie={serie} />
					</Link>
				))}
			</div>
		</main>
	);
}
