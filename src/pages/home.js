import React from 'react'
import { Box, Button, Center, Divider, Heading, Img, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { FaArrowRight, FaFileSignature, FaHandsHelping, FaHeadset } from 'react-icons/fa'
import { Feature } from '../chakra'
// import { ColorModeSwitcher } from '../components/color-mode-switcher/color-mode-switcher'
const Home = () => {
  const navigate = useNavigate();
  return (

    <Box as="section" bg="brand.base" py="3">
      <Center>
        {/* <ColorModeSwitcher /> */}
        <Heading p="4" as="h1" mt="0" size="3xl" pt="0" mb="4" letterSpacing="normal">Score Fights in Real Time</Heading>
      </Center>
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Stack spacing={{ base: '4', lg: '20' }} direction={{ base: 'column', lg: 'row' }}>
          <Center flex="1" shadow="lg" maxW={{ lg: 'xl' }}>
            <Img
              borderRadius="5"
              objectFit="cover"
              w="full"
              h="full"
              htmlWidth="576px"
              htmlHeight="420px"
              src="https://images.unsplash.com/photo-1609921205586-7e8a57516512?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGRlc2lnbmVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              alt="Bring team together"
            />
          </Center>
          <Box maxW={{ lg: 'lg' }}>
            <Heading
              size="xl"
              mt="3"
              fontWeight="extrabold"
              letterSpacing="normal"
              lineHeight="normal"
            >
              Can't get enough boxing? Here you go.
            </Heading>
            <Text fontSize="lg" mt="4" color={mode('gray.600', 'gray.400')}>
              Score fights in real-time and compare your scores to other boxing fans. Play with a group and compare scores- live!
            </Text>
            <Button
              onClick={() => navigate('/learn-more')}
              className="group"
              mt="8"
              colorScheme="blue"
              size="lg"
              px="8"
              fontWeight="bold"
              h="14"
              iconSpacing="3"
              rightIcon={
                <Box
                  as={FaArrowRight}
                  fontSize="sm"
                  transition="transform 0.2s"
                  _groupHover={{ transform: 'translateX(2px)' }}
                />
              }
            >
              Learn more
            </Button>
          </Box>
        </Stack>
        <Divider my="20" opacity={1} />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '12', md: '8' }}>
          <Feature title="Score the Fight" icon={<FaFileSignature />}>
              Score fights and keep scores for your personal records. 
          </Feature>
          <Feature title="Score with Friends" icon={<FaHeadset />}>
            Create a group and score fights together- in real time.
          </Feature>
          <Feature title="Search Other Scorecards" icon={<FaHandsHelping />}>
            Compare your scores to other boxing fans.
          </Feature>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
export default Home