import { Box, Button, Center, Divider, Flex, Heading, Img, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { Feature } from '../chakra'
import { GoToArrowButton } from '../components/buttons'
import { FaHandsHelping } from 'react-icons/fa'
import { GiTrophy } from 'react-icons/gi'
import { EditIcon } from '@chakra-ui/icons'

const Home = () => {

  return (

    <Box 
      id="home"
      as="section" 
      bg="brand.base" 
      px={["6", "12", "12",]}
      py={["2", "4"]}
      mx="auto"
    >
      <Box 
        maxW={["100%", "100%", "90%", "90%"]} 
        mx="auto"
      >
        <Stack 
          // p={["4"]} 
          spacing={['2', '4', '4']} 
          direction={['column', 'column', 'row']}
        >
          <Box maxW={{ lg: 'xl' }}>
            <Heading
              size="xl"
              mt={["2", "2", "4"]}
              fontWeight="extrabold"
              letterSpacing="normal"
              lineHeight="2rem"
              color="#eaeaea"
            >
              Can't get enough boxing?
            </Heading>
            <Heading
              mt="3px"
              size="lg"
              color="#bababa"
            >
              Here you go.
            </Heading>
            <Flex
              display="inline"
            >

            <Text 
              lineHeight="1.3"
              fontSize="xl" 
              mt="1"
              p="1" 
              pl="0"
              color='fsl-body-text'
              maxW={["85%", "60%", "80%"]}
            >
              Make predictions, score fights and play with a group - 
                <Text
                  as="span"
                  lineHeight="1.3"
                  fontSize="xl" 
                  mt="1" 
                  pr="4"
                  color='fsl-body-text'
                  maxW={["85%", "60%", "80%"]} 
                  fontWeight="bold"
                >
                &nbsp;in real-time!
              </Text>
            </Text>
            </Flex>
            <GoToArrowButton
              label="Learn More"
              navigateTo={'/learn-more'}
            />
          </Box>
          <Center 
            flex="1 0 60%" 
            shadow="lg" 
            maxW={['xl']}
            >
            <Img
              borderRadius="5"
              mt="2"
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
        <Divider 
          w={["100%"]}
          m="auto"
          opacity={1} 
          my={["8", "12", "16", "12"]}
        />
        <SimpleGrid columns={[ "1","2","3" ]} spacing={['8','2']} maxW={["100%"]}>
          <Feature title="Score Fights" icon={<EditIcon fontSize="1.5rem" />}>
            Create a group and score fights together- live and in real time!
          </Feature>
          <Feature title="Win Prizes" icon={<GiTrophy fontSize="1.5rem" />}>
            Win prizes for making correct pre-fight and in-fight predictions.
          </Feature>
          <Feature title="Contribute" icon={<FaHandsHelping fontSize="2rem" />}>
            Score fights to contribute to real-time, crowd-sourced boxing analytics. 
          </Feature>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
export default Home