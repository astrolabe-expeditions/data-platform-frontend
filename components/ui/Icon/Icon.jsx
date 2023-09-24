import clsx from 'clsx'

const Icon = ({ size = 'md', icon, className }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-xl',
    lg: 'text-xl',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  }

  return (
    <span className={clsx(className, sizes[size])}>
      {typeof icon === 'function' ? icon() : icon}
    </span>
  )
}

export { Icon }
