import clsx from 'clsx'
import { Icon } from '../Icon/Icon'

const IconButton = ({
  icon,
  label,
  size = 'md',
  variant = 'primary',
  disabled = false,
  onClick,
}) => {
  const variants = {
    primary: [
      'text-white',
      'border-primary-600',
      'bg-primary-600',
      'hover:border-primary-700',
      'hover:bg-primary-700',
      'focus:border-primary-600',
      'focus:bg-primary-600',
      'focus:ring-4',
      'focus:ring-primary-100',
      'disabled:border-primary-200',
      'disabled:bg-primary-200',
    ],
    secondary: [
      'text-gray-800',
      'border-gray-300',
      'hover:bg-gray-50',
      'focus:ring-4',
      'focus:ring-gray-100',
      'disabled:text-gray-300',
      'disabled:border-gray-200',
      'disabled:bg-white',
    ],
  }

  const sizes = {
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
    xl: 'p-3.5',
    '2xl': 'p-4',
  }

  return (
    <button
      className={clsx(
        'rounded-lg border shadow-xs font-semibold focus:outline-none',
        sizes[size],
        variants[variant],
      )}
      aria-label={label}
      onClick={onClick}>
      <Icon icon={icon} size={size} />
    </button>
  )
}

export { IconButton }
