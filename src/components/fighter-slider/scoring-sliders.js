import React, {useState} from 'react'
import { Avatar, Button, Center, Divider, Flex, Heading, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'
import { useNavigate } from 'react-router-dom'

export const ScoringSliders = ({ setFighterASlider, setFighterBSlider, scoringModal, toggleScoringModal, fighterASlider, fighterBSlider, groupScorecard }) => {
    const navigate = useNavigate();
    const fighterClick = fighterId => {
        // I have to use the fighterId's, not the fighterA and fighterB names that are on there now, it needs to be ID's... which then begs the question, do I just use their (the fighter's) ID's there, and start the microservices build-out?
        navigate(`/fighters/${fighterId}`);
    } 
    return (
        <> 
                <Flex boxSizing="border-box" flex="1 0 45%" m="1rem" p="1rem" mt="0" pt="3" flexDirection="row">
                    <Center m="1rem">
                        <Avatar size="xl" _hover={{cursor: 'pointer'}} onClick={() => fighterClick('1')} />
                    </Center>
                    <Heading textAlign="center" mb="3" as="h2" size="md">{capFirstLetters(groupScorecard.fighterA)}&#58; {fighterASlider}</Heading>
                    <Slider w="100%" value={fighterASlider} my="4" defaultValue={10} min={6} max={10} id="fighterA" aria-label="slider fighter A" onChange={val => setFighterASlider(val)}>
                        <SliderTrack bg="whiteAlpha.400">
                            <SliderFilledTrack bg="whiteAlpha.800" />
                        </SliderTrack>
                        <SliderThumb bg="whiteAlpha.900" boxSize="6" />
                    </Slider>
                </Flex>
                {/* <Center>
                    <Divider h={{full: "10rem", sm: '0'}} orientation="vertical" />
                </Center> */}
                <Flex boxSizing="border-box" m="1rem" p="1rem" mt="0" pt="3" flex="1 0 45%" flexDirection="column">
                    <Center m="1rem">
                        <Avatar size="xl" _hover={{cursor: 'pointer'}} onClick={() => console.log('fighterId && Link to /fighters')}/>
                    </Center>
                    <Heading textAlign="center" mb="3" as="h2" size="md">{capFirstLetters(groupScorecard.fighterB)}&#58; {fighterBSlider}</Heading>
                    <Slider w="100%" my="4" defaultValue={10} value={fighterBSlider} min={6} max={10} id="fighterB" aria-label="slider fighter B" onChange={val => setFighterBSlider(val)}>
                        <SliderTrack bg="whiteAlpha.400">
                            <SliderFilledTrack bg="whiteAlpha.800" />
                        </SliderTrack>
                        <SliderThumb bg="whiteAlpha.900" boxSize="6" />
                    </Slider>
                </Flex>
            <Button mt="0" mb="3rem" onClick={() => toggleScoringModal(!scoringModal)} type="submit" colorScheme="blue" variant="solid">
                Submit Score
            </Button>
            <Divider />
        </>
    )
}