import * as React from 'react'
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    HStack,
    ScaleFade,
    StackDivider,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  
  export const Notification = ({ id, notification, displayName, handleCloseNotification }) => {
    return (
      <ScaleFade initialScale={0.9} in={notification}>
        <Box as="section" p="1" m="1" my="0">
          <Flex direction="row-reverse">
            <Box
              width={{base: 'full', sm: 'md', lg: 'sm'}}
              boxShadow={useColorModeValue('md', 'md-dark')}
              // bg="rgba(25,25,35,0.9)"
              bg="rgba(20,25,35,0.8)"
              borderRadius="lg"
            >
              <HStack divider={<StackDivider />} spacing="0">
                <HStack spacing="4" p="4" flex="1">
                    {useBreakpointValue({base: false, sm: true}) && (
                        <Avatar src="https://tinyurl.com/yhkm2ek8" name="Christoph Winston" boxSize="10" /> )
                    }
                  <Box>
                    <Text fontWeight="medium" fontSize="sm">
                      {displayName}
                    </Text>
                    <Text color="muted" fontSize="sm">
                      {notification}
                    </Text>
                  </Box>
                </HStack>
      
                <Center p="4">
                  <Button id={id} onClick={e => handleCloseNotification(e)} colorScheme="blue" variant="link" size="sm">
                    Close
                  </Button>
                </Center>
              </HStack>
            </Box>
          </Flex>
        </Box>
      </ScaleFade>
    )
}
