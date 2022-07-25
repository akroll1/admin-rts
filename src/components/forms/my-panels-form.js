import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Flex, Heading, Icon, ListItem, Text, OrderedList, useToast } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { capFirstLetters } from '../../utils'
import { MyPanelsFormTable } from '../tables'
import { MyPanelsRadioButtons } from './my-panels-form-els'
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
  const [panels, setPanels] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState({
    rounds: []
  });
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  
  useEffect(() => {
    const getAllPanels = async () => {
      const url = process.env.REACT_APP_PANELS;
      return axios.get(url, tokenConfig)
        .then( res => {
          console.log('res: ', res)
          setPanels(res.data)
          setSelectedPanel(res.data[0])
        }).catch( err => console.log(err));
    }
    getAllPanels();
  },[]);

  const onDragStart = e => {
    const initialPosition = Number(e.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: panels
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
      setPanels(newList)
    }
  }
  const onDrop = e => {
    setPanels(dragAndDrop.updatedOrder);
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
      panels,
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
  const handlePanelSelect = e => {
    const { id } = e.currentTarget;
    const [panel] = panels.filter( panel => panel.panelId === id);
    setSelectedPanel(panel);
    console.log('panel: ', panel)

    
  }
  const officialListStyles = { fontWeight: 'bold', color: '#e80000'};

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
        w="50%"
        m="auto"
        flexDir="column" 
        alignItems="center" 
        justifyContent="center"
      >

        <MyPanelsFormTable handlePanelSelect={handlePanelSelect} panels={panels} />

        <Heading as="h2" size="sm">Who Wins?</Heading>

        <MyPanelsRadioButtons selectedPanel={selectedPanel} />

        <Heading as="h2" size="sm">How?</Heading>
        <OrderedList 
          overflow="scroll" 
          h="30rem" 
          ml="0" 
          boxSizing="border-box" 
          w="100%" 
          listStyleType="none"
        >
          Must create an array of 12 ELEMENTS, not the number 12, idiot.
          
          { selectedPanel?.map( (item, i) => {
            console.log('item: ', item)
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
                    <Text as="p">{i+1}</Text>
                  </Flex>
                  <Icon mr="0" as={DragHandleIcon} />
                </Flex>
              </ListItem>
          )})}
        </OrderedList>
        <ButtonGroup mb="1rem">
          <Button onClick={submitMyList} type="button" colorScheme="blue">
            Submit My List
          </Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
};