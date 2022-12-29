import {
    Flex,
    FormLabel,
    Switch,
} from '@chakra-ui/react'

export const ScoringTableSwitches = ({
    activeGroupScorecard,
    handleRealTimeSwitchClick,
    handleShowToMyRound,
    showToMyRound,
    tabs
}) => {

    return (
        <Flex
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
                    onChange={handleShowToMyRound}
                    isChecked={showToMyRound}
                />
                <FormLabel 
                    m="0"
                    ml="2" 
                    htmlFor='currentRound'
                >
                    Show to My Round
                </FormLabel>
            </Flex>
        </Flex>
    )
}