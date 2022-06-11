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
      flexDirection="row" 
      borderRadius="2px" 
      bg={useColorModeValue('black', 'gray.700')} 
      color="white" 
      maxW="100%" 
      w="100%"
      mt="4"
      px={{base: '4', md: '4', lg: '4'}} 
      py={{base: '3', md: '2.5'}}
      justifyContent="space-evenly"
    >
      <Stack 
        direction={{base: 'column',md: 'row'}} 
        align="center" 
        justify="center" 
        spacing={{base: '2', md: '20', lg: '7.5rem'}}
      >
        <Text fontWeight="medium" fontSize="xl">
          Starts In
        </Text>
          <Timer showTime={showTime} />
        <Box onClick={removeCountdown} as="button" aria-label="Close banner" position="absolute" right={{base: '2', md: '4', lg: '2rem'}} top={{base: '0', md: 'unset'}}>
          {/* <Icon as={VscChromeClose} boxSize={{base: '5', md: '6'}}/> */}
        </Box>
      </Stack>
    </Flex>
  )
}