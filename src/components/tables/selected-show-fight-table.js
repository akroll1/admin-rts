import { 
  Flex, 
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

export const SelectedShowFightTable = ({ 
  deleteFightFromShow,
  selectedShowFights
}) => {
  return (
    <Flex 
      minW="100%"
      flexDir="column" 
      maxH="20rem" 
      mx="auto" 
      mb="4"
    >
      <SelectedShowFightsTableContent 
        deleteFightFromShow={deleteFightFromShow}
        selectedShowFights={selectedShowFights} 
      />
    </Flex>
  )
}
 
const columns = [
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
const SelectedShowFightsTableContent = ({ 
  deleteFightFromShow,
  selectedShowFights, 
}) => {

  const handleDelete = e => {
    const { id } = e.currentTarget;
    deleteFightFromShow(id)
  }
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      overflow="scroll"
    >
      <Table minW="100%" my="6" borderWidth="1px" fontSize="sm" overflowY="scroll">
        {/* <TableCaption fontSize="1.5rem" placement="top">{selectedShowFights?.season?.seasonName} Fights</TableCaption>  */}
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
          { selectedShowFights?.length > 0 
            && selectedShowFights.map( (row, _i) => {
              console.log('row: ', row)
            const { fight, fighters, show } = row
            return (
              <Tr   
                id={fight.fightId} 
                key={fight.fightId}
              >
                <Td id={fight.fightId} textAlign="center">{capFirstLetters(`${fighters[0].firstName} ${fighters[0].lastName}`)}</Td>
                <Td id={fight.fightId} textAlign="center">{capFirstLetters(`${fighters[1].firstName} ${fighters[1].lastName}`)}</Td>
                <Td _hover={{cursor: 'pointer'}} textAlign="center" onClick={handleDelete} id={fight.fightId} zIndex={10000}>{<DeleteIcon />}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Flex>  
  )
}