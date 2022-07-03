import React, { useState, useEffect } from 'react'
import { Flex, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { PagePoundList } from '../components/lists'
import stateStore from '../state-store'

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}
export const PoundPage = ({ accessTokenConfig }) => {
  const toast = useToast();  
  const [officialPoundList, setOfficialPoundList] = useState([]);
  const [myPoundList, setMyPoundList] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const [selectedFighter, setSelectedFighter] = useState({});
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const baseUrl = process.env.REACT_APP_POUND_LIST;
  
  const user = stateStore.getState.user;
  const tokenConfig = stateStore.getState.tokenConfig;
  ////////////////////////////////////////////////////////
  useEffect(() => {
      const getLists = async () => {
        const url = baseUrl + `/${user.sub}`;
        return await axios.get(url, tokenConfig)
          .then(res => {
            const { usersList, officialList } = res.data;
            const bothLists = res.data.usersList.concat(res.data.officialList);
            const usersListIds = usersList.map( fighter => fighter.fighterId);
            const filtered = officialList.filter( fighterObj => {
              return !usersListIds.includes(fighterObj.fighterId)
            });
            setCombinedList([...usersList, ...filtered])
            setOfficialPoundList(officialList)
            setSelectedFighter(res.data.usersList[0])
          })
          .catch(err => console.log(err));
      }
      getLists();
  }, []);

  const onDragStart = e => {
    const initialPosition = Number(e.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: combinedList
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
      setCombinedList(newList)
    }
  }
  const onDrop = e => {
    setMyPoundList(dragAndDrop.updatedOrder);
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

  const submitMyList = () => {
    const list = combinedList.slice(0, 5).map( fighter => fighter.fighterId);
    const poundObj = {
      list,
      updatedAt: new Date(),
      owner: `${user.sub}`
    }
    const url = baseUrl + `/${user.sub}`;
    return axios.put(url, poundObj, tokenConfig)
      .then(res => {
        if(res.status === 200){
          toast({ title: 'Updated P4P List!',
              status: 'success',
              duration: 5000,
              isClosable: true,})
      }})
      .catch(err => console.log(err))
  }

  const officialListStyles = { fontWeight: 'bold', color: '#e80000'};
  const myListStyles = { };

  return (
    <Flex id="pound_page-lists" boxSizing="border-box" flexDir="column" alignItems="center" justifyContent="center">
      <Heading as="h2" size={["sm", "md", "lg"]} p="4" m="1">Pound-4-Pound Lists</Heading>
      <Flex p="4" m="4" mt="0" w={["100%", "90%"]} flexDir={["column", "row"]} alignItems="flex-start" justifyContent="space-evenly">
        <Flex 
          as="section" 
          flex="1 0 40%" 
          flexDir="column" 
          alignItems="center" 
          justifyContent="center"
          p="4"
          pt="0"
          m="4"
          mt="0"
        >
            <Heading as="h3" p="4" pt="0" size={["sm", "md", "lg"]}>The People's List</Heading> 
            <PagePoundList officialPoundList={officialPoundList} />
         
        </Flex>
        <Flex 
          as="section" 
          flex="1 0 40%" 
          flexDir="column" 
          alignItems="center" 
          justifyContent="center"
          p="4"
          pt="0"
          m="4"
          mt="0"
        >
          <Heading as="h3" p="4" pt="0" size={["sm", "md", "lg"]}>The FightSync List</Heading> 
          <PagePoundList officialPoundList={officialPoundList} />
        </Flex>
      </Flex>
    </Flex>
  )
};