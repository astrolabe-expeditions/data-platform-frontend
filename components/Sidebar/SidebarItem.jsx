'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const SidebarItem = ({ name, to, onItemClick }) => {
  const base = 'rounded-lg px-3 py-2 text-base hover:bg-primary-600'
  const pathname = usePathname()

  return (
    <li onClick={onItemClick}>
      <Link href={to} passHref>
        <div
          className={clsx(
            base,
            pathname === to ? 'bg-primary-600 text-white' : 'text-primary-100',
          )}>
          {name}
        </div>
      </Link>
    </li>
  )
}

export { SidebarItem }
