import {useState, useEffect} from 'react'
import { 
  Button, 
  ButtonGroup, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input, 
  Stack, 
  Textarea, 
  useColorModeValue 
} from '@chakra-ui/react'
import { ReviewFormStars } from '../utils'
import { useGlobalStore } from '../../stores';

export const FightReviewForm = ({ 
  closeModal
}) => {

  const { 
    submitUserFightReview
  } = useGlobalStore()
  
  const [value, setValue] = useState(null);
  const [form, setForm] = useState({})

  useEffect(() => {
    setValue(form.rating)
  },[])
  
  const handleStarsClick = rating => {
    setForm({ ...form, rating})
  };

  const handleReviewFormSubmit = () => {
    submitUserFightReview(form)
  }

  return (
    <form>
      <Stack spacing="6">
        <FormControl id="title">
          <FormLabel htmlFor="title" color={useColorModeValue('gray.700', 'gray.200')}>Title</FormLabel>
          <Input
            maxLength={50}
            onChange={e => setForm({ ...form, title: e.currentTarget.value})}
            value={form.title}
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
            onChange={e => setForm({ ...form, review: e.currentTarget.value})}
            value={form.review}
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
              colorScheme="solid" 
            >
              Submit review
            </Button>
            <Button 
              ml="2" 
              onClick={closeModal} 
              type="button" 
              variant="outline" 
              colorScheme="solid" 
            >
              Close
            </Button>
          </ButtonGroup>
        </Flex>
      </Stack>
    </form>
  )
}