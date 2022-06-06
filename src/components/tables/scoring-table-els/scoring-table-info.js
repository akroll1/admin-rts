import React from 'react'
import { Avatar, Box, Flex, Img, Stack, useColorModeValue as mode} from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'

export const ScoringTableInfo = ({ data, fighterA, fighterB }) => {
    // console.log('scoringTableInfo: ', data);
  const characterLimit = word => {
    if(word.length > 17){
      return word.slice(0,17) + '...';
    }
    return word;
  }
  const { player } = data;
  return (
    <Stack direction="row" spacing="4" align="center">
      <Flex mr="1rem" p="1" flexDirection="column" flex="1 0 50%" h="10" alignItems="center" justifyContent="space-between">
        <Avatar mt="-1" textAlign="center" size="xs" />
        <Box mt="2" fontSize="sm"  color="white" fontWeight="bold">
            {characterLimit(player)}
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
