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
  
export const Stat = (props) => {
const { label, value, delta } = props
return (
    <Flex
        flexDirection="column"
        w="100%"
        flex="1 0 30%"
        px={{base: '4', md: '6'}}
        py={{base: '5', md: '6'}}
        bg="gray.700"
        borderRadius="lg"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        m="2"
    >
        <Flex minH="3rem" justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" color="muted">
                {label}
            </Text>
            <Icon onClick={() => console.log('clicked')} _hover={{cursor: 'pointer'}} as={FiMoreVertical} boxSize="5" color="muted" />
        </Flex>
        <Flex justify="space-between">
            <Heading
                size={useBreakpointValue({
                base: 'sm',
                md: 'md',
                })}
            >
                {value}
            </Heading>
            <Badge variant="subtle" colorScheme={delta.isUpwardsTrend ? 'green' : 'red'}>
                <HStack spacing="1">
                <Icon as={delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight} />
                <Text>{delta.value}</Text>
                </HStack>
            </Badge>
        </Flex>
        </Flex>
    )
  }