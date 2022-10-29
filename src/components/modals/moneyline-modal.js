import { 
  Button, 
  Modal, 
  ModalBody,
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay
} from '@chakra-ui/react'
import { ScoringMoneylineTable } from '../tables'
import { useScorecardStore } from '../../stores'

export const MoneylineModal = ({
  props,
}) => {
  const {
    fight,
    fighters,
    modals,
    setModals,
  } = useScorecardStore()

  const closeModal = () => {
    setModals('moneylineModal', false)
  }
  return (
    <Modal 
      size="lg"
      blockScrollOnMount={false} 
      isCentered 
      isOpen={modals.moneylineModal} 
      onClose={closeModal}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">FightSync Props</ModalHeader>
        <ModalCloseButton onClick={closeModal} />
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
            size="md"
            minW="40%" 
            onClick={() => setModals('moneylineModal', false)} 
            colorScheme="solid"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

