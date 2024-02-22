import { DropdownMenu, Button, IconButton, Dialog } from '@radix-ui/themes'
import { EllipsisVertical } from '../Icons'
import { Link } from '../Link'

import { useRouter } from 'next/navigation'

const StationTableDropdown = ({ obj, ...props }) => {
  const router = useRouter()
  const removeStation = async () => {
    const confirmed = confirm('Are you sure you want to delete this Station?')

    if (confirmed) {
      const res = await fetch(`/api/v1/stations/${obj.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh()
      }
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="soft" size={'2'}>
          <EllipsisVertical
            width="20"
            height="20"
            color={'gray'}></EllipsisVertical>
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Link href={`/admin/stations/${obj.id}/edit`}>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
        </Link>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onClick={removeStation}>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { StationTableDropdown }
