import React from 'react'
import { chakra } from '@chakra-ui/react'

export const LoginBannerLink = (props) => {
  const loginUrl = process.env.REACT_APP_COGNITO_SIGNIN_URL_SCORING_PROD;
  return (
    <chakra.a
      {...props}
      href={loginUrl}
      px="4"
      py="1.5"
      textAlign="center"
      borderWidth="1px"
      borderColor="whiteAlpha.400"
      fontWeight="medium"
      rounded="base"
      _hover={{
        bg: 'whiteAlpha.200',
        cursor: 'pointer'
      }}
    />
  )
}