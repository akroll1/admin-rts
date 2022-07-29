import React, {useState} from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ScoringMoneylineTable } from '../tables'
import { CustomOverlay } from '../custom-overlay'

export const MoneylineModal = ({
  fighterData,
  modals,
  props,
  setModals,
}) => {
  const [overlay, setOverlay] = useState(<CustomOverlay />)
  console.log('props: ', props)
  console.log('fighterData: ', fighterData)
  const mapPropsToFighter = () => {
    const [fighter1, fighter2] = fighterData;
    const mapped = props.map( prop => {
      if(prop[fighter1.fighterId]){
        console.log('prop: ', prop);

      } else {
        console.log('else')
      }
      return prop;
    })
  }
  const test = props?.length > 0 ? mapPropsToFighter : '';
  console.log('test: ', test())
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

