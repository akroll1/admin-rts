import React, {useState} from 'react'
import { Flex, Select, Icon, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { FaTrophy } from 'react-icons/fa'

const CustomOverlay = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='60%'
    backdropBlur='2px'
  />
)
export const PredictionModal = ({ prediction, setTogglePredictionModal, togglePredictionModal, groupScorecard, handleSubmitPrediction }) => {
  const [overlay, setOverlay] = React.useState(<CustomOverlay />)
  const [localPrediction, setLocalPrediction] = useState({
      fighter:'',
      result: ''
  });
  const { fighterA, fighterB, totalRounds } = groupScorecard;
  const rounds = new Array(totalRounds).fill(0);
  const getFighterOptionValue = e => {
      const { value } = e.currentTarget;
      setLocalPrediction({...localPrediction, fighter: value.toUpperCase()});
  }
  const getResultValue = e => {
      const { value } = e.currentTarget;
      setLocalPrediction({...localPrediction, result: value.toUpperCase()});
  }
  const handleLocalPredictionSubmit = () => {
    const { fighter, result } = localPrediction;
    if(!fighter || !result) return alert('Please select a value!');
    const predictionString = localPrediction.fighter +','+ localPrediction.result;
    handleSubmitPrediction(predictionString);
    setTogglePredictionModal(false)
  }

  return (
    <>
      <Modal blockScrollOnMount={false} isCentered isOpen={togglePredictionModal} motionPreset="slideInBottom">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader display="flex" flexDirection="row" textAlign="center" justifyContent="space-around">{<Icon as={FaTrophy} boxSize={6} />} Predict and Win! {<Icon as={FaTrophy} boxSize={6} />}</ModalHeader>
          <ModalBody>
            { !prediction && <p style={{color: 'gray',marginTop: '-1rem',textAlign: 'center', margin: '1rem'}}>You must make a prediction to continue.</p> }
              <form>
                  <Flex flexDirection="row" alignItems="center" justifyContent="center">
                      <Select _hover={{cursor: 'pointer'}} onChange={e => getFighterOptionValue(e)} m="1" placeholder="Select winner">
                          <option value={fighterA}>{fighterA.toUpperCase()}</option>
                          <option value={fighterB}>{fighterB.toUpperCase()}</option>
                      </Select>
                      <Select _hover={{cursor: 'pointer'}} onChange={e => getResultValue(e)} m="1" placeholder="Select Result">
                          <option value="UD">Unanimous Decision</option>
                          <option value="SD">Split Decision</option>
                          <option value="MD">Majority Decision</option>
                          <option value="MR">Majority Draw</option>
                          <option value="DQ">Disqualification</option>
                          {rounds.map( (round,i) => {
                              return <option key={i} value={'KO'+(i+1)}>KO{i+1}</option>
                          })}
                      </Select>
                  </Flex>
              </form>
          </ModalBody>
          <ModalFooter display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Button onClick={() => handleLocalPredictionSubmit()} colorScheme="blue" mr={3}>
              Save Prediction
            </Button>
            <Button variant="outline" disabled={!prediction} onClick={() => setTogglePredictionModal()} colorScheme="blue" mr={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

