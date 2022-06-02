import * as React from 'react'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Member, members } from '../../chakra'

export const About = () => (
  <Box as="section">
    <Box
      mx="auto"
      maxW={{ base: 'xl', md: '7xl' }}
      px={{ base: '6', md: '8' }}
      py={{ base: '12', md: '20' }}
    >
      <Box textAlign="center">
        <Heading size="3xl" letterSpacing="wide" mb="5" fontWeight="bold">
          About the team
        </Heading>
        <Text fontSize="xl" maxW="2xl" mx="auto">
          FightCloud is dedicated to bringing boxing fans the most relevant boxing information to them in real time. This is the team.
        </Text>
      </Box>
      <SimpleGrid mt="20" columns={{ base: 1, md: 2, lg: 3 }} spacingX="6" spacingY="16">
        {members.map((member, idx) => (
          <Member
            key={idx}
            role={member.role}
            image={member.image}
            name={member.name}
            twitter="#"
            linkedIn="#"
          >
            {member.description}
          </Member>
        ))}
      </SimpleGrid>
    </Box>
  </Box>
)

export default About