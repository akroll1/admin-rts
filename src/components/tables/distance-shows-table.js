import { 
  Box, 
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  useColorModeValue as mode
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { transformedISO } from '../utils'

export const DistanceShowsTable = ({ 
  handleDeleteShow,
  handleShowSelect,
  selectedDistanceShows
}) => {
  return (
    <Box w="100%" mx="auto">
      <FightersTableContent 
        handleDeleteShow={handleDeleteShow}
        handleShowSelect={handleShowSelect}
        selectedDistanceShows={selectedDistanceShows}
      />
    </Box>
  )
}
 
const columns = [
  {
      Header: 'Show Name',
      accessor: '',
  },
  {
      Header: 'Date',
      accessor: ''
  },
  {
      Header: 'Fights',
      accessor: ''
  },
  {
      Header: 'Delete',
      accessor: ''
  }
];

const FightersTableContent = ({
  handleShowSelect,
  handleDeleteShow,
  selectedDistanceShows
}) => {
  // console.log('fighters: ',fighters)
  return (

    <Table my="8" borderWidth="1px" fontSize="sm">
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
        {selectedDistanceShows?.length && selectedDistanceShows.map( (row, i) => {
          console.log('row: ', row)
          const { show, fightSummaries } = row;

            return (
              <Tr 
                id={show.showId}
                textAlign="center" 
                cursor="pointer" 
                key={i}
              >
                <Td onClick={e => handleShowSelect(e, show.showId)} textAlign="center">{show.showName}</Td>
                <Td onClick={e => handleShowSelect(e, show.showId)} textAlign="center">{transformedISO(show.showTime)}</Td>
                <Td onClick={e => handleShowSelect(e, show.showId)} textAlign="center">{fightSummaries.length}</Td>
                <Td 
                  textAlign="center"
                >
                  <DeleteIcon 
                    onClick={e => handleDeleteShow(e, show.showId)}
                    color="#aaa"
                    boxSize="5"
                    _hover={{
                      color: 'white'
                    }}
                  />
                </Td>
              </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}