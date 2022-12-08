import { 
  Alert,
  AlertIcon,
  Box, 
  Divider, 
  Flex, 
  Heading, 
  Text,
} from '@chakra-ui/react'

export const DividerWithText = props => {
  const { centered, color, fontSize, text, m, mb, mt, my, p } = props;
  return (
    <Flex 
      align="center" 
      w="100%"
      // pl={p ? p : "6"} 
      m={my ? my : "auto"}
      my={my ? my : "2"} 
      mt={mt ? mt : "2"} 
      mb={mb ? mb : "2"} 
      fontFamily="Koulen"
      fontSize={fontSize ? fontSize : 'inherit'}
      >
      {centered && 
        <Box flex="1">
          <Divider borderColor="currentcolor" />
        </Box> 
      }
      <Text 
        as="span" 
        px="3" 
        color={color ? color : "gray.300"}
        // color={useColorModeValue('gray.600', 'whiteAlpha.900')} 
        fontWeight="medium"
      >
        {text}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  );
}

export const SidebarsDividerWithText = props => {
  const { fontSize, mx, my, pendingInvites, px, py, label } = props;
  return (
    <Heading
      textAlign={['left', 'center']}
      fontSize={fontSize}
      mx={mx ? mx : ''}
      my={my ? my : ''}
      py={py ? py : ''}
      px={px ? px : ''}
      mb="2"
    >
      {label}
    </Heading>
  );
}

export const InvitationsHeader = ({ 
  fontSize,
  pendingInvites
}) => {
  return (
    <Flex 
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      p="2"
    >
      <Heading
        fontSize={fontSize}
      >
        Invitations
      </Heading>
      { pendingInvites && 
        <Alert 
          p="1"
          status="error"
          bg="transparent"
          m="auto"
        >
          <AlertIcon w="3" p="0" mt="-2" ml="-1" />
        </Alert>
      }
    </Flex>
  )
}