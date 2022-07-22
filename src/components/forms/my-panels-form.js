import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Flex, Heading, Icon, ListItem, Text, OrderedList, useToast } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { capFirstLetters } from '../../utils'
import { PanelMemberPredictionsTable } from '../tables'
import axios from 'axios'

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}
export const MyPanelsForm = ({ 
    tokenConfig, 
    user 
}) => {
  const toast = useToast();  
  const [allUserPanels, setAllUserPanels] = useState([]);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  
  useEffect(() => {
    const getAllMemberPanels = async () => {
      const url = process.env.REACT_APP_PANELS + `/${user.sub}`;
      return axios.get(url, tokenConfig)
        .then( res => setAllUserPanels(res.data))
        .catch( err => console.log(err));
    }
    getAllMemberPanels();
  },[]);

  const onDragStart = e => {
    const initialPosition = Number(e.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: allUserPanels
    });
    // Note: this is only for Firefox.
    e.dataTransfer.setData("text/html", '');
  }
  const onDragOver = e => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];
    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
      setAllUserPanels(newList)
    }
  }
  const onDrop = e => {
    setAllUserPanels(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });
  }
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    });
  }

  const submitMyList = () => {
    const votedList = {
      allUserPanels,
      updatedAt: new Date(),
      owner: `${user.sub}`
    }
    const url = process.env.REACT_APP_PANELS + `/${user.sub}`;
    return axios.put(url, votedList, tokenConfig)
      .then(res => {
        if(res.status === 200){
          toast({ title: 'Submitted!',
              status: 'success',
              duration: 5000,
              isClosable: true,})
      }})
      .catch(err => console.log(err))
  }

  const officialListStyles = { fontWeight: 'bold', color: '#e80000'};
  const myListStyles = { };

  return (
    <Flex 
      id="panels_form" 
      boxSizing="border-box" 
      flexDir="column" 
      alignItems="center" 
      justifyContent="center"
    >
      <Heading 
        as="h2" 
        size="lg"
        p="4" 
        m="1"
      >
        Panel Member Predictions
      </Heading>
      <Flex 
        as="section" 
        flex="1 0 40%" 
        flexDir="column" 
        alignItems="center" 
        justifyContent="center"
      >

        <PanelMemberPredictionsTable />




        <ButtonGroup mb="1rem">
          <Button onClick={submitMyList} type="button" colorScheme="blue">
            Submit My List
          </Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>

        <OrderedList overflow="scroll" h="30rem" ml="0" boxSizing="border-box" w="100%" listStyleType="none">
          { allUserPanels?.length > 0 && allUserPanels.map((item, i) => {
            // console.log('item: ',item)
            if(!item) return;
            return (
              <ListItem
              display="flex" 
              alignItems="center" 
              justifyContent="flex-start"
              p="4"
              m="2"
              borderRadius="5px"
              bg={i > 4 ? "whiteAlpha.200" : "whiteAlpha.400"}
              height='2.5rem'
              w="100%"
              key={i}
              data-position={i}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              _hover={{ cursor: 'pointer' }}
              >
                <Flex w="100%" flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Flex>
                    <Text as="p" style={i > 4 ? myListStyles : officialListStyles}>{i + 1} </Text><Text ml="2" textAlign="left">{capFirstLetters(item.firstName)} {capFirstLetters(item.lastName)} </Text>
                  </Flex>
                  <Icon mr="0" as={DragHandleIcon} />
                </Flex>
              </ListItem>
          )})}
        </OrderedList>
      </Flex>
    </Flex>
  )
};