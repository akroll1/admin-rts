import { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@chakra-ui/card'
import { 
    Flex,
    Heading,
    Icon,
    ListItem,
    UnorderedList
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'

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
        <Card
            w="100%"
            borderRadius="5px"
            m="1"
            py="2"
            px="1"
            variant="filled"
            bg="#111111"
        >
            <CardHeader>
            <Heading
                size='md'
                textAlign="center"
            >
                { selectedScorecard?.scorecardGroups?.length > 0
                    ?`${selectedScorecard?.scorecardGroups?.length} Scorecard${selectedScorecard?.scorecardGroups?.length === 1 ? '' : 's'}`
                    : 'Scorecards'
                }
            </Heading>
            </CardHeader>
            <CardBody>
                <UnorderedList>
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
                                    color="#dadada"
                                    mb="2"
                                    mt="3"
                                    w="100%"
                                    flexDir="column"
                                    _hover={{
                                        color: '#fff',
                                    }}
                                >
                                    <ListItem mt="2" as="h6" size="xs">{`${groupScorecard.groupScorecardName}`}</ListItem>
                                    <ListItem as="h6" fontSize="xs">{`Type- ${groupScorecard.groupScorecardType === 'FIGHT' ? 'Fight' : 'Season'}`}</ListItem>
                                    <ListItem as="h6" fontSize="xs">{`Total Members- ${groupScorecard.members.length}`}</ListItem>
                                </Flex>
                                <Icon 
                                    onClick={() => navigate(`/scoring/${groupScorecard.groupScorecardId}`)}
                                    mr="2"
                                    as={ExternalLinkIcon} 
                                    w="6"
                                    h="6"
                                    color={groupScorecard.groupScorecardId === active ? '#fff' : 'transparent'}
                                />
                            </Flex>
                        )
                    })}
                </UnorderedList>
            </CardBody>
        </Card>
    )
  }