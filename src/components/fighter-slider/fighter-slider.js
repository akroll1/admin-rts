import React, {useEffect, useState} from 'react'
import { Avatar, Button, Center, Divider, Flex, Heading, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const FighterSlider = ({ fighter, sliderScores, setSliderScores }) => {
    const [score, setScore] = useState(10);
    const { fighterId, firstName, lastName, ringname } = fighter; 
    useEffect(() => {
        if(sliderScores){
            setScore(sliderScores[fighterId])
        }
    },[sliderScores])

    return (
        <Flex m="1" p="1" boxSizing="border-box" flex="1 0 40%" flexDirection="column">
            <Center m="1rem">
                <Avatar size="md" _hover={{cursor: 'pointer'}} />
            </Center>
            <Heading textAlign="center" mb="3" as="h2" size="md">{capFirstLetters(firstName)} {capFirstLetters(lastName)}&#58;&nbsp;{score ? score : 10}</Heading>
            <Slider 
                m="auto"
                w={["90%", "75%"]}
                p="4"
                value={score} 
                my="4" 
                defaultValue={10} 
                min={6} 
                max={10} 
                id={fighterId} 
                aria-label="fighter scoring slider" 
                onChange={value => setSliderScores({...sliderScores, [fighterId]: value})}
            >
                <SliderTrack maxW="90%" bg="whiteAlpha.400">
                    <SliderFilledTrack bg="whiteAlpha.800" />
                </SliderTrack>
                <SliderThumb bg="whiteAlpha.900" boxSize="6" />
            </Slider>
        </Flex>
    )
}