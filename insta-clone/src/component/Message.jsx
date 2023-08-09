import React, { useContext, useEffect, useState } from "react";
import NavBar from "./Navbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendIcon from "@mui/icons-material/Send";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Context from "../context";
import { db } from "../config";


import { collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
export default function Message() {
  const [search, setSearch] = useState("");
  const { userBasicInfo } = useContext(Context);
  const [messageUser, setMessageUser] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    if (userBasicInfo.email == null) {
      navigate("/login");
    }
    async function fetchData() {
      const docRef = doc(db, "user", userBasicInfo.username);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (!data.message) {
        data.message = [];
      }

      const reverse = data.message.reverse()
      setMessageUser(reverse);
    }
    fetchData();
  }, []);

  async function handleSearch() {
    setIsSearchActive(true);
    setError(false)
    if(search == ""){
        return
    }

    
const collectionRef = collection(db,'user');

const searchString = search;


      const q = query(
        collectionRef,
        where('username', '>=', searchString),
        where('username', '<', searchString + '\uf8ff'),
        limit(8)
      );

      try {
        const querySnapshot = await getDocs(q);

        let arr = []
        querySnapshot.forEach((doc) => {
          const data = {id:doc.id, data:doc.data()}
       arr.push(data);
   
        });
        
        if(arr.length == 0){
    
          setError("No user found")
          return
        }
        setMessageUser(arr)
      } catch (error) {
       
      }
  }
  if(!messageUser){
    return<></>
  }

  return (
    <div className="flex dark:bg-black min-h-screen">
      <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">
        <NavBar />
      </div>
      <div className="flex-grow flex-col flex h-screen overflow-auto hideDaBar">
        <div className="flex  items-center justify-center">
          <div className="flex flex-grow flex-row h-8 items-center dark:bg-neutral-800 my-5 mx-2 max-w-[600px] bg-gray-200 box-border rounded-[8px] px-2 ">
            <SearchOutlinedIcon className=" text-gray-500" />

            <input
              type="text"
              className=" bg-inherit flex-grow caret-black dark:caret-white dark:text-white  placeholder:text-gray-500 outline-0 "
              placeholder="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div onClick={handleSearch}>
            <SendIcon className="mr-2 cursor-pointer text-gray-500 hover:text-black dark:hover:text-gray-500 dark:text-white" />
          </div>
        </div>
        {error && <div className="flex justify-center">{error}</div>}
        <div className="flex justify-center"> 
        <div className='w-[600px] max-[630px]:w-full mx-2'>
 <div className="w-full flex justify-between items-center mb-[10px]">
           
             
            </div>
            {isSearchActive ? messageUser.map((item) => (
    <User key={item.id} id={item.id} />
  )) : messageUser.map((item) => (
    <User key={item} id={item} />
  ))}
 
 
  </div>
  </div>
      </div>
    </div>
  );
}

function User({ id }) {
  const [messageUser, setMessageUser] = useState({});
  const { userBasicInfo } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
  
    async function fetchData() {
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      setMessageUser(data);
    }
    fetchData();
  }, []);
  if(userBasicInfo.username === messageUser.username){
    return(<></>)
}
  async function messageHandler(){
    const sortedStrings = [id, userBasicInfo.username].sort();
    const navigationUrl = sortedStrings[0] +"-" + sortedStrings[1]

    const docRef = doc(db, "user", userBasicInfo.username);
    const docSnap = await getDoc(docRef);
    let docSnapDataMessage
    const docSnapData = docSnap.data()
    if(!docSnapData.message){
        docSnapData.message = [id]
    }else{
        const updatedArray = docSnapData.message.filter((arr) => arr !== id);
        docSnapDataMessage = updatedArray
        docSnapDataMessage.push(id)
    }
    

    const objRef = doc(db, "user", userBasicInfo.username);

    await updateDoc(objRef, {
      message: docSnapDataMessage
    },
    { merge: true });

    const docRef2 = doc(db, "user", id);
    const docSnap2 = await getDoc(docRef2);
    const docSnapData2 = docSnap2.data()
    let docSnapDataMessage2
    if(!docSnapData2.message){
        docSnapData2.message = [userBasicInfo.username]
    }else{
        const updatedArray = docSnapData2.message.filter((arr) => arr !== userBasicInfo.username);
        docSnapDataMessage2 = updatedArray
        docSnapDataMessage2.push(userBasicInfo.username)
    }
    

    const objRef2 = doc(db, "user", id);

    await updateDoc(objRef2, {
      message: docSnapDataMessage2
    },
    { merge: true });

    navigate('/messages/' + navigationUrl)
  }

  return (
    <div className="flex justify-between items-center w-full m-2 mx-0">
        <div  onClick={()=> navigate("/profiles/" + id)}  className="flex items-center flex-row gap-2 cursor-pointer">
          <img
            className="w-[32px] h-[32px] rounded-full object-cover"
            src={messageUser.profileimg}
            alt=""
          />
          <div className="flex flex-col justify-center">
            <div className="text-[12px] font-semibold">{id}</div>
          </div>
        </div>
        <button onClick={messageHandler} className="px-3 max-[500px]:pt-2 py-[6px] rounded-md bg-gray-100 hover:bg-gray-200 font-semibold text-sm dark:bg-neutral-700 hover:dark:bg-neutral-800">
                    Message
        </button>
    </div>
  )
}
