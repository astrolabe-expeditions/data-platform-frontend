import { DotsVertical } from '../Icons'
import { IconButton } from './IconButton'

export default {
  component: IconButton,
}

const renderVariants = ({ ...args }) => (
  <div className="flex gap-2.5 items-start">
    <IconButton variant="primary" {...args} />
    <IconButton variant="secondary" {...args} />
  </div>
)

export const Default = {
  args: {
    label: 'Default',
    icon: <DotsVertical />,
  },
  render: renderVariants,
}

export const Sizes = {
  args: {
    label: 'Default',
    icon: <DotsVertical />,
  },
  render: ({ ...args }) => (
    <div className="flex gap-2.5 items-start">
      <IconButton size="sm" {...args} />
      <IconButton size="md" {...args} />
      <IconButton size="lg" {...args} />
      <IconButton size="xl" {...args} />
      <IconButton size="2xl" {...args} />
    </div>
  ),
}
