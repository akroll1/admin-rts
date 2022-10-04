import * as React from 'react'
import { Rating } from './rating'
import { Button, ButtonGroup, Flex, Heading, HStack, Stack, Text, useToast } from '@chakra-ui/react'
import { ReviewItem } from './review-item'
import { useReviewStore, useScorecardStore } from '../../../stores'

export const FightReviews = ({ 
  setFightReviewForm, 
  fightReviewForm 
}) => {
  const toast = useToast();
  const { user: { sub }} = useScorecardStore();
  const { selectedFightReviews } = useReviewStore();

  const openForm = () => {
    if(!sub){
      return alert('You must be registered to leave a Review.');
    }
    setFightReviewForm(fightReviewForm => !fightReviewForm)
  }
  console.log('selectedFightReviews: ', selectedFightReviews)
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
      <Stack spacing="6" m="auto">
        { selectedFightReviews.length > 0 && 
          <Stack spacing={{base: '6'}}>
            <Heading textAlign="center" fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
              Fan Reviews
            </Heading>
            <Stack 
              spacing="5" 
              direction="row" 
              alignItems="center" 
              justifyContent="center"
              shouldWrapChildren
              margin="auto"
            >
              <Text fontSize="4xl" fontWeight="medium" lineHeight="1">
                4.3
              </Text>
              <Stack spacing="1">
                <Rating defaultValue={4} size="sm" />
                <Text lineHeight="1" color={'gray.600'}>
                  {`Based on ${Math.floor(Math.random()* 1000)} Reviews`}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        }
          <Flex m="auto" flexDirection="column" alignItems="center" justifyContent="center">
            { selectedFightReviews.length === 0 && 
              <>
                <Heading fontSize={{base: '1.25rem', md: '1.5rem'}} fontWeight="semibold" color={'white'}>
                  Be the first to write a Review!
                </Heading>
                <ButtonGroup 
                  m="auto" 
                  flexDir={['column', 'row']} 
                  size={["sm", "md", "lg"]} 
                  mt="4"
                >
                  <Button 
                    onClick={() => openForm(!fightReviewForm)} 
                    size="lg" 
                    colorScheme="blue"
                  >
                    Write a Review
                  </Button>
                </ButtonGroup>
              </>
            }
            { selectedFightReviews.length > 0 && 
              <ButtonGroup 
                m="auto" 
                flexDir={['column', 'row']} 
                size={["sm", "md", "lg"]} 
              >
                <Button variant="outline">
                  See all Reviews
                </Button>
                <Button 
                  onClick={() => openForm(!fightReviewForm)} 
                  size="lg" 
                  colorScheme="blue"
                >
                  Write a Review
                </Button>
              </ButtonGroup>
            }
          </Flex> 
        </Stack>
      <Flex 
        px="4" 
        w="100%" 
        flexDir={["column", "row"]} 
        flexWrap="wrap" 
        alignItems="center"
      >
        { selectedFightReviews.length > 0 && selectedFightReviews.map( (reviewItem, i) => <ReviewItem key={i} reviewItem={reviewItem} />)}
      </Flex>
    </Flex>
  )
}