import clsx from 'clsx'
import { Icon } from '../Icon/Icon'
import { ButtonBase } from './ButtonBase'

const IconButton = ({
  icon,
  label,
  className,
  fullWidth,
  size = 'md',
  ...props
}) => {
  const sizes = {
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
    xl: 'p-3.5',
    '2xl': 'p-4',
  }

  return (
    <ButtonBase
      className={clsx(className, sizes[size])}
      aria-label={label}
      fullWidth={false}
      {...props}>
      <Icon icon={icon} size={size} />
    </ButtonBase>
  )
}

export { IconButton }
