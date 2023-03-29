/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from '@/server/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return res.status(403).send('Unauthorized')
  }

  const id = session.user.id

  if (req.method === 'POST') {
    // create a post using prisma
    await prisma.post.create({
      data: {
        title: req.body.title,
        authorId: id,
      },
    })
    return res.status(200).json({ error: null })
  }

  if (req.method === 'DELETE') {
    await prisma.post.delete({
      where: {
        id: req.body.id,
      },
    })
    return res.status(204).end()
  }

  return res.send('Method not allowed')
}
