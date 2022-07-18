import * as React from 'react'
import { Rating } from './rating'
import { Button, ButtonGroup, Flex, Heading, HStack, Stack, Text, useToast } from '@chakra-ui/react'
import { ReviewItem } from './review-item'
import { stateStore } from '../../../stores'
import axios from 'axios';
export const PredictionsReviews = ({ 
  reviewType, 
  predictionsAndReviews, 
  setShowReviewForm, 
  showReviewForm 
}) => {
  const toast = useToast();
  const { user: { sub } , tokenConfig } = stateStore.getState();
  console.log('sub: ', sub)
  const type = reviewType.charAt(0) + reviewType.toLowerCase().slice(1);
  const renderType = predictionsAndReviews[reviewType];

  const handleLikeClick = likeType => {
    console.log('likeType: ', likeType)
    if(!sub){
      return toast({ 
        title: 'Must be signed in.',
        duration: 5000,
        status: 'error',
        isClosable: true
      })
    }
    const url = process.env.REACT_APP_LIKES;
    return axios.put(url, tokenConfig)
      .then( res => console.log('res: ', res))
      .catch( err => console.log(err));
  };

  return (
    <Flex 
      id="reviews_predictions"
      w="100%"
      flexDir='column'
      flexWrap="wrap"
      as="section"
      maxH="20%" 
      maxW="100%" 
      p="2" 
    >
      <Stack spacing="12" m="auto">
        { renderType?.length > 0 
        ? <Stack spacing={{base: '8'}}>
            <Heading fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
              Fan {type}s
            </Heading>
            <Stack 
              spacing="5" 
              direction="row" 
              alignItems="center" 
              shouldWrapChildren
            >
              <Text fontSize="4xl" fontWeight="medium" lineHeight="1">
                4.3
              </Text>
              <Stack spacing="1">
                <Rating defaultValue={4} size="sm" />
                <Text lineHeight="1" color={'gray.600'}>
                  {`Based on ${Math.floor(Math.random()* 1000)} ${type}s`}
                </Text>
              </Stack>
            </Stack>
            <HStack m="auto" maxW="100%" spacing="4">
              <ButtonGroup 
                m="auto" 
                flexDir={['column', 'row']} 
                size={["sm", "md", "lg"]} 
                mb="4"
              >
                <Button variant="outline">
                  See all {type}s
                </Button>
                <Button 
                  mt={["2", "0"]} 
                  onClick={() => setShowReviewForm(!showReviewForm)} 
                  colorScheme="blue"
                >
                  Write a {type}
                </Button>
              </ButtonGroup>
            </HStack>
          </Stack>
        : 
          <Flex m="auto" flexDirection="column" alignItems="center" justifyContent="center">
            <Heading fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
              Be the first to write a {type}!
            </Heading>
            <Button 
              mt="1rem" 
              onClick={() => setShowReviewForm(!showReviewForm)} 
              size="lg" 
              colorScheme="blue"
            >
              Write a {type}
            </Button>
          </Flex> 
        }
      </Stack>
      <Flex 
        px="4" 
        w="100%" 
        flexDir={["column", "row"]} 
        flexWrap="wrap" 
        alignItems="center"
      >
        { renderType?.length > 0 && renderType.map( (reviewItem, i) => <ReviewItem key={i} reviewItem={reviewItem} handleLikeClick={handleLikeClick} />)}
      </Flex>
    </Flex>
  )
}