import { 
    Flex, 
    Select,
    Table, 
    TableCaption, 
    Tbody, 
    Td, 
    Th, 
    Thead, 
    Tr, 
    useColorModeValue as mode 
  } from '@chakra-ui/react'
  import { DeleteIcon } from '@chakra-ui/icons'
import { Status } from '../../stores'
  
  export const SeasonsTable = ({ 
    allSeasonsSummaries,
    handleDeleteSeason,
    handleSeasonSelect,
    selectedSeasonId
  }) => {
    return (
      <Flex 
        flexDir="column" 
        maxH="20rem" 
        mx="auto" 
        mb="4"
        w="100%"
        overflow="scroll"
      >
        <TableActions />
        <SeasonsTableContent 
            allSeasonsSummaries={allSeasonsSummaries}
            handleDeleteSeason={handleDeleteSeason}
            handleSeasonSelect={handleSeasonSelect}
            selectedSeasonId={selectedSeasonId}
        />
      </Flex>
    )
  }


export const TableActions = () => {
    const options = [
      { 
          label: 'Active',
          value: Status.ACTIVE,
      },
      { 
          label: 'Pending',
          value: Status.PENDING,
      },
      { 
          label: 'Complete',
          value: Status.COMPLETE,
      },
      { 
          label: 'Testing',
          value: Status.TESTING,
      },
    ];
    return (
      <Flex 
        direction={{base: 'column', md: 'row'}} 
        justify="space-between"
      >
          <Select  
              m={["2"]}
              maxW={["80%", "35%"]}
              rounded="base" 
              size="sm" 
              placeholder="Season"
              _hover={ {cursor: 'pointer' }}
              _focus={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
              _active={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
          >
              {
              options && options.length > 0 && options.map( option => <option key={option.value} value={option.value} label={option.label} />)
              }
          </Select>
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
    {
        Header: 'Delete Season',
        accessor: ''
    },

  ];
  
  const SeasonsTableContent = ({ 
    allSeasonsSummaries, 
    handleDeleteSeason,
    handleSeasonSelect,
    selectedSeasonId
  }) => {
    
    const deleteSeason = e => {
        const { id } = e.currentTarget
        handleDeleteSeason(id);
    }

    return (
      <Table borderWidth="1px" fontSize="sm" overflowY="scroll">
        <TableCaption mt="0" placement="top">All Seasons</TableCaption> 
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
          {allSeasonsSummaries?.length > 0 && allSeasonsSummaries.map( (row, _i) => {
              const { season } = row;
              const { fightIds, seasonId, ends, seasonName, starts } = season;
              const totalFights = fightIds.length;

              return (
                  <Tr 
                    bg={selectedSeasonId === season.seasonId ? 'gray.700' : 'inherit'}
                    key={seasonId}
                    _hover={{cursor: 'pointer'}}  
                    id={seasonId} 
                  >
                      <Td textAlign="center" onClick={e => handleSeasonSelect(e, seasonId)}>{seasonName}</Td>
                      <Td textAlign="center" onClick={e => handleSeasonSelect(e, seasonId)}>{new Date(starts).toString().slice(4,15)}</Td>
                      <Td textAlign="center" onClick={e => handleSeasonSelect(e, seasonId)}>{new Date(ends).toString().slice(4,15)}</Td>
                      <Td textAlign="center" onClick={e => handleSeasonSelect(e, seasonId)}>{totalFights}</Td>
                      <Td 
                          _hover={{cursor: 'pointer'}} 
                          textAlign="center" 
                          onClick={deleteSeason} 
                          id={seasonId} 
                          zIndex={10000}
                      >
                          {<DeleteIcon />}
                      </Td>
                  </Tr>
              )
          })}
        </Tbody>
      </Table>
    )
  }
