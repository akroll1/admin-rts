import React from 'react'
import { Avatar, Box, Flex, useColorModeValue } from '@chakra-ui/react'

export const CardWithAvatar = props => {
  const { children, avatarProps, ...rest } = props;
  return (
    <Flex
      maxW={["70%", "40%", "25%"]}
      m="4"
      mt="2"
      justifyContent="space-between"
      minHeight="10rem"
      flex="1 0 35%"
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      bg={useColorModeValue('white', 'gray.700')}
      shadow={{ md: 'base' }}
      {...rest}
    >
      <Box position="absolute" inset="0" height="20" bg="red.600" roundedTop="inherit" />
      <Avatar size="xl" {...avatarProps} />
      {children}
    </Flex>
  )
}