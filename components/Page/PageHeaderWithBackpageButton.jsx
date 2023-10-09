import { PageHeader } from './PageHeader'
import { BackpageButton } from '../ui/Button/BackpageButton'
import clsx from 'clsx'

const PageHeaderWithBackpageButton = ({ title, className }) => {
  return (
    <>
      <BackpageButton></BackpageButton>
      <PageHeader title={title} className={className} />
    </>
  )
}

export { PageHeaderWithBackpageButton }
