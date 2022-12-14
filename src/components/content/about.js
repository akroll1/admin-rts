import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Member, about_data } from '../../chakra'

export const About = () => (
  <Box as="section">
    <Box
      mx="auto"
      maxW={{ base: 'xl', md: '7xl' }}
      px={{ base: '6', md: '8' }}
      py={{ base: '12', md: '20' }}
    >
      <Box textAlign="center">
        <Heading size="3xl" letterSpacing="wide" mb="2" fontWeight="bold">
          About the team
        </Heading>
        <Text 
          fontSize={["xl", "2xl"]} 
          maxW="2xl" 
          mx="auto"
        >
          FightSync
        </Text>
        <Text 
          fontSize={["xl", "2xl"]} 
          maxW="2xl" 
          mx="auto"
        >
          The Official Platform of Fight Fans
        </Text>
      </Box>
      <SimpleGrid mt={["4","6"]} columns={{ base: 1, md: 2, lg: 3 }} spacingX="6" spacingY="12">
        {about_data.map((member, idx) => (
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