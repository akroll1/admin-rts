import React, {useEffect, useState} from 'react'
import { Avatar, Button, Center, Divider, Flex, Heading, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'
import { useNavigate } from 'react-router-dom'

export const FighterSlider = ({ fighter, sliderScores, setSliderScores }) => {
    const [score, setScore] = useState(10);
    const navigate = useNavigate();
    const fighterClick = fighterId => {
        // I have to use the fighterId's, not the  and fighterB names that are on there now, it needs to be ID's... which then begs the question, do I just use their (the fighter's) ID's there, and start the microservices build-out?
        navigate(`/fighters/${fighterId}`);
    } 
    useEffect(() => {
        setScore(sliderScores[fighter])
    },[sliderScores])
    // console.log('fighter: ', fighter)
    return (
        <Flex m="1" p="1" boxSizing="border-box" flex="1 0 40%" flexDirection="column">
            <Center m="1rem">
                <Avatar size="md" _hover={{cursor: 'pointer'}} onClick={() => fighterClick('1')} />
            </Center>
            <Heading textAlign="center" mb="3" as="h2" size="md">{capFirstLetters(fighter.split(' ')[1])} {score ? score : 10}</Heading>
            <Slider 
                m="auto"
                w={["90%", "75%"]}
                p="4"
                value={sliderScores[fighter]} 
                my="4" 
                defaultValue={10} 
                min={6} 
                max={10} 
                id={fighter} 
                aria-label="fighter scoring slider" 
                onChange={value => setSliderScores({...sliderScores, [fighter]: value})}
            >
                <SliderTrack maxW="90%" bg="whiteAlpha.400">
                    <SliderFilledTrack bg="whiteAlpha.800" />
                </SliderTrack>
                <SliderThumb bg="whiteAlpha.900" boxSize="6" />
            </Slider>
        </Flex>
    )
}