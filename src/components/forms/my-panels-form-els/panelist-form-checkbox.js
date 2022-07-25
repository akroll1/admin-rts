import React, { useState, useEffect } from 'react'
import { Checkbox, CheckboxGroup, Flex } from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { MdPanoramaWideAngleSelect } from 'react-icons/md'

export const PanelistFormCheckbox = ({ allPanelists, panelistIds, setPanelistIds }) => {
    const [checkedItems, setCheckedItems] = useState([])
    const [allChecked, setAllChecked] = useState(false);
    const isIndeterminate = checkedItems?.some(Boolean) && !allChecked;

    useEffect(() => {
        setCheckedItems([...Array(allPanelists.length).fill(true)])
    },[allPanelists])

    useEffect(() => {
        const checkAllChecked = checkedItems.every(Boolean);
        setAllChecked(checkAllChecked)


    },[checkedItems]);

    const selectAll = e => {
        const { checked } = e.target;
        if(allChecked){
            setPanelistIds([])
            setCheckedItems([...Array(allPanelists.length).fill(false)])
        }

        setCheckedItems([...Array(allPanelists.length).fill(true)])
        const getPanelistIds = allPanelists.map( ({ panelistId }) => panelistId);
        setPanelistIds(getPanelistIds);
    };
    const handleCheckbox = e => {
        const { checked, id, name, value } = e.target;
        const update = checkedItems.slice(0);
        update[id] = checked;
        if(checked){
            setPanelistIds( prev => [...prev, value])
        } else {
            const filtered = panelistIds.filter( panelistId => panelistId !== value)
                .map( panelistId => panelistId);
            setPanelistIds(filtered)
        }
        setCheckedItems(update)

    }
    console.log('panelistIds: ', panelistIds)
    const allItemsChecked = panelistIds.length === allPanelists.length;
    return (

        <FieldGroup title={'All Panelists'}>
            <Flex flexDir="column" pl={6} mt={1} spacing={1}>
                <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={selectAll}
                >
                    Select All Panelists
                </Checkbox>
                <Flex pl="4" m="4" flexDir="column">
                    <p>{allItemsChecked ? 'All checked' : 'Check console log for panelistIds'}</p>
                    <CheckboxGroup
                        
                        // onChange={handleCheckboxChange} 
                        defaultChecked
                    >
                        { allPanelists?.length > 0 && allPanelists.map( (panelist, i) => {
                            return (
                                <Checkbox
                                    onChange={handleCheckbox}
                                    key={i}
                                    isChecked={allChecked || panelistIds[panelist.panelistId]}
                                    id={i}
                                    name={panelist.panelistId}
                                    defaultChecked
                                    value={panelist.panelistId}
                                >
                                    {panelist.firstName}
                                </Checkbox>                                
                            )
                        })}
                    </CheckboxGroup>
                </Flex>
            </Flex>
         </FieldGroup>
    )
}