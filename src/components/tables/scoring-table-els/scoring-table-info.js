import React from 'react'
import { Avatar, Box, Flex, Img, Stack, useColorModeValue as mode} from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'

export const ScoringTableInfo = ({ username, prediction }) => {
  const usernameCheck = username => {
    if(username.includes('@')){
      return username.slice(0, username.indexOf('@'))
    } 
    return username; 
  }
  return (
    <Stack direction="row" spacing="4" align="center">
      <Flex p="1" flexDirection="column" flex="1 0 50%" h="10" alignItems="center" justifyContent="center">
        {/* <Avatar mt="-1" textAlign="center" size="xs" /> */}
        <Box mt="2" fontSize="sm"  color="white" fontWeight="bold">
            { usernameCheck(username) }
        </Box>
        <Box mt="2" fontSize="sm"  color="white" fontWeight="normal">
          {`${capFirstLetters(prediction)}`}
        </Box>
        {/* <Img
          objectFit="cover"
          htmlWidth="160px"
          htmlHeight="160px"
          w="10"
          h="10"
          rounded="full"
          src={image}
          alt=""
        /> */}
      </Flex>
    </Stack>
  )
}
