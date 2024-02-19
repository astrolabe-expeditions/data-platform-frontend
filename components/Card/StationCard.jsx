'use client'
import { useTranslations as getTranslations } from 'next-intl'
import { Card, Flex, Avatar, Box, Text, Badge } from '@radix-ui/themes'
import { Link } from '../ui/Link'

const StationCard = ({ station }) => {
  const t = getTranslations('StationTable')
  console.log(station)
  return (
    <Card className="mb-2">
      <a href={`/admin/stations/${station.id}`}>
        <Flex gap="3" align="center">
          <Avatar size="3" radius="full" fallback={'S'} />
          <Box>
            <Text as="div" size="2" weight="bold">
              {station.name.toUpperCase()}
            </Text>
            <Flex gap="2">
              <Text as="div" size="2" color="gray">
                <strong>{t('labels.type')}:</strong>
              </Text>
              <Badge color="orange">{station.type}</Badge>
            </Flex>
            <Flex gap="2">
              <Text as="div" size="2" color="gray">
                <strong>{t('labels.description')}: </strong>
                {station.description}
              </Text>
            </Flex>
            <Flex gap="2">
              <Text as="div" size="2" color="gray">
                <strong>{t('labels.latitude')}: </strong>
                {station.latitude}
              </Text>
            </Flex>
            <Flex gap="2">
              <Text as="div" size="2" color="gray">
                <strong>{t('labels.longitude')}: </strong>
                {station.longitude}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </a>
    </Card>
  )
}

export { StationCard }
