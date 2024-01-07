import clsx from 'clsx'

const ButtonBase = ({
  children,
  variant = 'solid',
  colorScheme = variant === 'solid' ? 'primary' : 'gray',
  disabled = false,
  fullWidth,
  className,
  component,
  ...props
}) => {
  const variants = {
    solid_primary: [
      'text-white',
      `border-primary-600`,
      `bg-primary-600`,
      `hover:border-primary-700`,
      `hover:bg-primary-700`,
      `focus:border-primary-600`,
      `focus:bg-primary-600`,
      'focus:ring-4',
      `focus:ring-primary-100`,
      `disabled:border-primary-200`,
      `disabled:bg-primary-200`,
    ],
    outline_gray: [
      `text-gray-800`,
      `border-gray-300`,
      `hover:bg-gray-50`,
      'focus:ring-4',
      `focus:ring-gray-100`,
      `disabled:text-gray-300`,
      `disabled:border-gray-200`,
      'disabled:bg-white',
    ],
    ghost_primary: [
      `text-primary-500`,
      `hover:bg-primary-50`,
      `hover:text-primary-600`,
      `focus:text-primary-500`,
      `disabled:text-primary-300`,
      'disabled:bg-white',
    ],
    ghost_gray: [
      `text-gray-500`,
      `hover:bg-gray-50`,
      `hover:text-gray-600`,
      `focus:text-gray-500`,
      `disabled:text-gray-300`,
      'disabled:bg-white',
    ],
    link_primary: [
      `text-primary-500`,
      `hover:text-primary-600`,
      `focus:text-primary-500`,
      `disabled:text-primary-300`,
    ],
    link_gray: [
      `text-gray-500`,
      `hover:text-gray-600`,
      `focus:text-gray-500`,
      `disabled:text-gray-300`,
    ],
  }

  const Component = component || 'button'

  return (
    <Component
      className={clsx(
        className,
        variant !== 'ghost' && variant !== 'link' ? 'border shadow-xs' : null,
        variant !== 'link' ? 'rounded-lg' : null,
        'font-semibold focus:outline-none',
        fullWidth ? 'w-full' : null,
        variants[`${variant}_${colorScheme}`],
      )}
      disabled={disabled}
      {...props}>
      {children}
    </Component>
  )
}

export { ButtonBase }
