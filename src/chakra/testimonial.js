import { Box, HStack, Img, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

export const Testimonial = (props) => {
  const { logo, author, company, image, children, ...rest } = props
  return (
    <Box
      rounded="lg"
      mt={['8','12']}
      as="blockquote"
      bg={[mode('white', 'gray.700')]}
      p={['8']}
      {...rest}
    >
      {logo}
      <Text 
        fontSize="lg" 
        lineHeight="tall"
      >
        {children}
      </Text>
      <HStack spacing="4" mt="8">
        <Img 
          alt={author} 
          w="12" 
          h="12" 
          rounded="full" 
          objectFit="cover" 
          src={image} 
        />
        <Box>
          <Text 
            as="cite" 
            fontStyle="normal" 
            fontWeight="bold"
          >
            {author}
          </Text>
          <Text color={mode('gray.600', 'gray.400')}>{company}</Text>
        </Box>
      </HStack>
    </Box>
  )
}