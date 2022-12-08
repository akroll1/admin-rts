import { Flex, Heading } from '@chakra-ui/react'
import { FighterSelectionSwipe } from "./fighter-selection-swipe"
import image from '../../../image/boxing-background.png'

export const FighterSelection = ({ 
    fighters,
    handleFighterSelect,
    selectedFighter,
}) => {

    const draw = {
        fighterId: 'DRAW',
        wins: '',
        losses: '',
        kos: '',
        ringname: '', 
        firstName: '',
        lastName: ''
    }
    const optionsArr = fighters?.length > 0 ? [fighters[0],draw, fighters[1]] : [];
    return (
        <Flex     
            flexDir={["column"]} 
            w={["100%"]} 
            position="relative"
            // maxH={["20vh", "25vh", "50vh"]}
            h="auto"
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
            <Heading 
                textAlign="center"
                zIndex={10}
                color="#fff"
                as="h2" 
                size={["md","lg"]}
                pt="2" 
                mt="1"
            >
                Panel Member Area
            </Heading>
            <Flex
                flexDir="row"
                w="100%"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
            >
                { optionsArr.length > 0 && 
                    optionsArr.map( (fighter, _i) => <FighterSelectionSwipe 
                        key={_i}
                        fighter={fighter} 
                        handleFighterSelect={handleFighterSelect} 
                        selectedFighter={selectedFighter}
                    /> 
                )}
            </Flex>
            <Flex 
                zIndex={101}
                minH="2rem" 
                w="100%" 
                alignItems="center" 
                justifyContent="center"
                pointerEvents={selectedFighter ? 'auto' : 'none'}
            />
        </Flex>
    )


}