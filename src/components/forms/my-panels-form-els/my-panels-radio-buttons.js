import { Container, Flex, Text } from '@chakra-ui/react'
import { RadioCard, MyPanelsRadioCardGroup } from './who-wins-radio-card'
import { capFirstLetters } from '../../../stores'

export const MyPanelsRadioButtons = ({ setWinner, selectedPanel }) => {
    const { fighters } = selectedPanel?.fighters ? selectedPanel : [];
  return (
    <Flex
        m="auto"
        justifyContent="space-evenly"
        alignItems="center"
        w="100%"
        as="section"
        // bg="whiteAlpha.100"
        py={{base: '4'}}
        pt="4"
        flexDirection="row"
    >
        <Container maxW="lg">
            <MyPanelsRadioCardGroup defaultValue="one" spacing="3" w="100%">
                { fighters?.length > 0 && fighters.map( fighter => (
                    <RadioCard 
                        fighterId={fighter.fighterId}
                        setWinner={setWinner}
                        minH="4rem" 
                        border="1px solid red" 
                        key={fighter.fighterId} 
                        value={fighter.firstName}
                    >
                        <Text w="100%" color="emphasized" fontWeight="medium" fontSize="sm">
                            {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`}
                        </Text>
                    </RadioCard>
                ))}
            </MyPanelsRadioCardGroup>
        </Container>
    </Flex>
  )
}