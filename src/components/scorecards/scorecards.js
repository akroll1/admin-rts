import { useEffect, useState } from 'react'
import {
    Flex,
    Heading,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores'
import { ScorecardRow } from './scorecard-row'
import { ScorecardSummary } from './scorecard-summary'
import { ScorecardsInvitationsBoard } from '../sidebars/scorecards-sidebar-components/scorecards-boards'

export const Scorecards = () => {
    
    const [selectedSummary, setSelectedSummary] = useState({})
    const [showInvitations, setShowInvitations] = useState(false)
    const { 
        fetchUserInvites,
        fetchUserScorecards,
        userInvites,
        userScorecardSummaries
    } = useGlobalStore();

    useEffect(() => {
        fetchUserScorecards()
        fetchUserInvites()
    },[])

    useEffect(() => {
        if(userScorecardSummaries?.length > 0){
            handleSelectGroup(userScorecardSummaries[0].scorecardGroups[0].groupScorecardId)
        }
    },[userScorecardSummaries])

    const handleSelectGroup = value => {
        // console.log('value: ', value)
        const scorecardGroups = userScorecardSummaries.filter( summary => {
            return summary.scorecardGroups.filter( group => {
                if(group.groupScorecardId === value){
                    const obj = {
                        fight: summary.fight,
                        scorecard: summary.scorecard,
                        group
                    }
                    
                    return setSelectedSummary(obj)
                }
            })
        })
    }
    
    // console.log('selectedSummary: ', selectedSummary)
    
    return (
        <Flex
            id="scorecards_page"
            w="100%"
            flexDir={["column", "column", "row"]}
            flexWrap="wrap-reverse"
            p="2"
            minH="70vh"
        >
            <Flex 
                flexDir="column"
                w="100%"
                flex="1 0 65%"
                overflow="scroll"
                // flexWrap={["wrap-reverse", "wrap-reverse", "wrap"]}
                alignItems="flex-start"
                justifyContent="flex-start"
                boxSizing="border-box"
            >   
                <Heading 
                    fontSize="3xl" 
                    fontWeight="extrabold"
                    mb="4"
                    mx="auto"
                >
                    {userScorecardSummaries.length === 0 ? `Create A Scorecard` : `${userScorecardSummaries.length} Scorecard${userScorecardSummaries.length > 1 ? 's' : ''}`}
                </Heading>

                <Flex 
                    p="4"
                    w="100%"
                    flexDir="column"
                >
                    { userScorecardSummaries?.length > 0 
                    && userScorecardSummaries.map( (summary, _i) => (
                        <ScorecardRow 
                            handleSelectGroup={handleSelectGroup}
                            key={_i} 
                            selectedFightId={selectedSummary?.fight?.fightId}
                            summary={summary} 
                        />
                    ))}
                </Flex>
            </Flex>
            <Flex 
                id="scorecards_page_summary" 
                flexDir="column"
                w="100%"
                flex="1 0 25%"
                overflow="scroll"
                // flexWrap={["wrap-reverse", "wrap-reverse", "wrap"]}
                alignItems="flex-start"
                justifyContent="flex-start"
                boxSizing="border-box"
            >   
                <Flex 
                    w="100%"
                >

                    <Text 
                        onClick={() => setShowInvitations(prev => !prev)}
                        _hover={{
                            cursor: 'pointer',
                            color: 'white'
                        }} 
                        ml="2" 
                        color="gray.400"
                        textAlign="center"
                        mx="auto"
                        textDecor="underline"
                        fontSize="lg"
                    >
                        { showInvitations ? `Show Scorecard Summary` : userInvites.length > 0 ? `Show Invitations (${userInvites.length})` : `Show Invitations`}
                    </Text>
                </Flex>
                { showInvitations
                    ? 
                        <ScorecardsInvitationsBoard />
                    :
                        <ScorecardSummary 
                            selectedSummary={selectedSummary}
                        />
                }                
            </Flex>           
        </Flex>
    )
}