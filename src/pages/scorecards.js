import { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { ScorecardsPageTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { useScorecardStore } from '../stores'
import { ScorecardsPageSidebar } from '../components/sidebars'
import { ScorecardsColumn } from '../components/sidebars/scorecards-sidebar-components'

export const ScorecardsPage = () => {

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
      flexDirection={["column", "row"]} 
      color="white" 
      alignItems="flex-start" 
      justifyContent="center" 
      bg="fsl-body-bg"
    >    
      <ExpiredTokenModal />
      <Flex
        flexDir="row"
        maxH="50vh"
        w="100%"
        flex="1 0 55%"
      >
        <ScorecardsPageSidebar />
        <ScorecardsColumn />
      </Flex>
      <ScorecardsPageTable scorecards={userScorecards} />
    </Flex>
  )
}
export default ScorecardsPage