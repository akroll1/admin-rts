import {
  Avatar,
  Flex,
  Image,
  Tag,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FightStatus } from '../../stores/models/enums';
  
export const ScorecardRowItemLeft = ({ summary }) => {

  const { fight, scorecard, scorecardGroups } = summary;
  const { displayName, fightId, finalScore, groups, prediction, scorecardId, scores } = scorecard;
  // const { admin, chatKey, groupScorecardId, groupScorecardName, groupScorecardNotes, groupScorecardType, members } = scorecardGroups
  let image;
  return (
    <Flex 
      flexDir="row" 
      justifyContent="space-between"
      alignItems="flex-start"
      w="100%"
      p="1"
    >
      { image 
        ? 
          <Image
            rounded="lg"
            width="120px"
            height="120px"
            fit="cover"
            src={image}
            alt={'alt text'}
            draggable="false"
            loading="lazy"
          />
        :
          <Avatar 
            m="auto" 
            size={["sm","md","lg"]}
          />
      }
      <Flex 
        p="2"
        pl="4"
        w="100%"
        flexDir="column"
      >
        <Text 
          fontWeight="medium"
          _hover={{
            color: 'white',
            cursor: 'pointer',
            textDecor: 'underline',
            textDecorationColor: 'gray.400' // link to the specific fight on /shows here.
          }}
        >
          {fight.fightQuickTitle}
        </Text>
        <Text color={mode('gray.600', 'gray.400')} fontSize="xs">
          {fight.weightclass}
        </Text>
        <Flex
          width="100%"
          display="inline-flex"
          flexWrap="wrap"
        >
          <Tag
            m="2px"
            variant="solid"
            size="sm"
            colorScheme={fight.fightStatus === FightStatus.PENDING ? 'teal' : 'green'}
          >
            {fight.fightStatus === FightStatus.PENDING ? 'Upcoming' : 'Official'}
          </Tag>
          { fight.isTitleFight && 
            <Tag
              m="2px"
              variant="solid"
              size="sm"
              colorScheme='yellow'
            >
              Title
            </Tag>
          }
          <Tag
            m="2px"
            variant="solid"
            size="sm"
            colorScheme='gray'
          >
            {`${fight.rounds} Rounds`}
          </Tag>
        </Flex>
      </Flex>
    </Flex>
  )
}