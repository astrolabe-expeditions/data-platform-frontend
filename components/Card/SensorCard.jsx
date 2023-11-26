import { useTranslations as getTranslations } from 'next-intl'
import { Card, Flex, Avatar, Box, Text } from '@radix-ui/themes'

const SensorCard = ({ sensor }) => {
  return (
    <Card className="mb-10">
      <a href={`/sensors/${sensor.id}`}>
        <Flex gap="3" align="center">
          <Avatar size="3" radius="full" fallback="S" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {sensor.identifier}
            </Text>
            <Text as="div" size="2" color="gray">
              Other usefull info like id: {sensor.id}
            </Text>
            <Text as="div" size="2" color="gray">
              <strong>Station:</strong> {sensor.station.name}
            </Text>
          </Box>
        </Flex>
      </a>
    </Card>
  )
}

export { SensorCard }
