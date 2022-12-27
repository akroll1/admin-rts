import { useState } from 'react'
import { 
  Button, 
  Flex, 
  Icon, 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,
  Select, 
} from '@chakra-ui/react'
import { FaTrophy } from 'react-icons/fa'
import { capFirstLetters } from '../../utils'
import { useGlobalStore } from '../../stores'

export const PredictionModal = () => {
  const [form, setForm] = useState({
    fighter:'',
    result: ''
  });
  
  const {
    activeGroupScorecard,
    modals,
    patchPrediction,
    setModals,
  } = useGlobalStore();

  const totalRounds = activeGroupScorecard?.fight?.rounds ? new Array(activeGroupScorecard?.fight?.rounds).fill(0) : new Array().fill(12);

  const handleSubmitPrediction = () => {
    if(!form.fighter || !form.result) return setModals('predictionModal', false)
    const predictionString = `${form.fighter},${form.result}`
    patchPrediction(predictionString)
    setModals('predictionModal', false)
  }

  return (
    <Modal 
      blockScrollOnMount={false} 
      isCentered 
      size="lg"
      isOpen={modals.predictionModal} 
      onClose={() => setModals('predictionModal', false)}
      motionPreset="slideInBottom"
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader 
          display="flex" 
          flexDirection="row" 
          textAlign="center" 
          justifyContent="space-around"
        >
          {<Icon as={FaTrophy} boxSize={6} />} Predict and Win! {<Icon as={FaTrophy} boxSize={6} />}
        </ModalHeader>
        <ModalBody>
            <form>
              <Flex 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="center"
              >
                <Select 
                  // _hover={{cursor: 'pointer'}} 
                  // _focus={{border: 'brand.100'}}
                  onChange={e => setForm({ ...form, fighter: e.currentTarget.value })} 
                  m="1" 
                  placeholder="Select winner"
                >
                  { activeGroupScorecard?.fighters?.length > 0 && activeGroupScorecard.fighters.map( fighter => {
                    const { fighterId, firstName, lastName, ringname } = fighter;
                    return (
                      <option key={fighterId} id={fighterId} value={fighterId}>{`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`}</option>
                    )
                    })
                  }
                </Select>
                <Select 
                  // _hover={{cursor: 'pointer'}} 
                  // _focus={{border: 'brand.100'}}
                  onChange={e => setForm({ ...form, result: e.currentTarget.value })} 
                  m="1" 
                  placeholder="Select Result"
                >
                    <option value="DC">Decision</option>
                    {totalRounds.map( (round, _i) => {
                        return <option key={_i} value={'KO'+(_i+1)}>KO{_i+1}</option>
                    })}
                </Select>
              </Flex>
            </form>
        </ModalBody>
        <ModalFooter 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
        >
          <Button 
            onClick={handleSubmitPrediction} 
            colorScheme="solid" 
            size="md"
            mr={3}
          >
            Save Prediction
          </Button>
          <Button 
            size="md"
            variant="outline"   
            onClick={() => setModals({ ...modals, predictionModal: false})} 
            colorScheme="outline"
            mr={3}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

