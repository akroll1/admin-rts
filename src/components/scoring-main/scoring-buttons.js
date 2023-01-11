import {
    Button,
    Flex
} from "@chakra-ui/react"
import { LastRow } from "./last-row"
import { FighterSelectionButtons } from "./fighter-selection-buttons"
import { useGlobalStore } from "../../stores"

export const ScoringButtons = ({
    evenRound,
    fighterIds,
    handleAdjustScore,
    notSelectedScore,
    handleFighterSelect,
    submitScores,
}) => {

    const {
        fighters,
        scoringComplete,
        userScorecard
    } = useGlobalStore()

    
    const isDisabled = !fighterIds?.selectedFighterId || scoringComplete;
    const { selectedFighterId } = fighterIds?.fighter1Id ? fighterIds : {};
    
    const setButtonLabel = () => {
        
        if(scoringComplete){
            return `Scoring Complete`
        }
        if(!selectedFighterId){
            return `Select Round ${userScorecard?.scores?.length + 1}`
        }
        if(selectedFighterId){
            return `Submit Round ${userScorecard?.scores?.length + 1}`
        }
    }
    
    const buttonLabel = setButtonLabel()

    return (
        <Flex
            id="scoring_buttons"
            flexDir="column"
            w="100%"
        >
            <LastRow 
                fighterIds={fighterIds}
                handleAdjustScore={handleAdjustScore}
                notSelectedScore={notSelectedScore}
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
                    { fighters?.length > 0 && fighters.map( (fighter, _i) => (
                        <FighterSelectionButtons
                            evenRound={evenRound}
                            fighter={fighter}
                            fighterIds={fighterIds}
                            handleFighterSelect={handleFighterSelect}
                            key={fighter?.fighterId}
                        /> 
                    ))}
                </Flex>
                <Button
                    zIndex={1000}
                    onClick={submitScores}
                    disabled={!selectedFighterId} 
                    variant="solid" 
                    mx="auto" 
                    my="2"
                    bg={selectedFighterId ? "red.600" : "#666"}
                    fontSize="1.2rem"
                    border="1px solid"
                    borderColor={selectedFighterId ? 'red.400' : '#bababa'}
                    fontWeight="bold"
                    color={selectedFighterId ? "inherit" : "gray.100"}
                    w={["80%", "70%", "60%", "50%"]}
                    minH={["2.5rem", "3rem"]}
                >
                    {`${buttonLabel}`}
                </Button>
            </Flex>
        </Flex>
    )
}