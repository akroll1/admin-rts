import {
    Button,
    Flex
} from "@chakra-ui/react"
import { LastRow } from "./last-row"
import { FighterSelectionButtons } from "./fighter-selection-buttons"
import { useGlobalStore } from "../../stores"

export const ScoringButtons = ({
    clearSelectedFighter,
    evenRound,
    handleAdjustScore,
    fighter1Id,
    fighter2Id,
    notSelectedScore,
    selectedFighter,
    handleFighterSelect,
    submitScores,
}) => {

    const {
        activeGroupScorecard,
        userScorecard
    } = useGlobalStore()

    const isDisabled = false;
    const fightComplete = false;
    const selectedFighterId = selectedFighter.fighterId
    return (
        <Flex
            id="scoring_buttons"
            flexDir="column"
            w="100%"
            maxH="20%"
            mb="12"
        >
            <LastRow 
                clearSelectedFighter={clearSelectedFighter}
                handleAdjustScore={handleAdjustScore}
                fighter1Id={fighter1Id}
                fighter2Id={fighter2Id}
                notSelectedScore={notSelectedScore}
                selectedFighterId={selectedFighter.fighterId}
                handleFighterSelect={handleFighterSelect}
            />
            <Flex  
                flexDir={["column"]} 
                w={["100%"]} 
            >
                <Flex
                    w="100%"
                    mt="2"
                    alignItems="center"
                    justifyContent="space-around"
                >
                    { activeGroupScorecard?.fighters?.length > 0 && activeGroupScorecard?.fighters.map( (fighter, _i) => (
                        <FighterSelectionButtons
                            evenRound={evenRound}
                            fighter={fighter}
                            key={fighter?.fighterId}
                            fighter1Id={fighter1Id}
                            fighter2Id={fighter2Id}
                            selectedFighterId={selectedFighter.fighterId}
                            handleFighterSelect={handleFighterSelect}
                        /> 
                    ))}
                </Flex>
                <Button
                    zIndex={1000}
                    onClick={submitScores}
                    disabled={isDisabled} 
                    variant={isDisabled ? "outline" : "solid"} 
                    colorScheme="solid" 
                    mx="auto" 
                    my="2"
                    fontSize="1.2rem"
                    fontWeight="bold"
                    color={selectedFighterId ? "inherit" : "#FAFAFA"}
                    w={["80%", "70%", "60%", "50%"]}
                    minH="3rem"
                >
                    {isDisabled && fightComplete ? `Scoring Complete` : selectedFighterId ? `Score Round ${userScorecard?.scores?.length + 1}` : `Round ${userScorecard?.scores?.length > 0 ? userScorecard?.scores?.length + 1 : 12}` }
                </Button>
            </Flex>
        </Flex>
    )
}