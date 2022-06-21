import React from 'react'
import { Box, Img, Stack, Text } from '@chakra-ui/react'

export const TableUser = ({gsDisplayName}) => {
  let image = '';
  return (
    <Stack m="auto" direction="row" spacing="4" align="center">
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
        <Box m="auto" fontSize="sm" fontWeight="medium">
          <Text>
            {gsDisplayName}
          </Text>
        </Box>
    </Stack>
  )
}