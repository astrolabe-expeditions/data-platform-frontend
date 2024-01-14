import { useTranslations } from 'next-intl'

import { Typography } from '@/components/ui/Typography'

const FileListItem = ({ file }) => {
  const t = useTranslations('FileListItem')

  return (
    <div className="flex">
      <div className="flex flex-col">
        <Typography className="font-bold">{file.name}</Typography>
        <Typography>
          {t(
            'uploaded_at',
            { uploadedAt: file.created_at },
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
      <div className="ml-auto">{file.status}</div>
    </div>
  )
}

export { FileListItem }
