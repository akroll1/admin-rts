import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Flex, Heading, Icon, ListItem, Text, OrderedList, useToast } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { capFirstLetters, PANELIST_PREDICTIONS_OPTIONS } from '../../utils'
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
  const [listWinner, setListWinner] = useState('');
  const [predictionsList, setPredictionsList] = useState([]);
  const [winner, setWinner] = useState('');
  const [panels, setPanels] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState({
    rounds: []
  });
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  
  useEffect(() => {
    setPredictionsList(PANELIST_PREDICTIONS_OPTIONS)
  },[PANELIST_PREDICTIONS_OPTIONS])

  useEffect(() => {
    const getAllPanels = async () => {
      const url = process.env.REACT_APP_PANELIST_PREDICTIONS + `/panelist/${user.sub}`;
      return axios.get(url, tokenConfig)
        .then( res => {
          // console.log('res: ', res)
          setPanels(res.data)
          setSelectedPanel(res.data.length > 0 ? res.data[0] : {})
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
      originalOrder: predictionsList
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
      setPredictionsList(newList)
    }
  }
  const onDrop = e => {
    setPredictionsList(dragAndDrop.updatedOrder);
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
  const submitMyPredictions = () => {
    if(!winner) return alert('Please select the winner.')

    const predictionsListValues = predictionsList.map( prediction => prediction.value);
    const userPredictionsObj = {
      panelId: selectedPanel.fightId,
      predictions: predictionsListValues,
      panelistId: `${user.sub}`,
      winner
    }
    const url = process.env.REACT_APP_PANELIST_PREDICTIONS + `/${selectedPanel.fightId}`;
    console.log('userPredictionsObj: ', userPredictionsObj);

    return axios.put(url, userPredictionsObj, tokenConfig)
      .then(res => {
        if(res.status === 200){
          // uncomment out when done testing.
          // setWinner('');
          toast({ 
            title: 'Submitted!',
            status: 'success',
            duration: 5000,
            isClosable: true
          })
      }})
      .catch(err => console.log(err))
  }
  const handlePanelSelect = e => {
    const { id } = e.currentTarget;
    const [panel] = panels.filter( panel => panel.fightId === id);
    setSelectedPanel(panel);
    setListWinner('')
  }
  // console.log('panels: ', panels)
  // console.log('predictionsList: ', predictionsList)
  console.log('winner: ', winner)
  console.log('selectedPanel: ', selectedPanel.fighters)
  console.log('listWinner: ', listWinner)
  useEffect(() => {
    if(winner.length > 0){
      const [selected] = selectedPanel.fighters.filter( ({ fighterId }) => fighterId === winner);
      setListWinner(selected?.lastName)
    }
  },[winner]);

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

        <MyPanelsRadioButtons setWinner={setWinner} selectedPanel={selectedPanel} />

        { winner && listWinner && 
          <>
            <Heading as="h2" size="sm">How?</Heading>
            <OrderedList 
              overflow="scroll" 
              ml="0" 
              boxSizing="border-box" 
              w="100%" 
              listStyleType="none"
            >
            
            { predictionsList.map( (item, i) => {
              // console.log('item: ',item)
              return (
                <ListItem
                  display="flex" 
                  alignItems="center" 
                  justifyContent="flex-start"
                  p="4"
                  m="2"
                  borderRadius="5px"
                  bg={"whiteAlpha.400"}
                  height='2.5rem'
                  w="100%"
                  key={i}
                  data-position={i}
                  draggable
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragLeave={onDragLeave}
                  _hover={{cursor: 'pointer'}}
                >
                  <Flex 
                    w="100%" 
                    flexDirection="row" 
                    alignItems="center" 
                    justifyContent="space-between"
                  >
                    <Flex 
                      display="inline-flex" 
                      flexDir="row" 
                      alignItems="center" 
                      justifyContent="space-between"
                    >
                      <Text color="#ff1a1a" as="p">{`${i+1}.`}</Text> 
                      <Text ml="8">{`${capFirstLetters(winner.length > 0 ? listWinner : '')} -- ${item.label}`}</Text>
                    </Flex>
                    <Icon mr="0" as={DragHandleIcon} />
                  </Flex>
                </ListItem>
            )})}
            </OrderedList>
          </>
        }
        <ButtonGroup m="4" p="4">
          <Button onClick={submitMyPredictions} type="button" colorScheme="blue">
            Submit My Predictions
          </Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
};