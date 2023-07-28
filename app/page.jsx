import { db } from "@/lib/db"

export default async function Home() {

  const stations = await db.station.findMany({
    select: {
      id: true,
      name: true,
    }
  })

  return (
    <>
      <h2>Stations</h2>
      <ul>
        {stations.map(({ id, name}) => <li key={id}>{name}</li>)}
      </ul>
    </>
    
  )
}
