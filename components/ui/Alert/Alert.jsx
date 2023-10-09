import clsx from 'clsx'

const Alert = ({ variant = 'default', children } = {}) => {
  const variants = {
    default: '',
    destructive: 'border-destructive-300 text-destructive-500',
  }
  return (
    <div
      role="alert"
      className={clsx(
        'relative w-full rounded-lg border p-4',
        variants[variant],
      )}>
      {children}
    </div>
  )
}

export { Alert }
