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
  
  export const DistancesTable = ({ 
    distancesByStatus,
    handleDeleteDistance,
    handleDistanceSelect,
    handleStatusSelect,
    selectedDistanceId,
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
        <TableActions
          handleStatusSelect={handleStatusSelect}
        />
        <DistancesTableContent 
            distancesByStatus={distancesByStatus}
            handleDeleteDistance={handleDeleteDistance}
            handleDistanceSelect={handleDistanceSelect}
            selectedDistanceId={selectedDistanceId}
        />
      </Flex>
    )
  }


export const TableActions = ({
  handleStatusSelect
}) => {
  const distanceStatusLabels = Object.keys(Status).map( status => status);

    return (
      <Flex 
        direction={{base: 'column', md: 'row'}} 
        justify="space-between"
      >
        <Select  
          onChange={handleStatusSelect}
          m={["2"]}
          maxW={["80%", "35%"]}
          rounded="base" 
          size="sm" 
          placeholder="Status"
          defaultValue={Status.PENDING}
          _hover={ {cursor: 'pointer' }}
          _focus={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
          _active={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
        >
            { distanceStatusLabels?.length > 0 && distanceStatusLabels.map( status => (
              <option 
                id={status}
                key={status}
                value={status}
                label={status}
              />
            ))}
        </Select>
      </Flex>
    )
  }
   
  const columns = [
    {
        Header: 'Distance Name',
        accessor: 'distanceName',
    },
    {
      Header: 'Status',
      accessor: 'status',
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
        Header: 'Total Shows',
        accessor: ''
    },
    {
        Header: 'Delete Distance',
        accessor: ''
    },

  ];
  
  const DistancesTableContent = ({ 
    distancesByStatus,
    handleDeleteDistance,
    handleDistanceSelect,
    selectedDistanceId,
  }) => {
    
    const deleteDistance = e => {
        const { id } = e.currentTarget
        handleDeleteDistance(id);
    }

    return (
      <Table borderWidth="1px" fontSize="sm" overflowY="scroll">
        <TableCaption mt="0" placement="top">Status here</TableCaption> 
        <Thead bg={mode('gray.50', 'gray.800')}>
          <Tr>
            {columns.map((column, _i) => (
              <Th 
                  whiteSpace="nowrap" 
                  scope="col" 
                  key={_i}
                  textAlign="center"
              >
                {column.Header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {distancesByStatus?.length > 0 && distancesByStatus.map( (distance, _i) => {
            // console.log('distance: ', distance)
              const { showsSummaries, distanceId, distanceName, status, starts, ends } = distance;
              const totalShows = showsSummaries?.length > 0 ? showsSummaries.length : 0;

              return (
                  <Tr 
                    bg={selectedDistanceId === distanceId ? 'gray.700' : 'inherit'}
                    key={distanceId}
                    _hover={{cursor: 'pointer'}}  
                    id={distanceId} 
                  >
                      <Td textAlign="center" onClick={e => handleDistanceSelect(e, distanceId)}>{distanceName}</Td>
                      <Td textAlign="center" onClick={e => handleDistanceSelect(e, distanceId)}>{status}</Td>
                      <Td textAlign="center" onClick={e => handleDistanceSelect(e, distanceId)}>{new Date(starts).toString().slice(4,15)}</Td>
                      <Td textAlign="center" onClick={e => handleDistanceSelect(e, distanceId)}>{new Date(ends).toString().slice(4,15)}</Td>
                      <Td textAlign="center" onClick={e => handleDistanceSelect(e, distanceId)}>{totalShows}</Td>
                      <Td 
                          _hover={{cursor: 'pointer'}} 
                          textAlign="center" 
                          onClick={deleteDistance} 
                          id={distanceId} 
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
