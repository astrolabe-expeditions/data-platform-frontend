'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SidebarLogout = () => {
  const router = useRouter()
  const handleClick = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/auth/login')
    })
  }
  return <button onClick={handleClick}>Se déconnecter</button>
}

export { SidebarLogout }
