import Link from 'next/link';
import { getSeries } from './api/anime/route'

export default async function Home() {
  const series = await getSeries();

  return (
    <main className="px-2 py-3 bg-gray-200">
      <h1 className="text-xl">Home</h1>
      <h2 className='text-lg'>All series</h2>
      {series.map((serie) => (
        <Link key={serie.id} href={`/anime/${serie.id}`}>
          <div className="drop-shadow-md bg-white">
            <h3>{serie.title}</h3>
            <p>{serie.description}</p>
          </div>
        </Link>
      ))}
    </main>
  )
}
