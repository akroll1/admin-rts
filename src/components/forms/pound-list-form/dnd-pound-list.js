import { useState } from 'react';
import { 
    Flex, 
    Icon, 
    ListItem, 
    Text, 
    UnorderedList, 
} from '@chakra-ui/react'
import { capFirstLetters } from '../../../stores'
import { DragHandleIcon } from '@chakra-ui/icons'

const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
}

export const DNDPoundList = ({
    officialList,
    setOfficialList,    
}) => {

    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

    const onDragStart = e => {
        const initialPosition = Number(e.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: officialList
        });
        // Note: this is only for Firefox.
        e.dataTransfer.setData("text/html", '');
    }
    const onDragOver = e => {
        e.preventDefault();
        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom;
        const draggedTo = Number(e.currentTarget.dataset.position);
        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);
        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];
        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo
            })
            setOfficialList(newList)
        }
    }     
    const onDrop = e => {
        setOfficialList(dragAndDrop.updatedOrder);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    }
    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });
    }

    return (
        <Flex
            w="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p="4"
            m="4"
            borderRadius="5px"
            bg="whiteAlpha.100"
        >
            <UnorderedList 
                ml="0" 
                boxSizing="border-box" 
                w="100%" 
                listStyleType="none"
            >
                { officialList?.length > 0 && officialList.map((fighter, _i) => (
                    <ListItem
                        id={fighter.id}
                        display="flex" 
                        alignItems="center" 
                        justifyContent="flex-start"
                        p="4"
                        m="2"
                        ml="0"
                        borderRadius="5px"
                        bg={_i > 9 ? "whiteAlpha.200" : "whiteAlpha.400"}
                        height='2.5rem'

                        key={fighter.id}
                        data-position={_i}
                        draggable
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onDragLeave={onDragLeave}
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Flex 
                            w="100%" 
                            flexDirection="row" 
                            alignItems="center" 
                            justifyContent="space-between"
                        >
                            <Flex
                                w="100%" 
                                flexDirection="row" 
                                alignItems="baseline" 
                                justifyContent="flex-start"
                            >
                                <Icon as={DragHandleIcon} mr="2" color="gray.300" />
                                <Text 
                                    as="p"
                                    ml={_i > 8 ? "1" : "2"}
                                    color="gray.300"
                                >
                                {_i + 1}. 
                                <Text 
                                    ml="2"
                                    textAlign="left"
                                    as="span"
                                    color="gray.200"
                                >
                                    {capFirstLetters(fighter.firstName)} {capFirstLetters(fighter.lastName)} 
                                </Text>
                                </Text>
                            </Flex>
                        </Flex>
                    </ListItem>
                ))}
            </UnorderedList>
        </Flex>
    )
}