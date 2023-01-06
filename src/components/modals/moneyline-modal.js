import { useEffect, useState } from 'react'
import { 
  Button, 
  Heading,
  Modal, 
  ModalBody,
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalOverlay
} from '@chakra-ui/react'
import { ScoringMoneylineTable } from '../tables'
import { ModalsEnum, useGlobalStore } from '../../stores'

export const MoneylineModal = ({
  props,
}) => {
  const {
    fight,
    fighters,
    modals,
    setModals,
  } = useGlobalStore()

  const closeModal = () => {
    setModals(ModalsEnum.MONEYLINE_MODAL, false)
  }
  
  const OverlayTwo = () => (
    <ModalOverlay
      bg='#cacaca'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )
  const [overlay, setOverlay] = useState(<OverlayTwo />)
  return (
    <Modal 
      size="sm"
      blockScrollOnMount={false} 
      isCentered 
      isOpen={modals[ModalsEnum.MONEYLINE_MODAL]} 
      onClose={closeModal}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <Heading
          textAlign="center"
        >
          Moneyline 
        </Heading>
        <ModalCloseButton 
          onClick={closeModal} 
          size="lg"  
        />
        <ModalBody>
          <ScoringMoneylineTable />
        </ModalBody>
        <ModalFooter 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
        >
          <Button 
            size="md"
            minW="50%" 
            onClick={closeModal} 
            colorScheme="solid"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

