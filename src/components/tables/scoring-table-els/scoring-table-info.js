import React from 'react'
import { Avatar, Box, Flex, Img, VStack, useColorModeValue as mode} from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'

export const ScoringTableInfo = ({ 
  fighters,
  prediction,
  username, 
}) => {
  const usernameCheck = username => {
    if(username?.includes('@')){
      return username.slice(0, username.indexOf('@'))
    } 
    return username; 
  }

  console.log('fighters: ', fighters)

  return (
    <VStack spacing="1">
      <Flex mt="0" p="1" pt="0" flexDirection="column" alignItems="flex-start" justifyContent="flex-start">

        <Box className='username' fontSize="sm"  color="white" fontWeight="bold">
            { usernameCheck(username) }
        </Box>
        <Box fontSize="sm"  color="white" fontWeight="normal">
         {fighters[0]}
        </Box>
        <Box fontSize="sm"  color="white" fontWeight="normal">
          {fighters[1]}
        </Box>
        {/* <Box mt="2" fontSize="sm"  color="white" fontWeight="normal">
          {prediction ? `${capFirstLetters(prediction.replace(/,/g,"-"))}` : `None`}
        </Box> */}
  
      </Flex>
    </VStack>
  )
}
