import { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
} from '@chakra-ui/card'
import { 
    Flex,
    Icon,
    ListItem,
    UnorderedList
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'
import { ScorecardsBoard } from '../sidebars/scorecards-sidebar-components/scorecards-boards/scorecards-board'

export const ScorecardsGroupsCard = ({ 
    handleScorecardSelect,
    selectedScorecard 
}) => {
    const navigate = useNavigate()
    const [active, setActive] = useState('')
    useEffect(() => {
        if(selectedScorecard?.scorecardGroups?.length){
            handleScorecardSelect(null, selectedScorecard.scorecard.fightId, selectedScorecard.scorecardGroups[0].groupScorecardType)
            setActive(selectedScorecard.scorecardGroups[0].groupScorecardId)
        }
    },[selectedScorecard])

    const scorecardSelect = (e,fightId, groupScorecardType, groupScorecardId) => {
        handleScorecardSelect(null, fightId, groupScorecardType)
        setActive(groupScorecardId)
    }

    return (
        <ScorecardsBoard
            label={`Groups`}
        >
            <Card
                w="100%"
                borderRadius="5px"
                variant="filled"
                border="1px solid #353535"
                mb="4"
            >
                <CardBody>
                    <UnorderedList mx="2" p="2">
                        { selectedScorecard?.scorecardGroups?.length > 0 && selectedScorecard.scorecardGroups.map( (groupScorecard, _i) => {
                            return (
                                <Flex
                                    key={groupScorecard.groupScorecardId}
                                    flexDir="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    cursor="pointer"
                                    borderBottom={groupScorecard.groupScorecardId === active ? '1px solid gray' : "1px solid #252525"}
                                >
                                    <Flex  
                                        onClick={(e) => scorecardSelect(e, selectedScorecard.scorecard.fightId, groupScorecard.groupScorecardType, groupScorecard.groupScorecardId)}
                                        color={groupScorecard.groupScorecardId === active ? '#fff' : '#dadada'}
                                        mb="2"
                                        w="100%"
                                        flexDir="column"
                                        _hover={{
                                            color: '#fff',
                                        }}
                                    >
                                        <ListItem fontWeight={groupScorecard.groupScorecardId === active ? 'bold' : 'normal'} as="h6" size="xs">{`${groupScorecard.groupScorecardName}`}</ListItem>
                                        <ListItem as="h6" fontSize="xs">{`Type- ${groupScorecard.groupScorecardType === 'FIGHT' ? 'Fight' : 'Season'}`}</ListItem>
                                        <ListItem as="h6" fontSize="xs">{`Total Members- ${groupScorecard.members.length}`}</ListItem>
                                    </Flex>
                                    <Icon 
                                        onClick={() => navigate(`/scoring/${groupScorecard.groupScorecardId}/${selectedScorecard.scorecard.fightId}`)}
                                        mr="2"
                                        as={ExternalLinkIcon} 
                                        w="6"
                                        h="6"
                                        color={groupScorecard.groupScorecardId === active ? '#fff' : '#888'}
                                    />
                                </Flex>
                            )
                        })}
                    </UnorderedList>
                </CardBody>
            </Card>
        </ScorecardsBoard>
    )
  }