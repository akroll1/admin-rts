import {
    Flex,
    FormLabel,
    Switch,
} from '@chakra-ui/react'

export const ScoringTableSwitches = ({
    activeGroupScorecard,
    handleRealTimeSwitchClick,
    handleShowToCurrentRound,
    currentRound,
    tabs
}) => {

    return (
        <Flex
            id="scoring_switches"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir="column"
            pl="2"
            display={tabs.all || tabs.table ? 'flex' : 'none'}
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                mb="1"
            >
                <Switch 
                    onChange={handleRealTimeSwitchClick}
                    size="sm"
                    colorScheme="blackAlpha.700"
                    id='realTime'
                    isChecked={activeGroupScorecard?.groupScorecard?.chatKey} 
                />
                <FormLabel 
                    m="0"
                    ml="2"
                    htmlFor='realTime'
                >
                    Real Time
                </FormLabel>
            </Flex>
            <Flex
                alignItems="center"
                justifyContent="center"
                mb="1"
            >
                <Switch
                    size="sm" 
                    colorScheme="blackAlpha.700"
                    id='currentRound' 
                    defaultChecked 
                    onChange={handleShowToCurrentRound}
                    isChecked={currentRound}
                />
                <FormLabel 
                    m="0"
                    ml="2" 
                    htmlFor='currentRound'
                >
                    Current Round
                </FormLabel>
            </Flex>
            <Flex
                alignItems="center"
                justifyContent="center"
                mb="1"
            >
                <Switch
                    size="sm" 
                    colorScheme="blackAlpha.700"
                    id='currentRound' 
                    defaultChecked 
                    // onChange={handleShowToMyRound}
                    isChecked={currentRound}
                />
                <FormLabel 
                    m="0"
                    ml="2" 
                    htmlFor='currentRound'
                >
                    Show Panelists
                </FormLabel>
            </Flex>
        </Flex>
    )
}