import { 
  Flex,
  Heading 
} from '@chakra-ui/react'
import { 
  ScorecardsPageTableContent, 
} from './table-els'

export const ScorecardsPageTable = ({ 
  scorecards 
}) => {

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
      flex="1 0 70%"
      overflow="scroll"
      p="4"
      pt="0"
      mx="auto"
      mb="8"
      maxW={["100%"]}
    >
      <Heading 
        mb="4"
        textAlign="center"
      >
        Scorecards
      </Heading>
      {/* <TableActions /> */}
      <ScorecardsPageTableContent scorecards={scorecards} />
    </Flex>
  )
}