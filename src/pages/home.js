import React from 'react'
import { Box, Button, Center, Divider, Heading, Img, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { FaArrowRight, FaFileSignature, FaHandsHelping, FaHeadset } from 'react-icons/fa'
import { Feature } from '../chakra'
// import { ColorModeSwitcher } from '../components/color-mode-switcher/color-mode-switcher'
const Home = () => {
  const navigate = useNavigate();
  return (

    <Box 
      as="section" 
      bg="brand.base" 
      py="3"
    >
      <Box 
        maxW={{ base: 'xl', md: '7xl' }} 
        mx="auto" 
        px={{ base: '6', md: '8' }}
      >
        <Stack 
          p="4" 
          m="auto" 
          spacing={{ base: '4', lg: '4' }} 
          direction={{ base: 'column', lg: 'row' }}
        >
          <Box maxW={{ lg: 'lg' }}>
            <Heading
              size="xl"
              mt="4"
              fontWeight="extrabold"
              letterSpacing="normal"
              lineHeight="normal"
            >
              Can't get enough boxing?
            </Heading>
            <Heading>
              Here you go.
            </Heading>


            
            <Text fontSize="lg" mt="4" color={mode('gray.600', 'fsl-body-text')}>
              Score fights in real-time and compete against other boxing fans by making correct pre-fight and in-fight predictions. Play with a group and compare scores- live!
            </Text>
            <Button
              onClick={() => navigate('/learn-more')}
              className="group"
              mt={["4", "8"]}
              size={["lg", "xl"]}
              px="8"
              fontWeight="bold"
              h="14"
              // bg="brand.100"
              iconSpacing="3"
              colorScheme="solid"
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
          <Center 
            flex="1" 
            shadow="lg" 
            maxW={{ lg: 'xl' }}
          >
            <Img
              borderRadius="5"
              objectFit="cover"
              w="full"
              h="full"
              htmlWidth="576px"
              htmlHeight="420px"
              src="home_page_2.jpg"
              alt="Person on phone scoring a fight"
            />
          </Center>
        </Stack>
        <Divider my={["8", "20"]} 
          opacity={1} 
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '12', md: '8' }}>
          <Feature title="Win Prizes" icon={<FaHandsHelping />}>
            Win prizes for making correct pre-fight and in-fight predictions.
          </Feature>
          <Feature title="Score with Friends" icon={<FaHeadset />}>
            Create a group and score fights together- in real time!
          </Feature>
          <Feature title="Contribute" icon={<FaFileSignature />}>
            Score fights and contribute to crowd-sourced boxing analytics. 
          </Feature>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
export default Home