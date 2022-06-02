import React from 'react'
import { Box, Button, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal } from '@chakra-ui/react'

const PredictionPopover = () => {

    const initRef = React.useRef()
    return (
      <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Button>Click to {isOpen ? 'close' : 'open'}</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverHeader>This is the header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Box>
                    Make a fight prediction and score points in your group and others on FightSync!
                  </Box>
                  <Button
                    mt={4}
                    colorScheme='blue'
                    onClick={onClose}
                    ref={initRef}
                  >
                    Make A Prediction
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    )
  }