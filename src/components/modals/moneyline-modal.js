import React, {useState} from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ScoringMoneylineTable } from '../tables'
import { CustomOverlay } from '../custom-overlay'

export const MoneylineModal = ({
  fighterData,
  modals,
  props,
  setModals,
  totalRounds
}) => {
  const [overlay, setOverlay] = useState(<CustomOverlay />)
  
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
        <ModalHeader textAlign="center">The FightSync Props</ModalHeader>
        <ModalBody>
          <ScoringMoneylineTable 
            fighterData={fighterData} 
            props={props} 
            totalRounds={totalRounds}
          />
        </ModalBody>
        <ModalFooter 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
        >
          <Button minW="40%" onClick={() => setModals(modals => ({ ...modals, moneylineModal: false}))} colorScheme="blue">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

