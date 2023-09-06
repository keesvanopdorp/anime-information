import { Serie } from "@prisma/client"

interface Props {
    serie: Serie;
}

export default function SerieCard({ serie }: Props) {
    const {title, description, startDate, endDate} = serie;
    return <div className="drop-shadow-md bg-white p-[10px] rounded-xl">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Period: {startDate.toLocaleDateString()} to {endDate !== null ? endDate.toDateString() : "now"}</p>
        <button className="bg-blue-500 text-white px-[15px] py-[8px] my-[3px] rounded-md">Go to serie</button>
    </div>
}