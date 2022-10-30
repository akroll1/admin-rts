import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { useScorecardStore } from '../stores'
import { ScorecardsSidebar } from '../components/sidebars'
import { ScorecardsLeaderboard } from '../components/sidebars/scorecards-sidebar-components'

export const MyScorecards = () => {
  const {
    fetchAllSeasons,
    fetchUserScorecards,
    userScorecards,
  } = useScorecardStore();

  useEffect(() => {
    fetchUserScorecards()
    fetchAllSeasons()
  },[])
  return (
    <Flex 
      w={["100%"]} 
      m="auto"
      my="4"
      flexWrap="wrap" 
      height="auto" 
      flexDirection={["column",'column','row']} 
      color="white" 
      alignItems="flex-start" 
      justifyContent="center" 
      bg="fsl-body-bg"
    >    
      <ExpiredTokenModal />

      <ScorecardsSidebar />

      <Flex 
        as="section"
        id="scorecards_main"
        flex="1 0 75%" 
        bg="inherit"
        flexDirection="column" 
        justifyContent="center"
        alignItems="center"
        boxSizing="border-box" 
        position="relative"
        w="100%"
      >
        <Flex 
          flexDir="column"
        >
          <Heading textAlign="center">Scorecards</Heading>
          <Flex 
            id="season_metadata"
          >
            <ScorecardsLeaderboard />

          </Flex>
        </Flex>

        <MyScorecardsTable scorecards={userScorecards} />
      
      </Flex>
    </Flex>
  )
}
export default MyScorecards