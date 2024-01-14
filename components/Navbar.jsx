'use client'

import { IconButton } from '@/components/ui/Button'
import { Bar } from '@/components/ui/Icons'
import { SidebarLogo } from './Sidebar/SidebarLogo'

const Navbar = ({ onToogle }) => {
  return (
    <div className="sticky top-0 bg-primary-700 lg:hidden flex items-center px-4 py-3">
      <IconButton icon={Bar} onClick={onToogle} />
      <SidebarLogo className="ml-4" height={48} />
    </div>
  )
}

export { Navbar }
