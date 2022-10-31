import { 
  Box, 
  Divider, 
  Flex, 
  Heading, 
  Text, 
  useColorModeValue 
} from '@chakra-ui/react'

export const DividerWithText = props => {
  const { centered, fontSize, text, m, mb, mt, my, p } = props;
  return (
    <Flex 
      align="center" 
      color="gray.300" 
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
        color={useColorModeValue('gray.600', 'whiteAlpha.900')} 
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
  const { fontSize, mx, my, px, py, label } = props;
  return (
    <Heading
      textAlign={['left', 'center']}
      fontSize={fontSize}
      mx={mx ? mx : ''}
      my={my ? my : ''}
      py={py ? py : ''}
      px={px ? px : ''}
    >
      {label}
    </Heading>
  );
}