import React, {useState, useEffect} from 'react'
import { Button, Flex, FormControl, FormLabel, Input, Stack, Textarea, useColorModeValue } from '@chakra-ui/react'
import { ReviewFormStars } from '../../stars';

export const ReviewFormForm = ({ userReview, handleReviewFormSubmit, setShowTheReviewForm }) => {
  const [form, setForm] = useState({
    rating: 0,
    review: '',
    title: ''
  });
  const handleForm = e => {
      const { id, value } = e.currentTarget;
      setForm({ ...form, [id]: value });
  };
  const submitReview = () => {
      setTimeout(() => {
        setShowTheReviewForm(false);
      },1000)
      handleReviewFormSubmit(form);
  }

  const handleStarsClick = rating => {
    setForm({...form, rating})
  }
  useEffect(() => {
    if(userReview){
      setForm({...userReview});
    }
  },[userReview]);

  const { rating, review, title } = form;
  return (
    <form>
      <Stack spacing="6">
        <FormControl id="title">
          <FormLabel htmlFor="title" color={useColorModeValue('gray.700', 'gray.200')}>Title</FormLabel>
          <Input
            onChange={handleForm}
            value={title}
            name="title"
            placeholder="Review title"
            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
          />
        </FormControl>
        <FormControl id="rating">
          <FormLabel htmlFor="rating" color={useColorModeValue('gray.700', 'gray.200')}>Your Rating {rating ? '- ' + rating : ''}</FormLabel>
          <ReviewFormStars rating={rating} handleStarsClick={handleStarsClick} />
        </FormControl>

        <FormControl id="review">
          <FormLabel htmlFor="review" color={useColorModeValue('gray.700', 'gray.200')}>Review</FormLabel>
          <Textarea
            onChange={handleForm}
            value={review}
            name="review"
            placeholder="Your Review..."
            rows={4}
            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            resize="none"
          />
        </FormControl>
        <Flex flexDirection="inline-flex"> 
          <Button onClick={submitReview} type="button" colorScheme="blue" alignSelf="start" size="lg">
            Submit review
          </Button>
          <Button ml="1rem" onClick={() => setShowTheReviewForm(false)} type="button" variant="outline" colorScheme="blue" alignSelf="start" size="lg">
            Close
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}