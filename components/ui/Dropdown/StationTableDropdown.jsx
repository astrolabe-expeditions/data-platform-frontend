import { DropdownMenu, Button, IconButton, Dialog } from '@radix-ui/themes'
import { EllipsisVertical } from '../Icons'
import { Link } from '../Link'

const StationTableDropdown = ({ obj, ...props }) => {
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
        <Link href={`/stations/${obj.id}/edit`}>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
        </Link>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { StationTableDropdown }
