import React, {useState} from 'react'
import { Flex, Select, Icon, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

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
        <ModalHeader 
          display="flex" 
          flexDirection="row" 
          textAlign="center" 
          justifyContent="space-around"
        >
        </ModalHeader>
        <ModalBody>
            <p>Modal body</p>
        </ModalBody>
        <ModalFooter 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
        >
          <Button onClick={() => console.log('Save Prediction')} colorScheme="blue" mr={3}>
            Save Prediction
          </Button>
          <Button variant="outline" onClick={() => setModals(modals => ({ ...modals, moneylineModal: false}))} colorScheme="blue" mr={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

