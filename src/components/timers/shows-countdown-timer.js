import React from 'react'
import { Box, Button, Flex, Icon, LightMode, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { VscChromeClose } from 'react-icons/vsc'
import { Timer } from './timer'

export const ShowsCountdownTimer = ({ showTime }) => {
  const removeCountdown = () => {
    document.getElementById('countdown-timer').remove();
  }
  return (
    <Flex id="countdown-timer" flexDirection="row" as="section" p="1">
      <Box borderRadius="3px" bg={useColorModeValue('black', 'gray.700')} color="white" position="relative">
        <Box maxW="7xl" mx="auto" px={{base: '4', md: '8', lg: '12'}} py={{base: '3', md: '2.5'}}>
          <Stack direction={{base: 'column',md: 'row'}} align="center" justify="center" spacing={{base: '2', md: '20', lg: '7.5rem'}}>
            <Text fontWeight="medium" fontSize="xl">
              Starts In
            </Text>
            <Timer showTime={showTime} />
            <LightMode>
              <Button onClick={() => console.log('get text reminder')} bg="white" color="black" px="12" display={{base: 'none', md: 'inline-block'}} _focus={{boxShadow: 'none'}} _focusVisible={{boxShadow: 'outline'}}>
                Get Text Reminder
              </Button>
            </LightMode>
            <Box onClick={removeCountdown} as="button" aria-label="Close banner" position="absolute" right={{base: '2', md: '4', lg: '1rem'}} top={{base: '0', md: 'unset'}}>
              <Icon as={VscChromeClose} boxSize={{base: '5', md: '6'}}/>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
}