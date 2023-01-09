import { Box, Center, chakra, VisuallyHidden } from '@chakra-ui/react'

const Bar = chakra('span', {
  baseStyle: {
    color: "white",
    display: 'block',
    pos: 'absolute',
    w: '1.25rem',
    h: '0.125rem',
    rounded: 'full',
    bg: 'currentcolor',
    mx: 'auto',
    insetStart: '0.125rem',
    transition: 'all 0.12s',
  },
})

const ToggleIcon = (props) => {
  const { active } = props
  return (
    <Box
      bg="inherit"
      className="group"
      data-active={active ? '' : undefined}
      as="span"
      display="block"
      w="1.5rem"
      h="1.5rem"
      pos="relative"
      aria-hidden
      pointerEvents="none"
    >
      <Bar
        top="0.4375rem"
        _groupActive={{
          top: '0.6875rem',
          transform: 'rotate(45deg)',
        }}
      />
      <Bar
        bottom="0.4375rem"
        _groupActive={{
          bottom: '0.6875rem',
          transform: 'rotate(-45deg)',
        }}
      />
    </Box>
  )
}

export const ToggleButton = (props) => {
  const { isOpen, onToggle } = props
  return (
    <Center
      // marginStart="-6"
      px="2"
      py="4"
      // as="button"
      color="white"
      _active={{
        color: 'white',
      }}
      onClick={onToggle}
    >
      <ToggleIcon active={isOpen} />
      <VisuallyHidden>Toggle Menu</VisuallyHidden>
    </Center>
  )
}