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
  
  export const SeasonsTable = ({ 
    allSeasons,
    handleSeasonSelect,
  }) => {
    return (
      <Flex 
        flexDir="column" 
        maxH="20rem" 
        mx="auto" 
        mb="4"
        w="100%"
      >
        <SeasonsTableContent 
            handleSeasonSelect={handleSeasonSelect}
            allSeasons={allSeasons}
        />
      </Flex>
    )
  }
   
  const columns = [
    {
        Header: 'Season Name',
        accessor: 'seasonName',
    },
    {
        Header: 'Starts',
        accessor: 'starts'
    },
    {
        Header: 'Ends',
        accessor: 'ends'
    },
    {
        Header: 'Total Fights',
        accessor: 'ends'
    },

  ];
  
  const SeasonsTableContent = ({ 
    allSeasons, 
    handleSeasonSelect,
  }) => {
    // console.log('allSeasons: ', allSeasons)

    return (
      <>
        <Table borderWidth="1px" fontSize="sm" overflowY="scroll">
          <TableCaption placement="top">Seasons "2"</TableCaption> 
          <Thead bg={mode('gray.50', 'gray.800')}>
            <Tr>
              {columns.map((column, _i) => (
                <Th 
                    whiteSpace="nowrap" 
                    scope="col" 
                    key={_i}
                    textAlign="left"
                >
                  {column.Header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {allSeasons.length > 0 && allSeasons.map( (row, _i) => {
                const { season } = row;
                const { fightIds, seasonId, ends, seasonName, starts } = season;
                const totalFights = fightIds.length;
                return (
                    <Tr 
                        key={seasonId}
                        onClick={handleSeasonSelect}
                        _hover={{cursor: 'pointer'}}  
                        id={seasonId} 
                    >
                        <Td>{seasonName}</Td>
                        <Td>{new Date(starts).toString().slice(4,15)}</Td>
                        <Td>{new Date(ends).toString().slice(4,15)}</Td>
                        <Td>{totalFights}</Td>
                    </Tr>
                )
            })}
          </Tbody>
        </Table>
      </>  
    )
  }