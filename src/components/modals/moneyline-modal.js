import React, {useState} from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ScoringMoneylineTable } from '../tables'
import { CustomOverlay } from '../custom-overlay'
import { useScorecardStore } from '../../stores'
export const MoneylineModal = ({
  modals,
  props,
  setModals,
}) => {
  const [overlay, setOverlay] = useState(<CustomOverlay />)
  const {
    fight,
    fighters
  } = useScorecardStore()
  return (
    <Modal 
      size="lg"
      blockScrollOnMount={false} 
      isCentered 
      isOpen={modals.moneylineModal} 
      motionPreset="slideInBottom"
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader textAlign="center">FightSync Props</ModalHeader>
        <ModalBody>
          <ScoringMoneylineTable 
            fighters={fighters} 
            props={props} 
            totalRounds={fight?.totalRounds}
          />
        </ModalBody>
        <ModalFooter 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
        >
          <Button 
            minW="40%" 
            onClick={() => setModals(modals => ({ ...modals, moneylineModal: false}))} 
            colorScheme="solid"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

