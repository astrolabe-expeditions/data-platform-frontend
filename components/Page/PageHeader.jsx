import { Typography } from '../ui/Typography'

const PageHeader = ({ title }) => {
  return (
    <header className="mb-8">
      <Typography variant="title">{title}</Typography>
    </header>
  )
}

export { PageHeader }
