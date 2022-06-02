import React from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import ReactStars from 'react-rating-stars-component';
import { capFirstLetters } from '../../utils/utils';
export const Stars = ({ handleStarRating, handleStarDivClick }) => {
    const star = ['speed','power','defense','stamina','ringGeneralship'];
    const stars = (star) => {
        return star.map((x,i) => {
            return (
                <Flex mt="3" flexDirection="row" alignItems="center" justifyContent="center" _hover={{cursor: 'pointer'}} key={i} id={x}>
                    <Flex display="flex" flexDirection="row" w="50%" alignItems="center" justifyContent="flex-start">
                        <Text mr="1rem" textAlign="left">{capFirstLetters(x) === 'ringGeneralship' ? 'Ring Generalship' : capFirstLetters(x)}</Text>
                    </Flex>
                    <Flex display="flex" flexDirection="row" w="50%" alignItems="center" justifyContent="flex-end">
                            <ReactStars
                                style={{textAlign: 'right'}}
                                activeColor="#ffd700"
                                count={5}
                                isHalf
                                size={25}
                                onChange={() => console.log('clicked ere')}
                        />
                    </Flex>
                </Flex>

            )
       });
    };
    return (
        <Flex flexDir="column">
            {stars(star)}
            <Button my="1rem" onClick={() => console.log('submit ratings')} type="submit" colorScheme="blue">
                Submit My Ratings
            </Button>
        </Flex>
    )
}