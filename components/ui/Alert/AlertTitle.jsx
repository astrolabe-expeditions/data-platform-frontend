import clsx from 'clsx'

const AlertTitle = ({ children, className }) => {
  return <h4 className={clsx('mb-1 font-medium', className)}>{children}</h4>
}

export { AlertTitle }
