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
  const [rerender, setRerender] = useState(false);
  const [predictionsList, setPredictionsList] = useState([]);
  const [winner, setWinner] = useState('');
  const [panels, setPanels] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState({
    fighters: [],
    rounds: []
  });
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  useEffect(() => {
    const getAllPanels = async () => {
      const url = process.env.REACT_APP_PANELS;
      return axios.get(url, tokenConfig)
        .then( res => {
          // console.log('res: ', res)
          setPanels(res.data)
          setSelectedPanel(res.data.length > 0 ? res.data[0] : {})
        }).catch( err => console.log(err));
    }
    getAllPanels();
  },[]);

  useEffect(() => {
    if(selectedPanel.fighters.length === 2 || rerender){
      const [fighter1, fighter2] = selectedPanel.fighters;
      const createPredictionsList = () => {
        return [fighter1, fighter2].map( fighter => {
          return PANELIST_PREDICTIONS_OPTIONS.map( option => {
            return ({
              value: `${fighter.fighterId},${option.value}`,
              label: `${capFirstLetters(fighter.lastName)} ${option.label}`
            })
          })
        })
      }
      const list = createPredictionsList();
      const reducedList = list.reduce( (acc, curr) => {
        if(Array.isArray(curr)) return acc.concat(...curr)
      },[])
      setPredictionsList(reducedList);
    }
    // return setPredictionsList(prev => [...prev, ...list])
  }, [selectedPanel.fighters, rerender])
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
    const predictionsListValues = predictionsList.length > 0 && predictionsList.map( prediction => prediction.value);
    const userPredictionsObj = {
      panelistPredictions: predictionsListValues,
      panelistId: `${user.sub}`,
    }
    const url = process.env.REACT_APP_PANELS + `/${selectedPanel.panelId}`;

//   const arr = [
//     [
//       "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,DC",
//       "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO13",
//       "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO46",
//       "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO79",
//       "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO10",
//       "5b3bbb72-71c2-4334-9972-1f82cb83bece,DC",
//       "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO13",
//       "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO46",
//       "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO79",
//       "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO10"
//   ],
//   [
//     "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO13",
//     "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO10",
//     "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO10",
//     "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO13",
//     "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO46",
//     "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,KO79",
//     "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO46",
//     "5b3bbb72-71c2-4334-9972-1f82cb83bece,KO79",
//     "0d31c804-45c7-4a12-b5bb-a4a91440b6d4,DC",
//     "5b3bbb72-71c2-4334-9972-1f82cb83bece,DC"
//   ]
// ];
  
    return axios.put(url, userPredictionsObj, tokenConfig)
      .then(res => {
        if(res.status === 200){
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
  }
  const [fighter1, fighter2] = selectedPanel.fighters.length === 2 ? selectedPanel.fighters : [];

  return (
    <Flex 
      id="my_panels_form" 
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

        <Heading as="h2" size={["sm", "md"]}>{`${fighter1?.lastName ? capFirstLetters(fighter1.lastName) : ''} vs ${fighter2?.lastName ? capFirstLetters(fighter2.lastName) : ''}`}</Heading>

          <OrderedList 
            overflow="scroll" 
            ml="0" 
            boxSizing="border-box" 
            w="100%" 
            listStyleType="none"
          >
          
          { predictionsList.map( (item, i) => {
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
                    <Text ml="8">{`${item.label}`}</Text>
                  </Flex>
                  <Icon mr="0" as={DragHandleIcon} />
                </Flex>
              </ListItem>
          )})}
          </OrderedList>
        <ButtonGroup m="4" p="4">
          <Button onClick={submitMyPredictions} type="button" colorScheme="blue">
            Submit My Predictions
          </Button>
          <Button onClick={() => setRerender(true)} variant="outline">Cancel</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
};