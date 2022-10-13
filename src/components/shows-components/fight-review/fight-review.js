import * as React from 'react'
import { Rating } from './rating'
import { Button, ButtonGroup, Flex, Heading, HStack, IconButton, Stack, Text, useToast } from '@chakra-ui/react'
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
      maxW="100%"
      flexDir='column'
      as="section"
      p="2" 
    >
        { selectedFightReviews.length > 0 && 
          <Flex 
            flexDir={["column", "row"]}
            justifyContent="space-between"
            alignItems="space-between"
            px={["4", "8"]}
          >
            <Flex 
              justifyContent="start"
              alignItems="center"
              w="100%"
            >
              <Text
                my="2"
                fontSize="4xl" 
                fontWeight="extrabold" 
                lineHeight="1"
                mr="2"
              >
                4.3
              </Text>
              <Text>
                <Rating defaultValue={4} size="sm" />
                <Text lineHeight="1" color={'gray.600'}>
                  {`Based on ${Math.floor(Math.random()* 1000)} Reviews`}
                </Text>
              </Text>
            </Flex>
            <ButtonGroup 
              m="auto" 
              flexDir={['column', 'row']} 
              justifyContent="end"
              size={["sm", "sm"]} 
              w="100%"
            >
              <Button 
                variant="outline"
                onClick={() => console.log("go to reviews page")}
                m={["2", "0"]}
                w="100%"
                p="0"
              >
                See all Reviews
              </Button>
              <Button 
                w="100%"
                m={["2", "0"]}
                ml={["0", "2"]}
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
        maxW="100%" 
        flexDir={["column"]} 
        justifyContent="center"
        alignItems="flex-start"
      >
        { selectedFightReviews?.length > 0 && selectedFightReviews.map( (reviewItem, i) => <ReviewItem key={i} reviewItem={reviewItem} />)}
      </Flex>
    </Flex>
  )
}