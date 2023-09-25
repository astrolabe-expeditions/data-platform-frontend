import { DotsVertical, Trash } from '../Icons'
import { Button } from './Button'

export default {
  component: Button,
}

const renderVariants = ({ ...args }) => (
  <div className="flex gap-2.5 items-start">
    <Button variant="primary" {...args} />
    <Button variant="secondary" {...args} />
  </div>
)

export const Default = {
  args: {
    label: 'Default',
  },
  render: renderVariants,
}

export const Sizes = {
  args: {
    label: 'Default',
  },
  render: ({ ...args }) => (
    <div className="flex gap-2.5 items-start">
      <Button size="sm" {...args} />
      <Button size="md" {...args} />
      <Button size="lg" {...args} />
      <Button size="xl" {...args} />
      <Button size="2xl" {...args} />
    </div>
  ),
}

export const Icons = {
  args: {
    label: 'Default',
    leftIcon: <Trash />,
    rightIcon: <DotsVertical />,
  },
  render: ({ ...args }) => (
    <div className="flex gap-2.5 items-start">
      <Button size="sm" {...args} />
      <Button size="md" {...args} />
      <Button size="lg" {...args} />
      <Button size="xl" {...args} />
      <Button size="2xl" {...args} />
    </div>
  ),
}

export const Disabled = {
  args: {
    label: 'Default',
    disabled: true,
  },
  render: renderVariants,
}
