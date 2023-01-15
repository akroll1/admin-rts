import { 
  Flex, 
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  useColorModeValue as mode 
} from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const MyPanelsFormTable = ({ 
  handlePanelSelect, 
  summaries 
}) => {
  return (
    <Flex 
        flexDir="column" 
        maxH="15rem" 
        overflow="scroll" 
        mx="auto" 
        px={{ base: '3', md: '4' }}
        minW="100%"
    >
      <MyPanelsTableContent handlePanelSelect={handlePanelSelect} summaries={summaries} />
    </Flex>
  )
}
 
const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}
const columns = [
  {
      Header: 'Red Corner',
      accessor: 'fightQuickTitle',
  },
  {
      Header: 'Blue Corner',
      accessor: 'fightQuickTitle',
  },
  // {
  //     Header: 'Last Name',
  //     accessor: 'lastName'
  // },
];
const MyPanelsTableContent = ({ 
  handlePanelSelect, 
  summaries 
}) => {

  return (
    <Table my="8" borderWidth="1px" fontSize="sm" variant="striped">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th 
                textAlign="center"
                whiteSpace="nowrap" 
                scope="col" 
                key={index}
            >
              {column.Header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {summaries?.length > 0 && summaries?.map( summary => {
            const [fighter1, fighter2] = summary.fighters
            return (
                <Tr 
                  _hover={{cursor: 'pointer'}} 
                  onClick={handlePanelSelect} 
                  id={summary.panelId} 
                  key={summary.panelId}
                >
                  <Td textAlign="center">{`${capFirstLetters(fighter1.firstName)} ${capFirstLetters(fighter1.lastName)}`}</Td>
                  <Td textAlign="center">{`${capFirstLetters(fighter2.firstName)} ${capFirstLetters(fighter2.lastName)}`}</Td>
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}