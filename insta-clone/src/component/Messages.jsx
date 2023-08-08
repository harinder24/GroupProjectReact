import React, { useContext, useEffect, useState } from "react";
import NavBar from "./Navbar";
import "./style.css";

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { db } from "../config";
import SendIcon from "@mui/icons-material/Send";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate, useParams } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Context from "../context";
import { useEventCallback } from "@mui/material";
export default function Messages() {
  const id = useParams();
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const { userBasicInfo } = useContext(Context);
  const navigate = useNavigate();
  const [otherUserInfo, setOtherUserInfo] = useState(null)
  useEffect(() => {
    if (userBasicInfo.email == null) {
      navigate("/login");
    }
    const chatDocRef = doc(db, "chat", id.id);
    getDoc(chatDocRef)
      .then((docSnapshot) => {
        if (!docSnapshot.exists()) {
          setDoc(chatDocRef, { data: [] });
        }
      })
      .catch((error) => {
        console.error("Error checking document existence:", error);
      });
    onSnapshot(doc(db, "chat", id.id), (doc) => {
      const dataToSet = doc.data().data.reverse();
      setChat(dataToSet);
    });
    let splitUrl = id.id.split('-')
    let ref
   
    if(splitUrl[0] !== userBasicInfo.username){
    
        ref = doc(db, "user", splitUrl[0]);
    }else if(splitUrl[1] !== userBasicInfo.username){
     
        ref = doc(db, "user", splitUrl[1]);
    }
    async function fetchData(){
    const docSnap = await getDoc(ref);
    const data = docSnap.data();
  
      setOtherUserInfo(data)
    }
    fetchData()
  }, []);
  async function handleSend() {
    if (input != "") {
      const postRef = doc(db, "chat", id.id);

      await updateDoc(
        postRef,
        {
          data: arrayUnion({
            user: userBasicInfo.username,
            ismessage: true,
            data: input,
            postid: ''
          }),
        },
        { merge: true }
      );
      setInput("");
    }
  }
  if(!otherUserInfo){
    return <></>
  }

  return (
    <div className=" w-screen h-screen overflow-hidden hideDaBar">
      <div className="flex bg-white dark:bg-black min-h-screen">
        <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">
          <NavBar />
        </div>

        <div className="flex-grow h-screen overflow-auto hideDaBar flex flex-col-reverse max-[770px]:h-[calc(100vh-50px)] pt-[45px]">
          <div className="flex  items-center justify-center">
            <div className="flex flex-grow flex-row h-8 dark:bg-neutral-800 items-center my-5 mx-2 max-w-[600px] bg-gray-200 box-border rounded-[8px] px-2 ">
              <input
                type="text"
                className=" dark:text-white bg-inherit flex-grow caret-black dark:caret-white   placeholder:text-gray-500 outline-0 "
                placeholder="Send message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </div>
            <div onClick={handleSend}>
              <SendIcon className="mr-2 cursor-pointer text-gray-500 hover:text-black dark:hover:text-gray-500 dark:text-white" />
            </div>
          </div>

          {chat !== [] &&
            chat.map((item, index) => (
              <IndividualMessage
                key={index}
                ismessage={item.ismessage}
                user={item.user}
                data={item.data}
                postid={item.postid}
              />
            ))}
        </div>
      </div>
      <div className="absolute top-0">
        <div className="sticky top-0 w-screen border-b-[1px] border-solid border-[var(--border)] bg-black z-20 h-10 min-[770px]:ml-[73px] min-[770px]:w-[calc(100vw-73px)] min-[1264px]:ml-[244px] min-[1264px]:w-[calc(100vw-244px)]">
                <div className="flex h-10 items-center flex-row gap-2 ml-4">
                    <img src={otherUserInfo.profileimg} className="h-6 w-6 rounded-full object-cover" alt="" />
                    <div>{otherUserInfo.username}</div>
                </div>
        </div>
      </div>
    </div>
  );
}

const IndividualMessage = ({ ismessage, data, user, postid }) => {
  const { userBasicInfo } = useContext(Context);
  const [isVideo, setIsVideo] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
     function fetchPost() {
        const fileExtension = data.split('.').pop().toLowerCase();
    const videoExtensions = ['mp4', 'webm', 'mkv', 'avi', 'mov']; 
    
    if (videoExtensions.includes(fileExtension)) {
        setIsVideo(true)
    }
    }
    if (!ismessage) {
      fetchPost();
    }
 
  }, []);

  return (
    <>
      <div
        className={
          userBasicInfo.username == user
            ? "flex py-2 justify-end mr-2"
            : "flex py-2  ml-2"
        }
      >
        {ismessage ? (
          <div className="bg-gray-200 rounded-[15px] dark:bg-neutral-700  max-w-[200px] min-[400px]:max-w-[300px] min-[700px]:max-w-[550px]  p-[6px] px-2">
            {data}
          </div>
        ) : (
          <div onClick={()=> navigate('/post/' + postid)} className=" cursor-pointer w-[198px] h-[352px] flex items-center justify-center  bg-neutral-800  object-cover">
            {!isVideo && (
              <img
                src={data}
                className="w-full max-h-[352px] pi  object-cover"
              />
            )}

            {isVideo && (
              <div
                className=" w-[198px] h-[352px] cursor-pointer pics relative"
                style={{ paddingBottom: "100%" }}
              >
                <div className="w-[198px] h-[352px] flex items-center justify-center "> 
                <video
                  src={data}
                  className="w-full max-h-[352px]  object-cover"
                  
                />
                </div>
                <div className="absolute top-0 z-[1]  w-full h-full ">
                  <div className="flex justify-center w-full  h-full  items-center">
                    <PlayCircleOutlineIcon
                      style={{ fontSize: 40 }}
                      className="text-white "
                    />
                  </div>
                </div>{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
