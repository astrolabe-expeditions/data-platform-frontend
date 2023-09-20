import { SidebarItem } from './SidebarItem'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogout } from './SidebarLogout'

const Sidebar = () => {
  return (
    <div className="w-72 h-screen bg-primary-700 px-4 py-8 flex flex-col">
      <SidebarLogo />
      <nav>
        <ul className="flex flex-col gap-1">
          <SidebarItem name="Stations" to="/" />
          <SidebarItem name="Sensors" to="/sensors" />
        </ul>
      </nav>
      <div className="mt-auto">
        <SidebarLogout />
      </div>
    </div>
  )
}

export { Sidebar }
