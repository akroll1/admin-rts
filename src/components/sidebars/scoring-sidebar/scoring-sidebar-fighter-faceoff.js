import { Flex, Heading } from '@chakra-ui/react'
import { ScoringSidebarFighterSwipe } from './scoring-sidebar-fighter-swipe'
import { capFirstLetters } from '../../../utils'
import { useScorecardStore } from '../../../stores'
import image from '../../../image/boxing-background.png'

export const ScoringSidebarFightersFaceoff = ({
    tabs
}) => {
    const { 
        fighters
    } = useScorecardStore()

    return (
        <>
            <Flex     
                display={tabs.info ? 'flex' : 'none'}
                flexDir={["column"]} 
                w={["100%"]} 
                position="relative"
                _before={{
                    content: "''",
                    background: `url(${image})`,
                    opacity: "0.3",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    position: "absolute",
                    zIndex: "1"
                }}
            >
                <Flex
                    flexDir="row"
                    w="100%"
                    textAlign="center"
                >

                { fighters.length > 0 && fighters.map( (fighter, i) => (
                    <ScoringSidebarFighterSwipe
                        fighter={fighter}
                        key={i}
                    />
                ))}

                </Flex>
            </Flex>
            { fighters.length > 0 && fighters.map( fighter => {
                <Flex
                    key={fighter.fighterId}
                    flexDir="row"
                >
                    <Heading    
                        textAlign="center" 
                        as="h2" 
                        size="xs"
                        mb="1"
                    >
                        {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`} 
                    </Heading>
                </Flex>
            })}
        </>
    )
}