import React from 'react'
import {
    Box,
    Circle,
    createIcon,
    Flex,
    HStack,
    Icon,
    Stack,
    useId,
    useRadio,
    useRadioGroup,
    useStyleConfig,
  } from '@chakra-ui/react'
  
  export const MyPanelsRadioCardGroup = props => {
    const { children, name, defaultValue, value, onChange, ...rest } = props
    const { getRootProps, getRadioProps } = useRadioGroup({
      name,
      defaultValue,
      value,
      onChange
    })
    const cards = React.useMemo(
      () =>
        React.Children.toArray(children)
          .filter(React.isValidElement)
          .map((card) => {
            return React.cloneElement(card, {
              radioProps: getRadioProps({
                value: card.props.value,
              }),
            })
          }),
      [children, getRadioProps],
    )
    return <HStack {...getRootProps(rest)}>{cards}</HStack>
  }
  export const RadioCard = (props) => {
    const { fighterId, setWinner, radioProps, children, ...rest } = props
    const { getInputProps, getCheckboxProps, getLabelProps, state } = useRadio(radioProps)
    const id = useId(undefined, 'radio-button')
    const styles = useStyleConfig('RadioCard', props)
    const inputProps = getInputProps()
    const checkboxProps = getCheckboxProps()
    const labelProps = getLabelProps();
    const handleWinnerSelected = e => {
      const { id } = e.currentTarget;
      setWinner(id);
    }
      return (
      <Flex
        id={fighterId}
        onClick={handleWinnerSelected}
        p="1"
        border={state.isChecked ? "1px solid #4299E1" : 'none'} 
        borderRadius="5px"
        alignItems="center"
        justifyContent="space-evenly"
        flex="1 0 50%"
        as="label"
        cursor="pointer"
        {...labelProps}
        sx={{'.focus-visible + [data-focus]': {boxShadow: 'outline', zIndex: 1 }}}
      >
        <input {...inputProps} aria-labelledby={id} />
        {/* <Box sx={styles} {...checkboxProps} {...rest}> */}
          <HStack direction="row" w="100%">
            <Flex 
              w="100%"
              style={state.isChecked ? { background: 'whiteAlpha.100', border: '1px solid whiteAlpha.700' } : null }
              p="4"
              borderRadius="5px"
              alignItems="center" 
              justifyContent="space-evenly" 
              minH="3rem" 
              flex="1"
            >
              {children}
            </Flex>
            {state.isChecked ? (
              <Circle bg="accent" size="4">
                <Icon as={CheckIcon} boxSize="2.5" color="inverted" />
              </Circle>
            ) : (
              <Circle borderWidth="2px" size="4" />
            )}
          </HStack>
        {/* </Box> */}
      </Flex>
    )
  }
  export const CheckIcon = createIcon({
    displayName: 'CheckIcon',
    viewBox: '0 0 12 10',
    path: (
      <polyline
        fill="none"
        strokeWidth="2px"
        stroke="currentColor"
        strokeDasharray="16px"
        points="1.5 6 4.5 9 10.5 1"
      />
    ),
  })