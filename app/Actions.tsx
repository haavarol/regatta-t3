/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { GitHubIcon } from '@/components/Icons'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export function SignOut() {
  return (
    <button
      className="mt-2 mb-6 text-xs text-white hover:text-[hsl(280,100%,70%)]"
      onClick={() => signOut()}
    >
      ➡ Sign out
    </button>
  )
}

export function SignIn() {
  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={() => signIn('github')}
    >
      <GitHubIcon />
      <div className="ml-3">Sign in with Github</div>
    </button>
  )
}

export function SignInGoogle() {
  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={() => signIn('google')}
    >
      <div className="ml-3">Sign in with Google</div>
    </button>
  )
}
export function SignInFacebook() {
  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      onClick={() => signIn('facebook')}
    >
      <div className="ml-3">Sign in with Facebook</div>
    </button>
  )
}

export function DeletePost({ id }: { id: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  async function onClick() {
    setIsFetching(true)

    await fetch('/api/posts', {
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    setIsFetching(false)
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh()
    })
  }

  return (
    <button
      className="text-sm text-red-500 opacity-0 transition hover:opacity-100"
      disabled={isMutating}
      type="button"
      onClick={onClick}
    >
      {isMutating ? 'Deleting...' : 'Delete'}
    </button>
  )
}