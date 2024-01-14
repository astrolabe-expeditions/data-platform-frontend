'use client'

import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { Navbar } from './Navbar'
import { Drawer } from './Sidebar/Drawer'
import { Sidebar } from './Sidebar/Sidebar'
import { SidebarContent } from './Sidebar/SidebarContent'

const Header = () => {
  const pathname = usePathname()

  const [isOpen, setOpen] = useState(false)

  const toogleDrawer = () => {
    setOpen(!isOpen)
  }

  return (
    <header>
      <Navbar onToogle={toogleDrawer} />
      <Drawer isOpen={isOpen} onClose={toogleDrawer}>
        <SidebarContent onItemClick={toogleDrawer} />
      </Drawer>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
    </header>
  )
}

export { Header }
