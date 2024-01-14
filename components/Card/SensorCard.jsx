import { useTranslations as getTranslations } from 'next-intl'
import { Card, Flex, Avatar, Box, Text, Badge } from '@radix-ui/themes'

const SensorCard = ({ sensor }) => {
  const t = getTranslations('Sensors')

  return (
    <Card className="mb-2">
      <a href={`/sensors/${sensor.id}`}>
        <Flex gap="3" align="center">
          <Box>
            <Text as="div" size="2" weight="bold">
              {sensor.identifier}
            </Text>
            <Flex gap="2">
              <Text as="div" size="2" color="gray">
                <strong>{t('upload_screen.type')}:</strong>
              </Text>
              <Badge color="orange">{sensor.type}</Badge>
            </Flex>
            <Text as="div" size="2" color="gray">
              <strong>{t('upload_screen.nbr_measures')}: </strong>
              {sensor.nbr_measures}
            </Text>
            {sensor.station ? (
              <Text as="div" size="2" color="gray">
                <strong>{t('upload_screen.station')}:</strong>{' '}
                {sensor.station.name}
              </Text>
            ) : null}
          </Box>
        </Flex>
      </a>
    </Card>
  )
}

export { SensorCard }
