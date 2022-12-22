import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { capFirstLetters } from '../../utils'
  import { FaArrowRight } from 'react-icons/fa'
import { FightStatus } from '../../stores/models/enums'
import { Navigate } from 'react-router'

const ScorecardItem = (props) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

export const ScorecardSummary = ({ selectedSummary }) => {

  const { fight, fighters, group, scorecard } = selectedSummary?.fight?.fightId ? selectedSummary : {};

  const renderScoreOrStatus = (fightStatus, finalScore) => {
    if(!fight?.fightStatus) return 
    if(fightStatus === `CANCELED`) return `Canceled`;
    if(fightStatus === `PENDING`) return `Upcoming`;
    if(finalScore) return finalScore;
    return '0'
  }

  const setPrediction = rawPrediction => {
    if(!fight?.fightStatus) return 
    if(rawPrediction){
      const predictionId = rawPrediction.slice(0, 36)
      const [fighter] = fighters.filter( fighter => fighter.fighterId === predictionId)
      return `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`
    }
    if(fight?.fightStatus === FightStatus.PENDING) return `Set Prediction`;
    return `DNP`
  }
  const scoreOrStatus = renderScoreOrStatus(fight?.fightStatus, fight?.finalScore);
  const prediction = setPrediction(fight?.prediction)

  // console.log('selectedSummary: ', selectedSummary)

  return (
    
      <Stack 
        mt="4"
        spacing="8" 
        borderWidth="1px" 
        rounded="lg" 
        p="8" 
        width="full"
      >
        <Heading textAlign="center" size="md">{fight?.fightQuickTitle}</Heading>

        <Stack spacing="2">
          <ScorecardItem 
            label="Group Name"
            value={group?.groupScorecardName ? group?.groupScorecardName : ``}
          />

          <ScorecardItem 
            label="Fight Status"
            value={fight?.fightStatus ? fight?.fightStatus : ``}
          />
          <ScorecardItem 
            label="Prediction" 
            value={prediction ? prediction : ``} 
          />
          <ScorecardItem 
            label="Scorecard Type"
            value={group?.groupScorecardType ? group?.groupScorecardType : ''}
          />
          <Flex justify="space-between">
            <Heading fontSize="lg" fontWeight="semibold">
                Final Score
            </Heading>
              {scoreOrStatus ? scoreOrStatus : ``}
          </Flex>
        </Stack>
        <Button 
            colorScheme="blue" 
            size="lg" 
            fontSize="md" 
            rightIcon={<FaArrowRight />}
            onClick={() => Navigate(`/scoring/${group?.groupScorecardId}`)}
        >
          Group Scorecard
        </Button>
      </Stack>
  )
}