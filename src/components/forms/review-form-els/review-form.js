import React, {useState, useEffect} from 'react'
import { Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Stack, Textarea, useColorModeValue } from '@chakra-ui/react'
import { ReviewFormStars } from '../../stars';

export const ReviewForm = ({ reviewForm, setReviewForm, handleReviewFormSubmit, handleReviewFormClose }) => {
  const submitReview = () => {
      handleReviewFormSubmit(reviewForm);
  };

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
          <ReviewFormStars rating={reviewForm.rating} handleStarsClick={handleStarsClick} />
        </FormControl>

        <FormControl id="review">
          <FormLabel
            htmlFor="review" 
            fontSize={rating ? '1.2rem' : '1rem'}
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            {rating ? `Why ${rating} stars?` : `Review`}
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
              onClick={submitReview} 
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