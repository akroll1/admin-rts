import { useEffect, useState } from 'react'
import { 
  Flex,
  Heading 
} from '@chakra-ui/react'
import { GroupScorecardType, useScorecardStore } from '../../stores'
import { ScorecardsPageTableContent } from './table-els'
import { ScorecardsGroupsCard } from '../scorecards-els'

export const ScorecardsPageTable = () => {
 
  const {
    seasonSummaries,
    userScorecardSummaries,
    userScorecards
  } = useScorecardStore() 
  
  const [collatedScorecards, setCollatedScorecards] = useState([])
  const [selectedScorecard, setSelectedScorecard] = useState([])
  const [groupType, setGroupType] = useState('')

  useEffect(() => {
    if(collatedScorecards.length){
      setSelectedScorecard(collatedScorecards[0].scorecard)
      setGroupType(collatedScorecards[0].scorecard.scorecardGroups[0].groupScorecardType)
    }
  },[collatedScorecards])

  useEffect(() => {
    if(seasonSummaries.length && userScorecardSummaries.length){
      const userScorecardsFightIds = userScorecardSummaries.map( summary => summary)
        .map( summary => summary.scorecard.fightId)
      const sum = [seasonSummaries[0]]
      const summaries = sum.map( season => season)
        .reduce( (acc, season) => Array.isArray(season.fightSummaries) ? acc.concat(season.fightSummaries) : [],[])
        .filter( summary => userScorecardsFightIds.includes(summary.fight.fightId))
        .map( filtered => {
          const [scorecard] = userScorecardSummaries.filter( c => c.scorecard.fightId === filtered.fight.fightId)
          return ({
            ...filtered,
            scorecard
          })
        })
      setCollatedScorecards(summaries)
    }
  },[seasonSummaries])

  const handleScorecardSelect = (e, id, groupScorecardType) => {
    console.log('id: ', id)
    console.log('groupScorecardType: ', groupScorecardType)
    const [scorecard] = collatedScorecards.filter( card => card.fight.fightId === id)
    console.log('SCORECARD: ', scorecard)
    setSelectedScorecard(scorecard.scorecard)
    setGroupType(groupScorecardType)
  }
  console.log('selectedScorecard: ', selectedScorecard)
  return (
    <Flex 
      as="section"
      id="scorecards_table"
      bg="fsl-body-bg"
      flexDirection="column" 
      justifyContent="center"
      alignItems="center"
      boxSizing="border-box" 
      position="relative"
      w="100%"
      overflow="scroll"
      p="4"
      pt="0"
      mx="auto"
      mt="4"
      mb="8"
      maxW={["100%"]}
    >
      <Heading 
        color="#fafafa"
        as="h3"
        size="lg"
        textAlign="center"
        my="2"
      >
        {userScorecards && Array.isArray(userScorecards) && userScorecards.length > 0 
          ? 'Scorecards' 
          : 'Create a Scorecard'}
      </Heading>
      <Flex
        w="100%"
        flexDir="row"
      >
        
        <Flex
          flex="1 0 70%"
        >
          <ScorecardsPageTableContent 
            collatedScorecards={collatedScorecards} 
            groupType={groupType}
            handleScorecardSelect={handleScorecardSelect}
            selectedScorecard={selectedScorecard}
          />
        </Flex>
        <Flex
          flex="1 0 30%"
        >
          <ScorecardsGroupsCard 
            handleScorecardSelect={handleScorecardSelect}
            selectedScorecard={selectedScorecard}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
