import React from 'react'
import { Box, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode, IconButton } from '@chakra-ui/react'
import { DeleteIcon, CheckCircleIcon } from '@chakra-ui/icons'

export const DiscussionsFormTable = ({ allDiscussions, deleteDiscussion, selectDiscussion }) => {
  return (
    <Box 
      w="100%" 
      mx="auto" 
      px={{ base: '6', md: '8' }}
    >
      <DiscussionsFormTableContent 
        allDiscussions={allDiscussions} 
        deleteDiscussion={deleteDiscussion} 
        selectDiscussion={selectDiscussion} 
      />
    </Box>
  )
}
 
const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}
const columns = [
  {
      Header: 'Discussion Title',
      accessor: 'discussionTitle',
  },
  {
      Header: 'Delete',
      accessor: ''
  }
];

const DiscussionsFormTableContent = ({ 
    allDiscussions, 
    deleteDiscussion, 
    selectDiscussion 
}) => {
  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        { allDiscussions.length > 0 && allDiscussions.map( (discussion, i) => {
          const { discussionId, title } = discussion;
            return (
              <Tr style={{textAlign: 'center', cursor: 'pointer'}} key={i}>
                <Td p="2" id={discussionId} onClick={e => selectDiscussion(e)}>{title}</Td>
                <Td style={{textAlign: 'center'}} p="2"><IconButton id={discussionId} onClick={e => deleteDiscussion(e)} style={{background: 'transparent'}} icon={<DeleteIcon />} /></Td>
              </Tr>
            )
          })}
      </Tbody>
    </Table>
  )
}