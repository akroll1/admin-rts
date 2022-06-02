import React from 'react'
import { Flex, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import { parseEpoch} from '../../../utils/utils'
import { ReviewPostStars } from '../../stars'

export const ReviewItem = ({ reviewItem }) => {
  const { displayName, id, rating, review, title, updatedAt } = reviewItem;
  return (
    <Stack spacing="2.5">
      <Stack direction="row" spacing="3">
        <ReviewPostStars rating={rating} size="sm" />
        <Heading size="sm" fontWeight="medium" color={useColorModeValue('black', 'white')}>
          {title}
        </Heading>
      </Stack>
      <Text>{review}</Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
        - {displayName} on {parseEpoch(updatedAt,'reviews')}
      </Text>
      <Flex justifyContent="flex-start">
        <Icon h={4} w={4} onClick={() => console.log('clicking icon')} as={FaRegThumbsUp} _hover={{cursor: 'pointer'}} />
        <Icon h={4} w={4} ml="1rem" onClick={() => console.log('clicking icon')} as={FaRegThumbsDown} _hover={{cursor: 'pointer'}} />
      </Flex>
    </Stack>
  )
}