import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { FileListItem } from '@/components/Card/FileListItem'
import { Button } from '@/components/ui/Button/Button'
import { Typography } from '@/components/ui/Typography'

const FilesSection = ({ sensorId, files }) => {
  const t = useTranslations('Sensors')

  return (
    <section className="mt-6">
      <header className="flex items-center">
        <Typography variant="sectionTitle">Files</Typography>
        <Button
          className="ml-auto"
          href={`${sensorId}/upload`}
          component={Link}
          label={t('labels.upload_file')}
        />
      </header>
      <div className="flex flex-col mt-4">
        {files.length > 0
          ? files.map((file) => {
              return <FileListItem key={file.id} file={file} />
            })
          : null}
      </div>
    </section>
  )
}

export { FilesSection }
