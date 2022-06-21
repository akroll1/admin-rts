import React from 'react'
import { HStack, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'

export const Rating = (props) => {
  const { handleStarValueChange, defaultValue = 5, max = 5, size = 'md', rootProps } = props
  const color = useColorModeValue('gray.300', 'gray.600')
  const activeColor = useColorModeValue('blue.500', 'blue.200')
  return (
    <HStack spacing="0.5" {...rootProps}>
      {Array.from({
        length: max,
      })
        .map((_, index) => index + 1)
        .map((index) => (
          <Icon
            _hover={{cursor: 'pointer'}}
            id={index}
            key={index}
            as={FaStar}
            fontSize={size}
            color={index <= defaultValue ? activeColor : color}
            onClick={handleStarValueChange}
          />
        ))}
    </HStack>
  )
}