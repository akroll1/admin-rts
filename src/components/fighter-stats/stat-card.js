import React from 'react'
import { Box, Flex, Heading, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { Indicator } from './indicator'

function format(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    currency,
  }).format(value)
}

export const StatCard = ({ selectedFighter, stat, label }) => {
    const { wins, losses, draws, kos, } = selectedFighter
    const statsObj = {
        totalfights: (wins, losses, draws) => {
            return (wins + losses + draws);
        },
        wins: (wins, losses, draws) => {
            return wins / (wins + losses + draws);
        },
        losses: (wins, losses, draws, kos) => {
            return losses / (wins + losses + draws);
        },
        draws: (wins, losses, draws) => {
            return draws / (wins + losses + draws);
        },
        kos: (wins, losses, draws) => {
            return kos / (wins + losses + draws);
        }
    }
    console.log('label: ',label)
    const value = statsObj[label](wins, losses, draws, kos);
    const isNegative = wins < 0
    return (
        <Flex m="3" direction="column" align="center" p="6" bg={mode('white', 'gray.700')} rounded="8px" shadow="base" color={mode('gray.500', 'gray.400')} textAlign="center">
            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
            {label}
            </Text>
            <Stack direction="row" alignItems="center" justifyContent="center" my="3">
            <Text fontWeight="bold" fontSize="2xl">
                {stat}
            </Text>
            <Text as="span" color={mode('gray.800', 'white')} fontSize="4xl" fontWeight="bold" lineHeight="1">
                {/* {format(value, 'USD')} */}{selectedFighter[stat]}
            </Text>
            </Stack>
            <Indicator type={Math.random() > 0.5 ? 'down' : 'up'} value={`${value.toFixed(2) * 100} %`} />
        </Flex>
    )
}