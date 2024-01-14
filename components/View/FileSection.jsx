import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { FileListItem } from '@/components/Card/FileListItem'
import { Button } from '@/components/ui/Button/Button'
import { Typography } from '@/components/ui/Typography'
import { uploadFile } from '@/lib/queries'

const FilesSection = ({ sensorId, files }) => {
  const queryClient = useQueryClient()
  const t = useTranslations('FileSection')
  const hiddenFileInput = useRef(null)

  const { mutate, isError, error } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.setQueryData(['sensors', sensorId], data)
    },
  })

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleInputChange = function (event) {
    if (event?.target?.files?.length > 0) {
      mutate({ file: event.target.files[0], sensorId: sensorId })
    }
  }

  return (
    <section className="mt-6">
      <header className="flex items-center">
        <Typography variant="sectionTitle">{t('title')}</Typography>
        <div className="ml-auto">
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            accept=".csv"
          />
          <Button onClick={handleClick} label={t('upload')} />
        </div>
      </header>
      <div className="flex flex-col mt-4">
        {files.length === 0 ? (
          <Typography variant="body1">{t('noFile')}</Typography>
        ) : null}
        {files.length > 0
          ? files.map((file) => {
              return <FileListItem key={file.id} file={file} className="mt-2" />
            })
          : null}
      </div>
    </section>
  )
}

export { FilesSection }
