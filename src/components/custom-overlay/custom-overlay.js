import React from 'react'
import { ModalOverlay } from '@chakra-ui/react'

export const CustomOverlay = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='60%'
      backdropBlur='2px'
    />
  )