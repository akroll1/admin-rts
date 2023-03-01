import { 
  Box, 
  Stack, 
  StackDivider 
} from '@chakra-ui/react'
import { 
  Copyright, 
  SocialMediaLinks, 
  LinkGrid, 
  // SubscribeForm 
} from '../../chakra'

export const Footer = () => (
  <Box 
    display={["none", "none", "flex", "flex", "flex"]}
    boxSizing="border-box"
    as="footer" 
    role="contentinfo" 
    mx="auto" 
    maxW={["90%","100%"]} 
    mt="8"
    py={["0","0","0"]} 
    px={['4', '6', '4']}
    pb="20"
  >
    <Stack 
      spacing="6" 
      minW="100%" 
      divider={<StackDivider />}
    >
      <Stack 
        direction={['column', 'row']} 
        spacing={['10', '12']}
      >
        <Box flex="1">
        </Box>
        <Stack 
          direction={['column', 'row']} 
          spacing={['10', '15']}>
          <LinkGrid 
            spacing={['10', '20', '28']} 
            flex="1" 
          />
          {/* <SubscribeForm 
            width={['full', 'sm']} 
          /> */}
        </Stack>
      </Stack>
      <Stack
        direction={['column-reverse', 'row']}
        justifyContent="space-between"
        alignItems="center"
        mb="10"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Stack>
  </Box>
)
