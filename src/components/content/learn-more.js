import * as React from 'react'
import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router'
  import { BiRightArrowAlt } from 'react-icons/bi'
  import { Testimonial } from '../../chakra'
  import { GoToArrowButton } from '../utils/buttons'
  import JWPlayer from '@jwplayer/jwplayer-react';

  const Feature = props => {
    const { title, children } = props
    return (
      <Stack>
        <Text fontWeight="bold">{title}</Text>
        <Text>{children}</Text>
      </Stack>
    )
  }
  const styles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  }
  export const LearnMore = () => {
    const navigate = useNavigate();
    return (
      <Box as="section" py="8" bg={mode('gray.100', 'inherit')}>
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <Grid templateColumns={{ base: '1fr', md: '360px 1fr' }} gap="64px">
            <Box>
              <Heading size="2xl" letterSpacing="normal" fontWeight="bold">
                Score Fights In Real Time
              </Heading>
              <Text mt="2" mb="4" fontSize="lg" fontWeight="medium" lineHeight="1.4rem">
                Score fights in real-time, all scorecards saved in the cloud.
              </Text>
              <GoToArrowButton
                label="Get Started Now"
                navigateTo={'/signin'}
              />
              <Testimonial
                // logo={<LearnMoreLogo />}
                author="Rocky Marciano"
                company="HOF Champion"
                image="https://bit.ly/dan-abramov"
              >
                &ldquo;Watch my scorecard as I score the fight on the FightSync app. Search all my past scorecards and see my predictions.&rdquo;
              </Testimonial>
            </Box>
            <Box position="relative" w="100%" h="100%" m="autp">
              <Flex minH={{ base: '320px', lg: '480px' }}>
                <JWPlayer
                  playlist="https://cdn.jwplayer.com/v2/playlists/kTtEBPkU"
                  library='https://cdn.jwplayer.com/libraries/WBqqdo2h.js'
                />  
              </Flex>
              <SimpleGrid
                rounded="lg"
                mt="10"
                p={{ base: '10', lg: '0' }}
                columns={{ base: 1, lg: 3 }}
                spacing="6"
                bg={{ base: mode('gray.200', 'gray.700'), lg: 'unset' }}
              >
                <Feature title="Score Fights, Win Prizes">
                  Score fights in real-time- on the FightSync app and win prizes for correct predictions and high scores.
                </Feature>
                <Feature title="Score Fights with Friends">
                  Form a group and score fights with friends. Watch their scores in real-time. Predict the fight and get rewarded.
                </Feature>
                <Feature title="All Scorecards Automatically Saved">
                  All Scorecards are saved in the FightSync cloud. Search other users and compare scores. 
                </Feature>
              </SimpleGrid>
            </Box>
          </Grid>
        </Box>
      </Box>
    )
  }