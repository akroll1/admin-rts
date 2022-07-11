import React, {useState} from 'react'
import { Flex, Select, Icon, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { FaTrophy } from 'react-icons/fa'
import { capFirstLetters } from '../../utils'

const CustomOverlay = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='60%'
    backdropBlur='2px'
  />
)
export const PredictionModal = ({ 
    rounds,
    setPredictionModal, 
    predictionModal,
    fighterData,
    handleSubmitPrediction 
}) => {
  const [overlay, setOverlay] = React.useState(<CustomOverlay />)
  const [localPrediction, setLocalPrediction] = useState({
      fighter:'',
      result: ''
  });

  const totalRounds = new Array(rounds).fill(0);
  const getFighter = e => {
      const { id, value } = e.currentTarget;
      console.log('')
      setLocalPrediction({ ...localPrediction, fighter: value });
  }
  const getResult = e => {
      const { value } = e.currentTarget;
      setLocalPrediction({...localPrediction, result: value});
  }
  const handleLocalPredictionSubmit = () => {
    const { fighter, result } = localPrediction;
    if(!fighter || !result) return alert('Please select a value!');
    const predictionString = localPrediction.fighter +','+ localPrediction.result;
    handleSubmitPrediction(predictionString);
    setPredictionModal(false)
  }

  return (
    <Modal 
      blockScrollOnMount={false} 
      isCentered 
      isOpen={predictionModal} 
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
                <Select _hover={{cursor: 'pointer'}} onChange={e => getFighter(e)} m="1" placeholder="Select winner">
                  { fighterData.map( fighter => {
                      const { fighterId, firstName, lastName, ringname } = fighter;
                      return (
                        <option key={fighterId} id={fighterId} value={fighterId}>{`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`}</option>
                      )
                      })
                    }
                </Select>
                <Select _hover={{cursor: 'pointer'}} onChange={e => getResult(e)} m="1" placeholder="Select Result">
                    <option value="UD">Unanimous Decision</option>
                    <option value="SD">Split Decision</option>
                    <option value="MD">Majority Decision</option>
                    <option value="DR">Draw</option>
                    <option value="MR">Majority Draw</option>
                    <option value="DQ">Disqualification</option>
                    {totalRounds.map( (round,i) => {
                        return <option key={i} value={'KO'+(i+1)}>KO{i+1}</option>
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
          <Button onClick={() => handleLocalPredictionSubmit()} colorScheme="blue" mr={3}>
            Save Prediction
          </Button>
          <Button variant="outline" onClick={() => setPredictionModal(false)} colorScheme="blue" mr={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

