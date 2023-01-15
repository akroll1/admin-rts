import {useState} from 'react'
import { Box, HStack, Text, useInterval } from '@chakra-ui/react'

export const Timer = ({ showTime }) => {
    const expiresInSeconds = showTime;
    const { seconds, minutes, hours, days } = useTimer({ expiresInSeconds })
  return (
    <HStack spacing="4">
      <TimeUnit value={days} label="Days" />
      <TimeUnit value={hours} label="Hours" />
      <TimeUnit value={minutes} label="Minutes" />
      <TimeUnit value={seconds} label="Seconds" />
    </HStack>
  )
}

const TimeUnit = props => {
  const { value, label } = props
  return (
    <Box textAlign="center">
      <Text
        fontWeight="semibold"
        fontSize={{base: 'xl', md: 'lg'}} lineHeight="1">
        {value.toLocaleString('en-US', {minimumIntegerDigits: 2})}
      </Text>
      <Text fontSize="xs" color="gray.400">
        {label}
      </Text>
    </Box>
  )
}

const useTimer = props => {
  const { expiresInSeconds } = props
  const [seconds, setSeconds] = useState(getSecondsFromExpiry(expiresInSeconds+1000))

  useInterval(() => setSeconds(getSecondsFromExpiry(expiresInSeconds)), 1000)
  return {
    seconds: Math.floor(seconds % 60),
    minutes: Math.floor((seconds % (60 * 60)) / 60),
    hours: Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)),
    days: Math.floor(seconds / (60 * 60 * 24)),
  }
}

const getSecondsFromExpiry = (expire) => Math.round((expire - Date.now()) / 1000)