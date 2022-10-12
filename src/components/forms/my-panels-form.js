import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Flex, Heading, Icon, ListItem, Text, OrderedList, useToast } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { capFirstLetters, PANELIST_PREDICTIONS_OPTIONS } from '../../utils'
import { MyPanelsFormTable } from '../tables'
import { MyPanelsRadioButtons } from './my-panels-form-els'
import { useScorecardStore } from '../../stores'

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}
export const MyPanelsForm = () => {
  const {
    fetchPanelSummaries,
    panelSummaries,
    submitPanelPredictions,
  } = useScorecardStore()

  const toast = useToast();  
  const [summaries, setSummaries] = useState([])
  const [selectedSummary, setSelectedSummary] = useState({})
  const [rerender, setRerender] = useState(false);
  const [predictionsList, setPredictionsList] = useState([]);
  const [winner, setWinner] = useState('');
  const [selectedPanel, setSelectedPanel] = useState({
    fighters: [],
    rounds: []
  });
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  useEffect(() => {
    fetchPanelSummaries()
  },[])

  useEffect(() => {
    if(panelSummaries.length > 0){
      setSummaries(panelSummaries)
      setSelectedSummary(panelSummaries[0])
    }
  },[panelSummaries])


  useEffect(() => {
    if(selectedSummary.fighters?.length === 2){
      const [fighter1, fighter2] = selectedSummary.fighters;
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
  }, [selectedSummary])


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

  const handleSubmitPredictions = () => {
    const predictionsListValues = predictionsList.length > 0 && predictionsList.map( prediction => prediction.value);
    const predictionObj = {
      panelistPredictions: predictionsListValues,
      panelId: selectedSummary.panelId
    }
    // console.log('predictionObj: ', predictionObj)
    submitPanelPredictions(predictionObj)
  }

  const handlePanelSelect = e => {
    const { id } = e.currentTarget;
    const [panel] = summaries.filter( summary => summary.panelId === id);
    setSelectedSummary(panel);
  }

  const [fighter1, fighter2] = selectedSummary?.fighters?.length === 2 ? selectedSummary.fighters : [];
  console.log('summaries: ', summaries)
  console.log('selectedSummary: ', selectedSummary)
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

        <MyPanelsFormTable 
          handlePanelSelect={handlePanelSelect} 
          summaries={summaries} 
        />

        <Heading 
          as="h2" 
          size={["sm", "md"]}
        >
          {`${fighter1?.lastName ? capFirstLetters(fighter1.lastName) : ''} vs ${fighter2?.lastName ? capFirstLetters(fighter2.lastName) : ''}`}
        </Heading>

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
          <Button 
            onClick={handleSubmitPredictions} 
            type="button" 
            colorScheme="solid"
          >
            Submit My Predictions
          </Button>
          <Button 
            onClick={() => setRerender(true)} 
            variant="outline"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
};