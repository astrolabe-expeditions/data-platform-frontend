import clsx from 'clsx'
import { Icon } from '../Icon/Icon'
import { ButtonBase } from './ButtonBase'

const Button = ({
  label,
  variant = 'solid',
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const spacings = {
    sm: 'py-2 px-3.5',
    md: 'py-2.5 px-4',
    lg: 'py-2.5 px-4',
    xl: 'py-3 px-5',
    '2xl': 'py-4 px-7',
  }

  const sizes = {
    sm: 'text-sm gap-1.5',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
    xl: 'text-base gap-2',
    '2xl': 'text-lg gap-2.5',
  }

  const hasSpacing = variant !== 'link'

  return (
    <ButtonBase
      className={clsx(
        className,
        'flex items-center',
        sizes[size],
        hasSpacing ? spacings[size] : null,
      )}
      variant={variant}
      {...props}>
      {leftIcon ? <Icon icon={leftIcon} /> : null}
      {label}
      {rightIcon ? <Icon icon={rightIcon} /> : null}
    </ButtonBase>
  )
}

export { Button }
