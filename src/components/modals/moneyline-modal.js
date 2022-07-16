import React, {useState} from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ScoringMoneylineTable } from '../tables'

const CustomOverlay = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='60%'
    backdropBlur='2px'
  />
)
export const MoneylineModal = ({
    modals,
    setModals,
}) => {
  const [overlay, setOverlay] = React.useState(<CustomOverlay />)

  return (
    <Modal 
      blockScrollOnMount={false} 
      isCentered 
      isOpen={modals.moneylineModal} 
      motionPreset="slideInBottom"
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader textAlign="center">Scoring Props</ModalHeader>
        <ModalBody>
            <ScoringMoneylineTable />
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

