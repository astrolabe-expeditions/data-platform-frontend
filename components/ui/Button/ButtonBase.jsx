import clsx from 'clsx'

const ButtonBase = ({
  children,
  variant = 'solid',
  colorScheme = variant === 'solid' ? 'primary' : 'gray',
  disabled = false,
  fullWidth,
  className,
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
  }

  return (
    <button
      className={clsx(
        className,
        'rounded-lg border shadow-xs font-semibold focus:outline-none',
        fullWidth ? 'w-full' : null,
        variants[`${variant}_${colorScheme}`],
      )}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  )
}

export { ButtonBase }
