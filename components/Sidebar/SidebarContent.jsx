import { SidebarItem } from './SidebarItem'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogout } from './SidebarLogout'

function SidebarContent({ onItemClick }) {
  return (
    <div className="h-full flex flex-col">
      <SidebarLogo className="px-3 pb-6 hidden lg:block" height={110} />
      <nav>
        <ul className="flex flex-col gap-1">
          <SidebarItem name="Dashboard" to="/admin" onItemClick={onItemClick} />
          <SidebarItem
            name="Stations"
            to="/admin/stations"
            onItemClick={onItemClick}
          />
          <SidebarItem
            name="Sensors"
            to="/admin/sensors"
            onItemClick={onItemClick}
          />
        </ul>
      </nav>
      <div className="mt-auto">
        <SidebarLogout />
      </div>
    </div>
  )
}

export { SidebarContent }
