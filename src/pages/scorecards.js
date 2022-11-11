import { 
  Flex, 
  Heading 
} from '@chakra-ui/react'
import { ScorecardsPageTable } from '../components/tables'
import { 
  DisplayNameModal, 
  ExpiredTokenModal 
} from '../components/modals'
import { useScorecardStore } from '../stores'
import { ScorecardsPageSidebar } from '../components/sidebars'
import { 
  ScorecardsLeaderboardBoard, 
  ScorecardsMetadataBoard 
} from '../components/sidebars/scorecards-sidebar-components'
import { parseEpoch } from '../utils'
import { useEffect } from 'react'

export const ScorecardsPage = () => {

  const {
    fetchSeasonSummaries,
    fetchUserScorecardsBySeason,
    selectedSeasonSummary,
  } = useScorecardStore();

  useEffect(() => {
    fetchSeasonSummaries()
    fetchUserScorecardsBySeason('active')
  },[])

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
      <DisplayNameModal />
      <ExpiredTokenModal />
       
      <ScorecardsPageSidebar />
      <Flex
        w="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="flex-start"
        flex="1 0 70%"
      >
         <Heading
          as="h3"
          size="lg"
          px="2"
          py="0"
        >
          { selectedSeasonSummary?.season?.seasonName
            ?  `${selectedSeasonSummary?.season?.seasonName}`
            : `Season`
        }
        </Heading>
         <Heading
          as="h4"
          size="sm"
          mb="1"
        >
          { selectedSeasonSummary?.season?.starts
            ?  `${parseEpoch(selectedSeasonSummary?.season?.starts).slice(0, 9)} - ${parseEpoch(selectedSeasonSummary?.season?.ends).slice(0, 9)}`
            : ``
        }
        </Heading>
        <Flex
          boxSizing='border-box'
          w="100%"
          flexDir="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexWrap="wrap"
          minH="40vh"
          overflow="scroll"
        >
            <ScorecardsMetadataBoard 
            />
            <ScorecardsLeaderboardBoard 
            />
        </Flex>
        <ScorecardsPageTable />
      </Flex>
    </Flex>
  )
}
export default ScorecardsPage