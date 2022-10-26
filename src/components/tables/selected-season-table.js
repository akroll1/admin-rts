import { 
  Flex, 
  Heading,
  Table, 
  TableCaption, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  useColorModeValue as mode 
} from '@chakra-ui/react'
import { capFirstLetters, parseEpoch } from '../../utils'
import { DeleteIcon } from '@chakra-ui/icons'

export const SelectedSeasonTable = ({ 
  handleFightSelect,
  removeFight,
  selectedSeason
}) => {
  return (
    <Flex 
      flexDir="column" 
      maxH="20rem" 
      mx="auto" 
      mb="4"
    >
      <SelectedSeasonTableContent 
        handleFightSelect={handleFightSelect}
        removeFight={removeFight}
        selectedSeason={selectedSeason} 
      />
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
    Header: 'Scheduled',
    accessor: 'start'
  },
  {
      Header: 'Fighter A',
      accessor: 'seasonTitle',
  },
  {
    Header: 'Fighter B',
    accessor: 'end'
  },
  {
    Header: 'Delete',
    accessor: ''
  }
];
const SelectedSeasonTableContent = ({ 
  handleFightSelect,
  removeFight,
  selectedSeason, 
}) => {

  const handleDelete = e => {
    const { id } = e.currentTarget;
    console.log('id: ', id)
    removeFight(id)
  }

  return (
    <Flex
        m="4"
        alignItems="center"
        justifyContent="center"
    >
      <Table mb="6" borderWidth="1px" fontSize="sm" overflowY="scroll">
        {/* <TableCaption placement="top">{selectedSeason?.seasonInfo.seasonName ? selectedSeason.seasonInfo.seasonName : ''}</TableCaption>  */}
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
          { selectedSeason?.fightSummaries?.length > 0 && selectedSeason.fightSummaries.map( (row, _i) => {
            console.log('row: ', row)

            const { fight, fighters, show } = row
            return (
              <Tr 
                _hover={{cursor: 'pointer'}}  
                id={fight.fightId} 
                key={fight.fightId}
                
              >
                <Td id={fight.fightId} textAlign="center" onClick={handleFightSelect}>{parseEpoch(show.showTime)}</Td>
                <Td id={fight.fightId} textAlign="center" onClick={handleFightSelect}>{capFirstLetters(`${fighters[0].firstName} ${fighters[0].lastName}`)}</Td>
                <Td id={fight.fightId} textAlign="center" onClick={handleFightSelect}>{capFirstLetters(`${fighters[1].firstName} ${fighters[1].lastName}`)}</Td>
                <Td textAlign="center" onClick={handleDelete} id={fight.fightId} zIndex={10000}>{<DeleteIcon />}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Flex>  
  )
}