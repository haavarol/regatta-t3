import { authOptions } from '@/server/auth'
import { prisma } from '@/server/db'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import { DeletePost, SignIn, SignInFacebook, SignInGoogle, SignOut } from './Actions'
import Form from './Form'

async function getPosts() {
  const data = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return data
}

export default async function Home() {
  const posts = await getPosts()
  const session = await getServerSession(authOptions)
  return (
    <>
          <div className="flex flex-col items-center justify-center gap-1">
            {session?.user ? (
              <>
                <Image
                  className="w-14 rounded-full"
                  width={64}
                  height={64}
                  src={session.user.image as string}
                  alt={session.user.name as string}
                />
                <p>{session.user.role}</p>
                <SignOut />
                <Form />
              </>
            ) : (
              <>
                <SignIn />
                <SignInGoogle />
                <SignInFacebook />
              </>
            )}
          </div>
          <div className="flex max-w-md flex-col items-center justify-center gap-5">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="flex flex-row items-center justify-center gap-2"
              >
                <h2 className="text-sm">{post.author?.name}:</h2>
                <p className="break-all text-sm font-bold">{post.title}</p>
                {session?.user.email === post.author?.email && (
                  <DeletePost id={post.id} />
                )}
              </div>
            ))}
          </div>
    </>
  )
}
