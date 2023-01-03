import { Rating } from './rating'
import { 
  Button, 
  ButtonGroup, 
  Flex, 
  Heading, 
  Text, 
} from '@chakra-ui/react'
import { ReviewItem } from './review-item'
import { ModalsEnum, useGlobalStore } from '../../../stores'
import { HiOutlinePencil } from 'react-icons/hi'

export const FightReviews = () => {

  const { 
    checkForUserFightReview,
    fightReviews,
    setModals,
    user 
  } = useGlobalStore()
  
  const openFightReviewModal = () => {
    if(!user?.sub) return
    checkForUserFightReview()
    setModals(ModalsEnum.FIGHT_REVIEW_FORM_MODAL, true)
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
    { fightReviews.length > 0 && 
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
          <Text as="h4">
            <Rating defaultValue={4} size="sm" />
            <Text my="1" lineHeight="1" color={'gray.600'}>
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
            disabled={true}
          >
            See all Reviews
          </Button>
          <Button 
            w="100%"
            m={["2", "0"]}
            ml={["0", "2"]}
            onClick={openFightReviewModal} 
            colorScheme="solid"
            leftIcon={<HiOutlinePencil />}
          >
            Write a Review
          </Button>
        </ButtonGroup>
      </Flex>
    }
      <Flex 
        m="auto" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
      >
        { fightReviews?.length === 0 && 
          <>  
            <Text 
              size="md"
              fontWeight="normal" 
              color="#cacaca"
            >
              Be the first to
            </Text>
            <Heading 
              fontSize={['1.25rem', '1.5rem']} 
              fontWeight="semibold" 
              color="#fafafa"
            >
              Write a Review!
            </Heading>
            <ButtonGroup 
              m="auto" 
              flexDir={['column', 'row']} 
              size={["sm", "md", "lg"]} 
              mt="4"
            >
              <Button 
                // isLoading={isSubmittingForm}
                disabled={!user?.sub}
                // loadingText="Submitting"
                onClick={openFightReviewModal} 
                size="md" 
                colorScheme="solid"
              >
                {user?.sub ? `Write a Review` : `Please Sign In`}
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
        { fightReviews?.length > 0 && fightReviews.map( (reviewItem, i) => <ReviewItem key={i} reviewItem={reviewItem} />)}
      </Flex>
    </Flex>
  )
}