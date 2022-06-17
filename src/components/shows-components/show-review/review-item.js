import React from 'react'
import { Box, Flex, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import { parseEpoch} from '../../../utils/utils'
import { ReviewPostStars } from '../../stars'

export const ReviewItem = ({ reviewItem }) => {
  const { displayName, rating, review, title, updatedAt } = reviewItem;
  return (
    <Stack my="8" p={["2"]} boxSizing="border-box" flex="0 0 45%" spacing="2.5" textAlign="left">
      <Box spacing="3" display="flex" flexDirection={["column", "row"]} alignItems={["flex-start", "center"]} justifyContent="flex-start">
        <ReviewPostStars minW="100%" rating={rating} size="sm" />
        <Heading pl={["0", "4"]} size="sm" maxW="50%" fontWeight="medium" color={useColorModeValue('black', 'white')}>
          {title}
        </Heading>
      </Box>
      <Text noOfLines={3} wordBreak="break-word">{review}</Text>
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