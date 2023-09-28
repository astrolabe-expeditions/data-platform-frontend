import clsx from 'clsx'
import { Icon } from '../Icon/Icon'
import { ButtonBase } from './ButtonBase'

const Button = ({
  label,
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const sizes = {
    sm: 'py-2 px-3.5 text-sm gap-1.5',
    md: 'py-2.5 px-4 text-sm gap-1.5',
    lg: 'py-2.5 px-4 text-base gap-2',
    xl: 'py-3 px-5 text-base gap-2',
    '2xl': 'py-4 px-7 text-lg gap-2.5',
  }

  return (
    <ButtonBase
      className={clsx(className, 'flex items-center', sizes[size])}
      {...props}>
      {leftIcon ? <Icon icon={leftIcon} /> : null}
      {label}
      {rightIcon ? <Icon icon={rightIcon} /> : null}
    </ButtonBase>
  )
}

export { Button }
