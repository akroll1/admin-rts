import { useState, useEffect } from 'react'
import { Button, ButtonGroup, Flex, Heading, Icon, ListItem, Text, OrderedList } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { capFirstLetters, PANELIST_PREDICTIONS_OPTIONS } from '../../utils'
import { MyPanelsFormTable } from '../tables'
import { useGlobalStore } from '../../stores'
import { FighterSelection } from './my-panels-form-els'

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
    user,
  } = useGlobalStore()

  const [selectedFighter, setSelectedFighter] = useState('')
  const [summaries, setSummaries] = useState([])
  const [selectedSummary, setSelectedSummary] = useState({})
  const [predictionsList, setPredictionsList] = useState([]);
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
    if(selectedFighter.fighterId){
      const list = PANELIST_PREDICTIONS_OPTIONS.map( option => {
        return ({
          value: `${selectedFighter.fighterId},${option.value}`,
          label: `${capFirstLetters(selectedFighter.lastName)} ${option.label}`
        })
      })
      setPredictionsList(list)
    }
  },[selectedFighter])

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
      panelId: selectedSummary.panelId,
      panelistId: user.sub
    }
    // this needs to go to panelistPredictions and 
    // the available on the panelists own page.
    console.log('predictionObj: ', predictionObj)
    // submitPanelPredictions(predictionObj)
  }

  const handlePanelSelect = e => {
    const { id } = e.currentTarget;
    const [panel] = summaries.filter( summary => summary.panelId === id);
    setSelectedSummary(panel);
  }
  const handleFighterSelect = fighter => {
    setSelectedFighter(fighter)
  }
  
  const setPrediction = () => {
    if(!selectedFighter) return "Select Winner"
    if(selectedFighter.fighterId === "DRAW") return "Draw"
    return `${capFirstLetters(selectedFighter.lastName)}`
  }

  const fighters = selectedSummary?.fighters?.length > 0 ? selectedSummary?.fighters : [];
  // console.log('summaries: ', summaries)
  // console.log('selectedSummary: ', selectedSummary)
  return (
    <Flex 
      w="100%"
      id="my_panels_form" 
      boxSizing="border-box" 
      flexDir="column" 
      alignItems="center" 
      justifyContent="center"
    >
      <Flex 
        w="100%"
        as="section" 
        // w={["90%", "50%"]}
        m="auto"
        flexDir="column" 
        alignItems="center" 
        justifyContent="center"
      >
        <FighterSelection 
          handleFighterSelect={handleFighterSelect}
          fighters={fighters}
          selectedFighter={selectedFighter}
        />

        <Heading 
          as="h2" 
          mt="4"
          size={["sm", "md", "lg"]}
        >
          Prediction: {setPrediction()}
        </Heading>

          <OrderedList 
            overflow="scroll" 
            ml="0" 
            boxSizing="border-box" 
            w={["100%", "50%"]}
            listStyleType="none"
            minH="5rem"
          >
          
          { selectedFighter.fighterId !== 'DRAW' && predictionsList.length > 0 && predictionsList.map( (item, i) => {
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
        <MyPanelsFormTable 
          handlePanelSelect={handlePanelSelect} 
          summaries={summaries} 
        />
        <ButtonGroup m="4" p="4">
          <Button 
            onClick={handleSubmitPredictions} 
            type="button" 
            colorScheme="solid"
          >
            Submit My Predictions
          </Button>
          <Button 
            // onClick={() => setRerender(true)} 
            variant="outline"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
};