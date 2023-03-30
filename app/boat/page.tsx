import { prisma } from '@/server/db'

async function getBoats() {
  const data = await prisma.boat.findMany({
    orderBy: {
      name: 'desc',
    },
  })
  return data
}

export default async function Boat() {
  const boats = await getBoats()
  return (
    <div>
      {boats?.map((boat) => (
        <div key={boat.id}>
          <h2>{boat.name}</h2>
          <p>{boat.lys}</p>
        </div>
      ))}
    </div>
  )
}
