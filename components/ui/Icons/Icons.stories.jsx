//boxicons-logos is path to folder which contains all icons
import * as Icons from './index'
import { Icon } from '../Icon/Icon'

const AllIcons = () => {
  const icons = Object.values(Icons)
  return (
    <div className="flex gap-4 text-gray-800">
      {icons.map((icon, idx) => (
        <Icon icon={icon} key={`icon${idx}`} />
      ))}
    </div>
  )
}

export default {
  component: AllIcons,
}

export const All = {}
