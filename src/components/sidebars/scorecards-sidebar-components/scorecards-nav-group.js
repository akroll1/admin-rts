import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

export const ScorecardsNavGroup = (props) => {
  const { active, children, id, label, handleHideShow, setShow, show } = props
  
  const hideShow = e => {
    const { id } = e.currentTarget
    handleHideShow(id)
  }

  return (  
    <Flex
        w="100%"
        flexDir="column"
        justifyContent="center"
        alignItems="flex-start"
        onClick={hideShow}
        id={id}
        mb="1"
    >
        <Flex
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            borderRadius="3px"
            _hover={{
                color:'#fcfcfc',
                cursor: 'pointer',
                background: '#535353'
            }}
        >
            <Heading
                w="100%"
                pl="2"
                _hover={{ color:'#fcfcfc'}}
                fontSize="xl"
                color="#f0f0f0"
                as="h3" 
                size="md"
            >
                {label}
            </Heading>

            <Flex
                mr="4"
            >
                { active 
                    ? 
                        <TriangleDownIcon
                            transition="all 2.8s"
                            color="#cacaca" 
                        /> 
                    : 
                        <TriangleUpIcon 
                            color="#cacaca" 
                        /> 
                }
            </Flex>
        </Flex>    
      <Flex 
        w="100%"  
      >
        {children}
    </Flex>
    </Flex>
  )
}