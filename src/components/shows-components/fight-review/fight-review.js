import * as React from 'react'
import { Rating } from './rating'
import { Button, ButtonGroup, Flex, Heading, IconButton, Stack, Text, useToast } from '@chakra-ui/react'
import { ReviewItem } from './review-item'
import { useScorecardStore } from '../../../stores'
import { HiOutlinePencil } from 'react-icons/hi'

export const FightReviews = ({ 
  setFightReviewForm, 
  fightReviewForm 
}) => {
  const toast = useToast()
  const { 
    selectedFightReviews, 
    user 
  } = useScorecardStore()
  const { sub } = user
  
  const openForm = () => {
    if(!sub){
      return alert('You must be registered to leave a Review.');
    }
    setFightReviewForm(fightReviewForm => !fightReviewForm)
  }
  
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
        { selectedFightReviews.length > 0 && 
          <Flex 
            flexDir="row"
            justifyContent="space-between"
            alignItems="space-between"
            pl={["4", "8"]}
          >
            <Text
              mr="2"
              fontSize="4xl" 
              fontWeight="extrabold" 
              lineHeight="1"
            >
              4.3
            </Text>
            <Stack 
              spacing="1"
            >
              <Rating defaultValue={4} size="sm" />
              <Text lineHeight="1" color={'gray.600'}>
                {`Based on ${Math.floor(Math.random()* 1000)} Reviews`}
              </Text>
            </Stack>
            <ButtonGroup 
              m="auto" 
              flexDir={['column', 'row']} 
              size={["sm", "sm"]} 
            >
              <Button 
                variant="outline"
                // size="md"
              >
                See all Reviews
              </Button>
              <Button 
                // size="md"
                onClick={() => openForm(!fightReviewForm)} 
                colorScheme="solid"
                leftIcon={<HiOutlinePencil />}
              >
                Write a Review
              </Button>
            </ButtonGroup>
          </Flex>
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
                    size="md" 
                    colorScheme="solid"
                  >
                    Write a Review
                  </Button>
                </ButtonGroup>
              </>
            }
          </Flex> 

      <Flex 
        mt="6"
        px="4" 
        w="100%" 
        flexDir={["column", "row"]} 
        flexWrap="wrap" 
        alignItems="center"
      >
        { selectedFightReviews?.length > 0 && selectedFightReviews.map( (reviewItem, i) => <ReviewItem key={i} reviewItem={reviewItem} />)}
      </Flex>
    </Flex>
  )
}