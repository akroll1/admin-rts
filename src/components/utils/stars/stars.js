import { Button, Flex, Text } from '@chakra-ui/react'
import ReactStars from 'react-rating-stars-component';
import { capFirstLetters } from '../../../utils/utils';

export const Stars = () => {
    const star = ['speed','power','defense','stamina','ringGeneralship'];
    
    const ratingChanged = (rating, star) => {
        let userRatingsObj = {
            speed: 0,
            power: 0,
            defense: 0,
            stamina: 0,
            ringGeneralship: 0
        }
        userRatingsObj[star] = rating;
        // console.log('rating: ' , rating)
        // console.log('star: ', star)
        console.log('userRatingsObj: ',  userRatingsObj)
    }
    return (
        <Flex flexDir="column">
            { star.map((x,i) => {
                return (
                    <Flex mt="3" flexDirection="row" alignItems="center" justifyContent="center" _hover={{cursor: 'pointer'}} key={i} id={x}>
                        <Flex display="flex" flexDirection="row" w="50%" alignItems="center" justifyContent="flex-start">
                            <Text as="p" size="sm" mr="1rem" textAlign="left">{x === 'ringGeneralship' ? `Ring Generalship` : capFirstLetters(x)}</Text>
                        </Flex>
                        <Flex display="flex" flexDirection="row" w="50%" alignItems="center" justifyContent="flex-end">
                            <ReactStars
                                id={x}
                                style={{textAlign: 'right'}}
                                activeColor="#ffd700"
                                count={5}
                                isHalf
                                size={25}
                                onChange={e => ratingChanged(e, x)}
                            />
                        </Flex>
                    </Flex>

                )
            })}
            <Button my="1rem" onClick={() => console.log('submit ratings')} type="submit" colorScheme="blue">
                Rate This Fighter
            </Button>
        </Flex>
    )
};