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
import { capFirstLetters } from '../../utils'

export const CreatePanelAllPanelsTable = ({ 
  handleSelectPanel,
  summaries, 
}) => {
  return (
    <Flex 
      flexDir="column" 
      maxH="15rem" 
      overflow="scroll" 
      maxW={{ base: 'container.xl', md: '7xl' }} 
      mx="auto" 
      mt="1rem" 
      px={{ base: '6', md: '8' }}
    >
      <CreatePanelAllPanelsTableContent 
        summaries={summaries} 
        handleSelectPanel={handleSelectPanel} 
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
      Header: 'All Existing Panels',
      accessor: 'fightQuickTitle',
  }
];
const CreatePanelAllPanelsTableContent = ({ 
  handleSelectPanel, 
  summaries 
}) => {

  return (
    <Table my="8" mt="0" borderWidth="1px" fontSize="sm">
        <TableCaption placement="top" >All Panels Table</TableCaption>
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
        {summaries?.length > 0 && summaries.map( (panel, i) => {
            return (
              <Tr 
                onClick={handleSelectPanel} 
                _hover={{cursor: 'pointer'}} 
                id={panel.panelId} 
                key={panel.panelId}
              >
                  <Td>{capFirstLetters(panel.fightQuickTitle)}</Td>
              </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}