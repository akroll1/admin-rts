import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { ScorecardsPageTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { useScorecardStore } from '../stores'
import { ScorecardsPageSidebar } from '../components/sidebars'

export const ScorecardsPage = () => {

  const {
    fetchUserInvites,
    fetchSeasonSummaries,
    fetchUserScorecards,
    seasonSummaries,
    userScorecardSummaries
  } = useScorecardStore();

  const [collatedScorecards, setCollatedScorecards] = useState([])
  const [selectedScorecard, setSelectedScorecard] = useState([])

  useEffect(() => {
    fetchUserInvites()
    fetchSeasonSummaries()
    fetchUserScorecards()
  },[])

  useEffect(() => {
    if(collatedScorecards.length){
      setSelectedScorecard(collatedScorecards[0].scorecard)
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

  const handleScorecardSelect = (e, id) => {
    const [scorecard] = collatedScorecards.filter( card => card.fight.fightId === id)
    setSelectedScorecard(scorecard.scorecard)
  }

  return (
    <Flex 
      w={["100%"]} 
      p="2"
      my={["2"]}
      flexWrap="wrap" 
      height="auto" 
      flexDirection={["column", "row"]} 
      color="white" 
      alignItems="flex-start" 
      justifyContent="center" 
      bg="fsl-body-bg"
      boxSizing="border-box"
    >    
      <ExpiredTokenModal />
      <Flex
        w="100%"
      >
        <Heading 
          color="#fafafa"
          as="h3"
          size="lg"
          mb={["2","4","8"]}
          mx="auto"
        >
          { collatedScorecards.length > 0 ? `Scorecards` : `Create A Scorecard`}
        </Heading>
      </Flex>
        <ScorecardsPageSidebar 
          handleScorecardSelect={handleScorecardSelect}
          selectedScorecard={selectedScorecard}
        />

        <ScorecardsPageTable 
          collatedScorecards={collatedScorecards}
          handleScorecardSelect={handleScorecardSelect}
          selectedScorecard={selectedScorecard}
        /> 
    </Flex>
  )
}
export default ScorecardsPage