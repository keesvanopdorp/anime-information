import { Serie } from "@prisma/client";
import Image from "next/image";
interface Props {
	serie: Serie;
}

export default function SerieCard({ serie }: Props) {
	const { title, description, startDate, endDate } = serie;
	return (
		<div className="drop-shadow-xl bg-white p-[10px] rounded-xl flex flex-col w-6/6 md:w-5/6 mx-auto">
			<h3 className="text-lg text-black">
				<b>Title: </b>
				{title}
			</h3>
			<p className="sm:text-sm md:text-base my-[10px]">{description}</p>
			<Image
				src="https://static.posters.cz/image/1300/posters/one-piece-wano-i149539.jpg"
				loading="lazy"
				placeholder="blur"
				className="mx-auto max-h-[50%] w-[50%]"
				alt={`${title} poster`}
				width={350}
				height={100}
				blurDataURL={"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0dvKuBwADEQFZ9IFvHwAAAABJRU5ErkJggg=="}
			/>
			<p className="sm:text-sm md:text-base max-w-full">
				Period: {startDate.toLocaleDateString()} to
				{endDate !== null ? endDate.toDateString() : "now"}
			</p>
			<button className="bg-blue-500 text-white px-[15px] py-[8px] mt-[8px] rounded-md md:w-3/6 w-6/6 self-end">Go to serie</button>
		</div>
	);
}
