import * as React from 'react'
import { Rating } from './rating'
import { Box, Button, Flex, Heading, HStack, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { ReviewItem } from './review-item'

export const ShowReviews = ({ showReviews, setShowTheReviewForm, showTheReviewForm }) => {
  
  return (
    <>
      <Box maxH="20%" maxW="100%" mx="auto" px={{base: '4', md: '8',lg: '12'}} py={{base: '6', md: '8', lg: '12'}}>
        <Stack spacing="12">
          {showReviews?.length > 0 
          ? <Stack spacing={{base: '8'}}>
            <Heading fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
              Fan reviews
            </Heading>
            <Stack spacing="5" direction="row" alignItems="center" shouldWrapChildren>
                <Text fontSize="4xl" fontWeight="medium" lineHeight="1">
                  4.3
                </Text>
                <Stack spacing="1">
                  <Rating defaultValue={4} size="sm" />
                  <Text lineHeight="1" color={'gray.600'}>
                    Based on 128 reviews
                  </Text>
                </Stack>
              </Stack>
            <HStack spacing="4">
              <Button size="lg" variant="outline" alignSelf="center">
                See all reviews
              </Button>
              <Button onClick={() => setShowTheReviewForm(!showTheReviewForm)} size="lg" colorScheme="blue">
                Write a review
              </Button>
            </HStack>
          </Stack>
          : <Flex flexDirection="column" alignItems="center" justifyContent="center">
              <Heading fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
                Be the first to write a review!
              </Heading>
              <Button mt="1rem" onClick={() => setShowTheReviewForm(!showTheReviewForm)} size="lg" colorScheme="blue">
                Write a review
              </Button>
            </Flex> 
          }
          <SimpleGrid columns={{base: 1, md: 2}} columnGap="12" rowGap={{base: '10', md: '12'}}>
            {showReviews?.length > 0 && showReviews.map( (reviewItem, i) => <ReviewItem key={i} reviewItem={reviewItem} />)}
          </SimpleGrid>
        </Stack>
      </Box>
    </>
  )
}