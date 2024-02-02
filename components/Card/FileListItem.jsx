import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'

import { Typography } from '@/components/ui/Typography'
import { IconButton } from '@/components/ui/Button'
import { Repeat } from '@/components/ui/Icons'
import { processFile } from '@/lib/queries'

const FileListItem = ({ file, className }) => {
  const t = useTranslations('FileListItem')
  const { mutate } = useMutation({ mutationFn: processFile })

  const handleRelaunch = () => {
    console.log('Relaunch process')
    mutate(file.id)
  }

  return (
    <div className={clsx('flex', className)}>
      <div className="flex flex-col">
        <Typography className="font-bold">{file.name}</Typography>
        <Typography>
          {t(
            'uploaded_at',
            { uploadedAt: new Date(file.created_at) },
            {
              dateTime: {
                short: {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                },
              },
            },
          )}
        </Typography>
      </div>
      <div className="ml-auto flex items-center">
        <Typography>{file.status}</Typography>
        <IconButton
          className="ml-2"
          icon={Repeat}
          onClick={handleRelaunch}
          aria-label="Relaunch process"
        />
      </div>
    </div>
  )
}

export { FileListItem }
