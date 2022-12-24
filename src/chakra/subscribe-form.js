import { useEffect,  useState } from 'react'
import { 
  Button, 
  chakra, 
  FormControl,
  FormErrorMessage,
  Input, 
  InputGroup,
  InputRightElement,
  Stack, 
  Text, 
  useColorModeValue, 
  useToast 
} from '@chakra-ui/react'
import { FooterHeading } from './footer-heading'
import { isValidEmail as validateEmail } from '../utils'
import { CloseIcon } from '@chakra-ui/icons'
import { useScorecardStore } from '../stores'

export const SubscribeForm = (props) => {
  const toast = useToast()

  const {
    subscribeToNewsletter
  } = useScorecardStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriberEmail, setSubscriberEmail] = useState('')
  const [isError, setIsError] = useState(null)
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    if(!subscriberEmail){
      setIsError(false)
    }
  },[subscriberEmail])

  const subscribe = () => {
    setIsSubmitting(true)
    const validated = validateEmail(subscriberEmail);
    if(validated){
      // check if already subscribed... somewhere.
      console.log('Submit email!');
      setDisableButton(true)
      subscribeToNewsletter(subscriberEmail)
      setSubscriberEmail('')
      toast({ 
        title: `Thanks for subscribing! ${'\n'} We just sent a verification link to your email.`,
        duration: 5000,
        status: 'success',
        isClosable: true
      })
    }
    if(!validated){
      setIsError(true)
    }
    setIsSubmitting(false)
  }

  const handleEmailChange = e => {
    const { value } = e.currentTarget;
    setSubscriberEmail(value)
  }

  return (
    <Stack spacing="2">
      <FooterHeading>Subscribe to our newsletter</FooterHeading>
      <Text>Get the <span style={{fontWeight: 'bold',color: '#FFF'}}>FightSync newsletter</span> delivered directly to your inbox!</Text>
      <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
        <FormControl isInvalid={isError}>
          <InputGroup>
            <Input 
              errorBorderColor="red.700"
              onChange={handleEmailChange}
              value={ subscriberEmail }
              id="subscriberEmail"
              placeholder="email@example.com"
              type="email" 
              maxLength={255} 
            />
            { subscriberEmail && 
              <InputRightElement children={<CloseIcon
                  _hover={{cursor: 'pointer', color: 'white'}} 
                  color="#dadada" 
                  alignItems="center"
                  justifyContent="center" 
                  fontSize="0.8rem"
                  onClick={() => setSubscriberEmail('')}
                />}
              />
            }
          </InputGroup>
          <FormErrorMessage>{isError ? `Not a valid email.` : ``}</FormErrorMessage>
        </FormControl>
        <Button
          disabled={disableButton}
          onClick={subscribe}
          colorScheme="solid"
          color="white"
          size="md"
          flexShrink={0}
          width={{ base: 'full', md: 'auto' }}
          isLoading={isSubmitting}
          loadingText="Submitting"
        >
          {disableButton ? `Suscribed!` : `Subscribe`}
        </Button>
      </Stack>
    </Stack>
  )
}