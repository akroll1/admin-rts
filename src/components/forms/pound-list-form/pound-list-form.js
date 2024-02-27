import { useState, useEffect } from 'react'
import { 
  Box, 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  Stack, 
  StackDivider, 
  VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { useGlobalStore } from '../../../stores'
// import { officialList } from './official-list'
import { DNDPoundList } from './dnd-pound-list'
  
export const PoundListForm = () => {
    const {
        createPoundList,
        fetchPoundListById,
        updateUserPoundList,
        fetchOfficialList,
        officialPoundList,
        selectedFighter,
        submitList,
    } = useGlobalStore();

    const [fighterId, setFighterId] = useState('');
    // const [fighterIdsList, setFighterIdsList] = useState([]);
    const [combinedList, setCombinedList] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [myList, setMyList] = useState([]);
    const [officialList, setOfficialList] = useState([]);

    useEffect(() => { 
        fetchPoundListById('active');
        setInitialState(officialList)
        setCombinedList(officialList)
    },[])


    useEffect(() => {
        if(officialPoundList?.id){
            setOfficialList(officialPoundList.list)
        }    
        return () => setOfficialList([])
    },[officialPoundList])

    const setForm = e => {
        const { value } = e.currentTarget;
        return setFighterId(value.trim());
    }

    const handleUpdateAction = () => {
        const listIds = combinedList.map( fighter => fighter.id )
        const updatedList = {
            list: listIds,
            type: 'LIST'
        }
        updateUserPoundList(updatedList)
    }

    
    const handleFighterAction = e => {
        const { id } = e.currentTarget;
        if(id === 'SEARCH'){
            // fetchOfficialList(fighterId)
        } else if(id === 'ADD'){
            if(selectedFighter?.id){
                // setOfficialPoundList([selectedFighter])
            }
        } else if(id === 'DELETE'){
            // const update 
        }

    }
    const handleCreatePoundList = () => {   
        const list = [
            "d49cfc85-c944-4023-96ed-4b7bf2772021",
            "6c01552d-6ed3-4d22-8d98-2cbef0ca8274",
            "7e1ad803-9b71-4bbb-9e81-a11da61d75ca",
            "5b3bbb72-71c2-4334-9972-1f82cb83bece",
            "0fcb1bd2-af7b-4b1d-9faa-85282850d7e8",
            "65a6b29e-9b3b-4bf5-903f-778e0d2dc351",
            "0b0c844a-e0e7-400a-9f4b-302430b02b3e",
            "c1ed3754-eda2-48bb-b62d-d8e0bdbed18e",
            "32dc30f6-d7f0-4b3d-83a9-993a5ab6a3d6",
            "0ad9c579-1fd9-4d48-a4e1-cd620eaf6078",
            "cee66597-adb5-4012-9cfa-05cbee29d2da",
            "4a15ff99-e30d-41b0-bde9-453a6e7f87c1",
            "d2e6ca30-4bc7-47a5-a9fb-a3bb51197403",
            "0d31c804-45c7-4a12-b5bb-a4a91440b6d4",
            "47de9c73-71da-464b-b5a5-678375483e48",
            "540305a9-e2d4-4c75-879a-2f4d1db04311",
            "84288415-14da-4bd6-92da-fe5efaf85736",
            "409fdf66-cafe-4cca-ada6-dd9e2e206e35",
            "4c965a90-32b0-4e24-8081-a94659489476",
            "cd57301d-8d48-479f-a524-fad2237e7003"
        ];
        
        const createObj = {
            id: "3f4f0662-b966-421a-99f6-8abaa0b36cbe",
            list,
            type: "LIST",
            comment: "The March Season P4P List",
        };
        createPoundList(createObj);
    }
  // console.log('fighterIdsList: ', fighterIdsList)
  // console.log('poundListOfficial ', poundListOfficial)
    console.log('selectedFighter: ', selectedFighter)
    
    return (
        <Box px={{base: '4',md: '10'}} py="16" maxWidth="3xl" mx="auto">
        <Stack spacing="4" divider={<StackDivider />}>
            <Heading size="lg" as="h1" paddingBottom="4">
                P4P List Form
            </Heading>
            <FieldGroup title="Fighter to Add">
                <VStack width="full" spacing="6">
                    <FormControl id="fighterId">
                        <FormLabel>Fighter Id</FormLabel>
                        <Input value={fighterId} onChange={e => setForm(e)} type="text" maxLength={255} />
                    </FormControl>
                </VStack>
            </FieldGroup>
            <Flex
                flexDir="row"
                w="100%"
                justifyContent="flex-end"
            >
                {/* <Button
                    id="SEARCH"
                    onClick={handleFighterAction}
                >
                    Search for Fighter
                </Button>
                <Button
                    id="ADD"
                    onClick={handleFighterAction}
                >
                    Add Fighter To List
                </Button>
                <Button
                    id="DELETE"
                    onClick={handleFighterAction}
                >
                    Delete Fighter
                </Button> */}
                <Button
                    id="CREATE"
                    onClick={handleCreatePoundList}
                >
                    Create List
                </Button>
            </Flex>
            <DNDPoundList 
                officialList={officialList}
            />  
        </Stack>
        </Box>
    )
}