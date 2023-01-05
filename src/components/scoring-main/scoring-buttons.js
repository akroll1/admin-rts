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
    lastScoredRound,
    notSelectedScore,
    handleFighterSelect,
    submitScores,
    totalRounds,
}) => {

    const {
        fighters,
        userScorecard
    } = useGlobalStore()

    
    const fightComplete = lastScoredRound >= totalRounds; 
    const isDisabled = !fighterIds?.selectedFighterId || fightComplete;
    const { selectedFighterId } = fighterIds?.fighter1Id ? fighterIds : {};
    
    const setButtonLabel = () => {
        
        if(fightComplete){
            return `Fight Complete`
        }
        if(!selectedFighterId){
            return `Select Fighter`
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
            minH="25vh"
            maxH="25vh"
            mb="12"
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
                    disabled={isDisabled} 
                    variant={isDisabled ? "outline" : "none"} 
                    mx="auto" 
                    my="2"
                    bg={selectedFighterId ? "#303030" : "#666"}
                    fontSize="1.2rem"
                    border="1px solid"
                    borderColor={selectedFighterId ? 'whiteAlpha.900' : '#bababa'}
                    fontWeight="bold"
                    color={selectedFighterId ? "inherit" : "gray.200 !important"}
                    w={["80%", "70%", "60%", "50%"]}
                    minH="3rem"
                >
                    {`${buttonLabel}`}
                </Button>
            </Flex>
        </Flex>
    )
}