import { Flex, Heading } from '@chakra-ui/react'
import { ScoringSidebarFighterSwipe } from './scoring-sidebar-fighter-swipe'
import image from '../../../image/boxing-background.png'
import { useScorecardStore } from '../../../stores'

export const ScoringSidebarFightersFaceoff = ({
    tabs
}) => {
    const { 
        fighters
    } = useScorecardStore()

    return (
        <Flex     
            display={tabs.info ? 'flex' : 'none'}
            back       
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
                textAlign="center"
                w="100%"
                mt="0"
                pt="0"
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Heading 
                    w="100%"
                    bg="#171717"
                    zIndex={99}
                    mb="2"
                    as="h2"
                    size="xl"
                    minH="2rem"
                >
                    Your Scorecard
                </Heading>
            </Flex>
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
    )
}