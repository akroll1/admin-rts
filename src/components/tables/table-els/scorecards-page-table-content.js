import { 
  Flex,
  Icon,
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  useColorModeValue as mode 
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { capFirstLetters } from '../../../utils'

export const ScorecardsPageTableContent = ({ 
  collatedScorecards,
  groupType,
  handleScorecardSelect,
  selectedScorecard
}) => {

  const renderLink = (groupType, selectedScorecard, scorecard, fightQuickTitle) => {
    if(groupType === 'FIGHT' && selectedScorecard?.scorecard?.fightId === scorecard.scorecard.fightId){
      return <Flex alignItems="center" justifyContent="flex-start"><Icon color="gray" mx="2" h="3" w="3" as={LinkIcon} />&nbsp;{fightQuickTitle}</Flex>
    } 
    if(groupType === 'SEASON' && selectedScorecard?.scorecard?.targetId === scorecard.scorecard.targetId){
      return <Flex alignItems="center" justifyContent="flex-start"><Icon color="gray" mx="2" h="3" w="3" as={LinkIcon} />&nbsp;{fightQuickTitle}</Flex>
    }
    return fightQuickTitle
  }

  return (
    <Table 
      w="100%"
      variant="simple" 
      border="1px solid rgba(255, 255, 255, 0.16)" 
      fontSize="sm" 
      size={['sm', 'md']}
      overflow="scroll"
      // m="auto"
      bg="#151515"
    >
      <Thead bg={mode('gray.50', '#262626')}>
        <Tr>
            <Th whiteSpace="nowrap" scope="col" textAlign="left">
              Fight  
            </Th>
            <Th whiteSpace="nowrap" scope="col" textAlign="left">
              Prediction
            </Th>
            <Th whiteSpace="nowrap" scope="col" textAlign="left">
              Score
            </Th>
        </Tr>
      </Thead>
      <Tbody>
        { collatedScorecards?.length > 0 && collatedScorecards?.map( (row, index) => {
          // console.log('row: ', row)
          const { fight, fighters, scorecard } = row
          const { fightId, fightQuickTitle, fightStatus } = fight;
          const { finalScore, prediction } = scorecard;
          const setPrediction = rawPrediction => {
            if(rawPrediction){
              const predictionId = rawPrediction.slice(0, 36)
              const [fighter] = fighters.filter( fighter => fighter.fighterId === predictionId)
              return `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`
            }
            return `Set Prediction`
          }
          // const transformedFightStatus = fightStatus.charAt(0).toUpperCase() + fightStatus.slice(1).toLowerCase();
          const renderScoreOrStatus = () => {
            if(fightStatus === `CANCELED`) return `Canceled`;
            if(fightStatus === `PENDING`) return `Upcoming`;
            if(finalScore) return finalScore;
            if(!finalScore && !prediction) return `DNP`; 
          }
          return (
            <Tr 
              id={fightId}
              onClick={e => handleScorecardSelect(e, fightId, selectedScorecard.scorecardGroups[0].groupScorecardType)} 
              key={index} 
              border="1px solid #383838"
              _hover={{
                textAlign: "left",
                cursor: 'pointer', 
                bg: "#202020",
                color: '#fff', 
                borderBottom: '1px solid #262626',
                borderRadius: '5px'
              }} 
              bg={selectedScorecard?.scorecard?.fightId === fightId ? '#262626' : ''}
            >
              <Td whiteSpace="nowrap">{ renderLink(groupType, selectedScorecard, scorecard, fightQuickTitle) }</Td>
              <Td whiteSpace="nowrap">{ setPrediction(prediction) }</Td>
              <Td whiteSpace="nowrap">{ renderScoreOrStatus() }</Td>
            </Tr>
        )})}
      </Tbody>
    </Table>
  )
}