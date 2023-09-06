import { Serie } from "@prisma/client"

interface Props {
    serie: Serie;
}

export default function SerieCard({ serie }: Props) {
    return <div className="drop-shadow-md bg-white p-[5px]">
        <h3>{serie.title}</h3>
        <p>{serie.description}</p>
        <button className="bg-blue-500 text-white px-[15px] py-[8px] my-[3px] rounded-md">Go to serie</button>
    </div>
}