import { 
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
  const { fontSize, mb, mx, mt, my, pendingInvites, px, py, label } = props;
  return (
    <Heading
      textAlign={['left', 'center']}
      fontSize={fontSize}
      mx={mx ? mx : ''}
      my={my ? my : ''}
      py={py ? py : ''}
      px={px ? px : ''}
      mt={mt ? mt : ''}
      mb={mb ? mb : "2"}
    >
      {label}
    </Heading>
  );
}


export const CreateGroupDividerWithText = props => {
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
      // fontFamily="Koulen"
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