import { prisma } from '@/server/db'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // fetch all boats
  if (req.method === 'GET') {
    const data = await prisma.boat.findMany({
      orderBy: {
        name: 'asc',
      }
    })
    return res.status(200).json({ data })
  }
}
