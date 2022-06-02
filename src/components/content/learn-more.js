import {
    Box,
    Button,
    Center,
    Grid,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { useNavigate } from 'react-router'
  import { BiRightArrowAlt } from 'react-icons/bi'
  import { FaPlayCircle } from 'react-icons/fa'
  import { LearnMoreLogo, Testimonial } from '../../chakra'
  
  const Feature = props => {
    const { title, children } = props
    return (
      <Stack>
        <Text fontWeight="bold">{title}</Text>
        <Text>{children}</Text>
      </Stack>
    )
  }
  
  export const LearnMore = () => {
    const navigate = useNavigate();
    return (
      <Box as="section" py="24" bg={mode('gray.100', 'gray.800')}>
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <Grid templateColumns={{ base: '1fr', md: '360px 1fr' }} gap="64px">
            <Box>
              <Heading size="3xl" letterSpacing="tight" fontWeight="extrabold">
                Score Fights In Real Time
              </Heading>
              <Text mt="6" mb="8" fontSize="lg" fontWeight="medium">
                Score fights in real-time, all scorecards saved in the cloud.
              </Text>
              <Button onClick={() => navigate('/dashboard/create-scorecard')} size="lg" colorScheme="blue" minH="14" rightIcon={<BiRightArrowAlt />}>
                Get Started now
              </Button>
              <Testimonial
                logo={<LearnMoreLogo />}
                author="Shannon Briggs"
                company="#LETSGOCHAMP"
                image="https://images.unsplash.com/photo-1531078215167-91fcfe45b39e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2598&q=80"
              >
                &ldquo; I score all my fights on FightCloud's real-time scoring app. Search all my past scorecards on here as well. &rdquo;
              </Testimonial>
            </Box>
            <Box>
              <Center
                bg={mode('white', 'gray.700')}
                shadow="lg"
                minH={{ base: '320px', lg: '480px' }}
                rounded="lg"
              >
                {/* Replace this with your screenshot */}
                <Box cursor="pointer" as={FaPlayCircle} fontSize="90px" color="gray.300" />
              </Center>
              <SimpleGrid
                rounded="lg"
                mt="10"
                p={{ base: '10', lg: '0' }}
                columns={{ base: 1, lg: 3 }}
                spacing="6"
                bg={{ base: mode('gray.200', 'gray.700'), lg: 'unset' }}
              >
                <Feature title="Score Fights, Win Prizes">
                  Score fights in real-time- on your computer or phone! Win prizes for KO predictions and high scores.
                </Feature>
                <Feature title="Score Fights with Friends">
                  Form a group and score fights with friends. Watch their scores in real-time. Predict the fight and get rewarded!
                </Feature>
                <Feature title="All Scorecards Automatically Saved">
                  All Scorecards are saved in the FightSync cloud. Make them public and compare how you scored the fight compared to other fans. 
                </Feature>
              </SimpleGrid>
            </Box>
          </Grid>
        </Box>
      </Box>
    )
  }