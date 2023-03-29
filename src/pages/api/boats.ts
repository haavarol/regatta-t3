import { type NextApiRequest, type NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // fetch all boats
  if (req.method === 'GET') {
    const data = await prisma.boat.findMany({
      ordrerBy: {
        name: 'desc',
      },
    })
    return res.status(200).json({ data })
  }
}
