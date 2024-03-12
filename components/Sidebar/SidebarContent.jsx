import { useTranslations } from 'next-intl'

import { SidebarItem } from './SidebarItem'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogout } from './SidebarLogout'

function SidebarContent({ onItemClick }) {
  const t = useTranslations('Sidebar')

  return (
    <div className="h-full flex flex-col">
      <SidebarLogo className="px-3 pb-6 hidden lg:block" height={110} />
      <nav>
        <ul className="flex flex-col gap-1">
          <SidebarItem
            name={t('dashboard')}
            to="/"
            onItemClick={onItemClick}
            exact
          />
          <SidebarItem
            name={t('stations')}
            to="/stations"
            onItemClick={onItemClick}
          />
          <SidebarItem
            name={t('sensors')}
            to="/sensors"
            onItemClick={onItemClick}
          />
          <SidebarItem
            name={t('settings')}
            to="/settings"
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
