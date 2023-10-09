import { Typography } from '../ui/Typography'
import clsx from 'clsx'

const PageHeader = ({ title, className }) => {
  return (
    <header className={clsx(className, 'mb-8')}>
      <Typography variant="title">{title}</Typography>
    </header>
  )
}

export { PageHeader }
