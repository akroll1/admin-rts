import React from 'react'
import { Box, Button, Flex, Icon, LightMode, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { VscChromeClose } from 'react-icons/vsc'
import { Timer } from './timer'

export const ShowsCountdownTimer = ({ showTime }) => {
  const removeCountdown = () => {
    document.getElementById('countdown-timer').remove();
  }
  return (
    <Flex 
      id="countdown-timer" 
      border="1px solid #795858"
      flexDirection="row" 
      color="white" 
      maxW="100%" 
      w="90%"
      p={["0", "0", "1"]}
      justifyContent="space-evenly"
      borderRadius="5px"
    >
      <Stack 
        direction={{base: 'column',md: 'row'}} 
        align="center" 
        justify="center" 
        spacing={{base: '2', md: '20', lg: '7.5rem'}}
      >
        <Text fontWeight="medium" fontSize="xl" mt="0">
          Starts In
        </Text>
          <Timer showTime={showTime} />
      </Stack>
    </Flex>
  )
}