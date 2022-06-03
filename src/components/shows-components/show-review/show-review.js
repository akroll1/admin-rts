import * as React from 'react'
import { Rating } from './rating'
import { Button, Flex, Heading, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { ReviewItem } from './review-item'

export const PredictionsReviews = ({ reviewType, predictionsAndReviews, setShowTheReviewForm, showTheReviewForm }) => {
  const type = reviewType.charAt(0) + reviewType.toLowerCase().slice(1);
  const renderType = predictionsAndReviews[reviewType]
  return (
    <>
      <Flex 
        flexDir="row"
        id="reviews"
        as="section"
        maxH="20%" 
        maxW="100%" 
        my="auto" 
        m="auto"
        p={{base: '4', md: '6',lg: '8'}} 
      >
        <Stack spacing="12" m="unset">
          { renderType?.length > 0 
          ? <Stack spacing={{base: '8'}}>
              <Heading fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
                Fan {type}s
              </Heading>
              <Stack spacing="5" direction="row" alignItems="center" shouldWrapChildren>
                  <Text fontSize="4xl" fontWeight="medium" lineHeight="1">
                    4.3
                  </Text>
                  <Stack spacing="1">
                    <Rating defaultValue={4} size="sm" />
                    <Text lineHeight="1" color={'gray.600'}>
                      Based on 128 {type}s
                    </Text>
                  </Stack>
                </Stack>
              <HStack spacing="4">
                <Button size="lg" variant="outline" alignSelf="center">
                  See all {type}s
                </Button>
                <Button onClick={() => setShowTheReviewForm(!showTheReviewForm)} size="lg" colorScheme="blue">
                  Write a {type}
                </Button>
              </HStack>
            </Stack>
          : 
            <Flex m="auto" flexDirection="column" alignItems="center" justifyContent="center">
              <Heading fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
                Be the first to write a {type}!
              </Heading>
              <Button mt="1rem" onClick={() => setShowTheReviewForm(!showTheReviewForm)} size="lg" colorScheme="blue">
                Write a {type}
              </Button>
            </Flex> 
          }
        </Stack>
      </Flex>
      <Flex flexDir="row" flexWrap="wrap" ml="0">
        {renderType?.length > 0 && renderType.map( (reviewItem, i) => <ReviewItem key={i} reviewItem={reviewItem} />)}
      </Flex>
    </>
  )
}