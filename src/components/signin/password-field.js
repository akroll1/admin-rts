import { Box, Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, useDisclosure, useMergeRefs, useColorModeValue as mode } from '@chakra-ui/react'
  import * as React from 'react'
  import { HiEye, HiEyeOff } from 'react-icons/hi'
  
  export const PasswordField = React.forwardRef((props, ref) => {
    const { handleFormChange, password, handleForgotPassword } = props;
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef(null)
    const mergeRef = useMergeRefs(inputRef, ref)
  
    const onClickReveal = () => {
      onToggle()
      const input = inputRef.current
  
      if (input) {
        input.focus({
          preventScroll: true,
        })
        const length = input.value.length * 2
        requestAnimationFrame(() => {
          input.setSelectionRange(length, length)
        })
      }
    }
    const delegateClick = e => {
      if(e.key === 'Enter'){
        document.getElementById('signin_button').click()
      }
    }
    return (
      <FormControl id="password">
        <Flex justify="space-between">
          <FormLabel>Password</FormLabel>
          <Box 
            onClick={handleForgotPassword}
            as="a" 
            color={mode('blue.600', 'blue.200')} 
            fontWeight="semibold" 
            fontSize="sm"
            _hover={{ cursor: 'pointer' }}
          >
            Forgot Password?
          </Box>
        </Flex>
        <InputGroup>
          <InputRightElement>
            <IconButton
              bg="transparent !important"
              variant="ghost"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            value={password}
            onChange={handleFormChange}
            ref={mergeRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            onKeyPress={delegateClick}
            {...props}
          />
        </InputGroup>
      </FormControl>
    )
  })
  PasswordField.displayName = 'PasswordField'