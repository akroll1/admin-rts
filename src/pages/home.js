import { Box, Button, Center, Divider, Flex, Heading, Img, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { Feature } from '../chakra'
import { GoToArrowButton } from '../components/buttons'
import { FaHandsHelping } from 'react-icons/fa'
import { GiTrophy } from 'react-icons/gi'
import { EditIcon } from '@chakra-ui/icons'

const Home = () => {
  const navigate = useNavigate();
  return (

    <Box 
      id="home"
      as="section" 
      bg="brand.base" 
      p="2"
    >
      <Box 
        maxW={['xl','5xl']} 
        mx="auto" 
      >
        <Stack 
          p={["2", "4"]} 
          m="auto" 
          spacing={['2', '4', '4']} 
          direction={['column', 'column', 'row']}
        >
          <Box maxW={{ lg: 'lg' }}>
            <Heading
              size="xl"
              mt={["2", "2", "4"]}
              fontWeight="extrabold"
              letterSpacing="normal"
              lineHeight="2rem"
            >
              Can't get enough boxing?
            </Heading>
            <Heading>
              Here you go.
            </Heading>
            <Flex
              display="inline"
            >

            <Text 
              lineHeight="1.5"
              fontSize="xl" 
              mt="1" 
              pr="4"
              color='fsl-body-text'
              maxW={["85%", "60%", "80%"]}
            >
              Make predictions, score fights and compete against other boxing fans. Play with a group - 
                <Text
                  as="span"
                  lineHeight="1.5"
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
        <Divider my={["8"]} 
          opacity={1} 
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