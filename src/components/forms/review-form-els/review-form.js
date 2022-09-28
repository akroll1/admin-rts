import React, {useState, useEffect} from 'react'
import { Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Stack, Textarea, useColorModeValue } from '@chakra-ui/react'
import { ReviewFormStars } from '../../stars';
import { REVIEW_TYPE } from '../../../utils';

export const ReviewForm = ({ 
  reviewForm, 
  setReviewForm, 
  handleReviewFormSubmit,
  handleReviewFormClose 
}) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(reviewForm.rating)
  },[])
  
  const handleStarsClick = rating => {
    setReviewForm({ ...reviewForm, rating})
  };

  const { rating } = reviewForm;
  return (
    <form>
      <Stack spacing="6">
        <FormControl id="title">
          <FormLabel htmlFor="title" color={useColorModeValue('gray.700', 'gray.200')}>Title</FormLabel>
          <Input
            maxLength={50}
            onChange={e => setReviewForm({ ...reviewForm, title: e.currentTarget.value})}
            value={reviewForm.title}
            name="title"
            placeholder="Review title"
            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
          />
        </FormControl>
        <FormControl id="rating">
          <FormLabel htmlFor="rating" color={useColorModeValue('gray.700', 'gray.200')}>Rate It!</FormLabel>
          <ReviewFormStars rating={value} handleStarsClick={handleStarsClick} />
        </FormControl>

        <FormControl id="review">
          <FormLabel
            htmlFor="review" 
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            Why?
          </FormLabel>
          <Textarea
            onChange={e => setReviewForm({ ...reviewForm, review: e.currentTarget.value})}
            value={reviewForm.review}
            name="review"
            placeholder="Review..."
            rows={4}
            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            resize="none"
          />
        </FormControl>
        <Flex flexDirection="inline-flex"> 
          <ButtonGroup>
            <Button 
              onClick={handleReviewFormSubmit} 
              type="button" 
              colorScheme="blue" 
            >
              Submit review
            </Button>
            <Button 
              ml="2" 
              onClick={handleReviewFormClose} 
              type="button" 
              variant="outline" 
              colorScheme="blue" 
            >
              Close
            </Button>
          </ButtonGroup>
        </Flex>
      </Stack>
    </form>
  )
}