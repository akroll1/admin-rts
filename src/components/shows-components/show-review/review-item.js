import React from 'react'
import { Box, Flex, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import { parseEpoch} from '../../../utils/utils'
import { ReviewPostStars } from '../../stars'

export const ReviewItem = ({ 
  reviewItem 
}) => {
  const { username, rating, review, title, updatedAt } = reviewItem;
  return (
    <Stack 
      my="2" 
      p={["2", "4"]} 
      boxSizing="border-box" 
      flex="0 0 45%" 
      spacing="2.5" 
      textAlign="left"
      justifyContent="flex-start"
      w="100%"
      maxW={["100%", "50%"]}
    >
      <Box 
        spacing="3" 
        display="flex" 
        flexDirection={["column", "row"]} 
        alignItems={["flex-start", "center"]} 
        justifyContent="flex-start"
      >
        <Flex minW="100%" display="inline-flex" flexWrap="wrap">
          <ReviewPostStars 
            rating={rating} 
            minW="100%" 
            size="sm" 
          />
          <Box>
            <Heading display="inline-flex" flex="1 0 50%" m="auto" size="sm" fontWeight="medium" color={useColorModeValue('black', 'white')}>
              {title}
            </Heading>
          </Box>
        </Flex>
      </Box>
      <Text minH={["3rem","4.5rem"]} noOfLines={3} wordBreak="break-word">{review}</Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
        - {username} on {parseEpoch(updatedAt,'reviews')}
      </Text>
      <Flex justifyContent="flex-start">
        <Icon h={4} w={4} onClick={() => console.log('clicking icon')} as={FaRegThumbsUp} _hover={{cursor: 'pointer'}} />
        <Icon h={4} w={4} ml="1rem" onClick={() => console.log('clicking icon')} as={FaRegThumbsDown} _hover={{cursor: 'pointer'}} />
      </Flex>
    </Stack>
  )
}