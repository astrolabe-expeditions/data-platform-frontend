import clsx from 'clsx'
import { Typography } from '../Typography'



const Link = ({
  children,
  variant = 'body1',
  href,
  as = 'a',
  color = 'primary',
  ...props
}) => {
  const colors = {
    primary: 'hover:text-primary-700',
  }

  return (
    <Typography
      variant={variant}
      href={href}
      className={clsx('hover:underline', colors[color])}
      color={color}
      as={as}
      {...props}>
      {children}
    </Typography>
  )
}

export { Link }
