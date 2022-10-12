import {
    Badge,
    Flex,
    Heading,
    HStack,
    Icon,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import * as React from 'react'
import { FiArrowDownRight, FiArrowUpRight, FiMoreVertical } from 'react-icons/fi'
  
export const Stat = props => {
const { label, value, delta } = props
return (
    <Flex
        flexDirection="column"
        w="100%"
        flex="1 0 30%"
        px={['4']}
        py={['5']}
        bg="gray.700"
        borderRadius="lg"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        m="2"
    >
        <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" color="muted">
                {label}
            </Text>
            <Icon onClick={() => console.log('clicked')} _hover={{cursor: 'pointer'}} as={FiMoreVertical} boxSize="5" color="muted" />
        </Flex>
        <Flex my="1" justify="space-between">
            <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
                {value}
            </Heading>
            <Badge alignSelf="center" borderRadius="5px" variant="subtle" colorScheme={delta.isUpwardsTrend ? 'green' : 'red'}>
                <HStack spacing="1">
                <Icon as={delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight} />
                <Text>{delta.value}</Text>
                </HStack>
            </Badge>
        </Flex>
        </Flex>
    )
  }