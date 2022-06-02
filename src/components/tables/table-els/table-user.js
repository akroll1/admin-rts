import React from 'react'
import { Box, Img, Stack } from '@chakra-ui/react'

export const TableUser = ({gsDisplayName}) => {
  let image = '';
  return (
    <Stack direction="row" spacing="4" align="center">
      {/* <Box flexShrink={0} h="10" w="10">
        <Img
          objectFit="cover"
          htmlWidth="160px"
          htmlHeight="160px"
          w="10"
          h="10"
          rounded="full"
          // src={image}
          src={image}
          alt=""
        />
      </Box> */}
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          {/* {name} */}
          {gsDisplayName}
        </Box>
        {/* <Box fontSize="sm" color="gray.500">
          {email}
          email here
        </Box> */}
      </Box>
    </Stack>
  )
}