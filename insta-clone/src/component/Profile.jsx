import NavBar from "./Navbar";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PagesOutlinedIcon from "@mui/icons-material/PagesOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import "./style.css";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import React, { useState, useContext, useEffect } from "react";
import Context from "../context";
import {  useNavigate } from "react-router-dom";
import { db } from "../config";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(false);
  const { setUserBasicInfo ,userBasicInfo } = useContext(Context);
  const [isSaved, setIsSaved] = useState(false);
  const [isPost, setIsPost] = useState(true);
  const [localLink, setLocalLink] = useState("");
  const [stage, setStage] = useState(true);
  const [isEditing, setIsEditing] = useState(false)
    const [isFollowers, setIsfollowers] = useState(false)
    const [isFollowing, setIsfollowing] = useState(false)
    const [objOfFollow,setObjOfFollow] = useState({})

  const navigate = useNavigate();
  useEffect(() => {
    if (userBasicInfo.email == null) {
      navigate("/login");
    }
    async function fetchData() {
      const docRef = doc(db, "user", userBasicInfo.username);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      if(!docData.followers){
        docData.followers = []
      }
      if(!docData.following){
        docData.following = []
      }
      setObjOfFollow({followers: docData.followers,following: docData.following})
      setUserData(docData);
    }
    fetchData();
  }, []);

  function isSavedHandler() {
    setIsPost(false);
    setIsSaved(true);
  }
  function isPostHandler() {
    setIsPost(true);
    setIsSaved(false);
  }
  function followersHandler() {
    setIsfollowers(true)
  }
  function followingHandler() {
    setIsfollowing(true)
  }
  function CloseFollowersHandler(){
   setIsfollowers(false)
   setIsfollowing(false)
  }
  function profileImageHandler() {
    setIsEditing(true)
  }

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", localLink);
    formData.append("upload_preset", "unsigned_upload_preset");

    // Replace 'your_cloud_name' with your Cloudinary cloud name
    const url = `https://api.cloudinary.com/v1_1/dddggrofv/${
      localLink.type.includes("video") ? "video" : "image"
    }/upload`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error uploading media:", errorData);
        return;
      }
      const data = await response.json();

   
      const documentRef = doc(db, "user", userData.username);


await updateDoc(documentRef, {
  profileimg: data.secure_url
});
      setLocalLink("");
      setUserData({...userData, profileimg: data.secure_url})
      setUserBasicInfo({...userData, profileimg: data.secure_url})
      setStage(true);
      setIsEditing(false)
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };
  async function removeProfilePic(){
    const documentRef = doc(db, "user", userData.username);


    await updateDoc(documentRef, {
      profileimg: "https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg"
    });
          setLocalLink("");
      
          setStage(true);
          setUserBasicInfo({...userData, profileimg: "https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg"})
          setUserData({...userData, profileimg: "https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg"})
          setIsEditing(false)
  }
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setLocalLink(file);
    setStage(false);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setLocalLink(file);
    setStage(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const CloseProfileHandler = () =>{
    setStage(true)
    setLocalLink("");
 
    setIsEditing(false)
  }

  async function unFollowingHandler(id , type){
if(type == "followers"){
  const savedArray = objOfFollow.followers;
  const updatedArray = savedArray.filter((arr) => arr !== id);
  setObjOfFollow({ ...objOfFollow, followers: updatedArray });
  setUserBasicInfo({...userBasicInfo, followers: updatedArray})
  const userRef = doc(db, "user", userData.username);
  const userRef2 = doc(db, "user", id);
  await updateDoc(userRef, {
    followers: updatedArray,
  });

  await updateDoc(userRef2, {
    following: arrayRemove(userBasicInfo.username),
  },{merge : true});

}else{
  const savedArray = objOfFollow.following;
  const updatedArray = savedArray.filter((arr) => arr !== id);
  setObjOfFollow({ ...objOfFollow, following: updatedArray });
  setUserBasicInfo({...userBasicInfo, following: updatedArray})
  const userRef = doc(db, "user", userData.username);
  const userRef2 = doc(db, "user", id);
  await updateDoc(userRef, {
    following: updatedArray,
  },{merge : true});
  await updateDoc(userRef2, {
    followers: arrayRemove(userBasicInfo.username),
  },{merge : true});
}
  }
  return (
    <>
    {isEditing &&
      <div className="absolute top-0 w-screen h-screen z-50 bgBlack-opacity">
        <div className="flex justify-center items-center">
        <div className=" my-5 w-[505px] mx-2 h-[565px] max-[770px]:h-[calc(100vh-90px)] dark:bg-neutral-800 rounded-lg flex flex-col bg-white">
          <div className="py-2 flex justify-between border-solid  border-b-[1px] border-[var(--border)]">
            <div className=" flex-grow text-center">Edit profile picture</div>
            <div onClick={CloseProfileHandler} className=" self-end mr-1 cursor-pointer">        <CloseOutlinedIcon  /></div>
    
          </div>
          
          <div className="flex flex-grow justify-center items-center flex-col">
            {stage ? (
              <div className="flex flex-col gap-3">
                <div className="flex justify-center">
                  <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} />
                <InsertPhotoOutlinedIcon sx={{ fontSize: 50 }} />
                </div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    borderRadius: "5px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    style={{ display: "none" }}
                  />
                  <div className=" text-lg ">Drag profile picture here</div>
                </div>
               
                  <button
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                    className=" cursor-pointer p-2 bg-blue-500 rounded-xl hover:bg-blue-600 font-bold text-white"
                  >
                    Select from computer
                  </button>
                  {userData.profileimg && userData.profileimg == "https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg" ? <></> : 
               <button onClick={removeProfilePic} className=" cursor-pointer p-2 bg-blue-500 rounded-xl hover:bg-blue-600 font-bold text-white">
                  Remove profile picture
               </button>}
              </div>
            ) : (
              <>
              <button
                    onClick={handleUpload
                    }
                    className=" cursor-pointer p-2 bg-blue-500 rounded-xl hover:bg-blue-600 font-bold text-white"
                  >
                    Change Profile
                  </button>
              </>
            )}
          </div>
          </div>
        </div>
      </div>}
      <div className="flex dark:bg-black min-h-screen">
        <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">
          <NavBar />
        </div>
        <div className="flex-grow flex flex-col h-screen overflow-auto hideDaBar">
          <div className="pt-8 flex justify-center gap-[100px] max-[770px]:gap-4 border-[var(--border)] pb-8 border-b-[1px] border-solid  ">
            <div className="flex">
              <img
                className="h-[150px] w-[150px] rounded-full object-cover max-[770px]:h-[75px] max-[770px]:w-[75px]"
                src={
                  userData.profileimg
                    ? userData.profileimg
                    : "https://scontent-lcy1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-lcy1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=E8cry8APuaMAX8YXlJm&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfDNP3IqQ5YRy1GVa_cbwhMFW3BaZP7Iyld0WZVtNJ44Tg&oe=64D8E54F"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col pt-4 max-[770px]:pt-0 ">
              <div className="flex gap-4 items-center max-[370px]:flex-col">
                <div className=" text-2xl max-[770px]:text-xl">
                  {userBasicInfo.username}
                </div>
                <button
                  onClick={profileImageHandler}
                  className="px-3 max-[370px]:pt-2 py-[6px] rounded-md bg-gray-100 hover:bg-gray-200 font-semibold text-sm dark:bg-neutral-700 hover:dark:bg-neutral-800"
                >
                  Edit profile
                </button>
              </div>
              <div className="flex gap-4 pt-4  max-[370px]:hidden ">
                <div>{userData.post ? userData.post.length : 0} post</div>{" "}
                <div onClick={followersHandler} className=" cursor-pointer">
                  {objOfFollow.followers ? objOfFollow.followers.length :0} followers
                </div>{" "}
                <div onClick={followingHandler} className="cursor-pointer">
                  {objOfFollow.following ? objOfFollow.following.length : 0} following
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-center min-[370px]:hidden ">
            <div className="flex flex-grow justify-evenly gap-4 pt-4  ">
              <div>{userData.post ? userData.post.length : 0} post</div>{" "}
            
              <div onClick={followersHandler} className=" cursor-pointer">
              {objOfFollow.followers ? objOfFollow.followers.length :0} followers
              </div>{" "}
          
              <div onClick={followingHandler} className="cursor-pointer">
              {objOfFollow.following ? objOfFollow.following.length : 0}  following
              </div>
            </div>{" "}
          </div>
          <div>
            <div className="w-full flex justify-center py-2">
              <div className="w-[200px] flex justify-between ">
                <div
                  onClick={isPostHandler}
                  className="flex gap-1 items-center p-2 cursor-pointer"
                >
                  <PagesOutlinedIcon /> <div className=" text-lg">Post</div>
                </div>
                <div
                  onClick={isSavedHandler}
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <BookmarkBorderOutlinedIcon />{" "}
                  <div className=" text-lg">Saved</div>
                </div>
              </div>
            </div>
          </div>
          <div className=" px-10 max-[500px]:px-2 grid grid-cols-3 gap-2 ">
            {isPost &&
              userData.post &&
              userData.post.reverse().map((item) => <Post key={item} id={item} />)}
            {isSaved &&
              userData.saved &&
              userData.saved.reverse().map((item) => <Post key={item} id={item} />)}
          </div>
        </div>
      </div>
        
          {isFollowers && <div className="absolute top-0 w-screen h-screen z-50 bgBlack-opacity">
        <div className="flex justify-center items-center ">
        <div className=" my-5 w-[505px] mx-2 h-[565px] max-[770px]:h-[calc(100vh-90px)] dark:bg-neutral-800 rounded-lg flex flex-col bg-white">
          <div className="w-full p-2 mb-2 flex justify-between items-center border-solid  border-b-[1px] border-[var(--border)]">
            <div className="flex-grow text-center">Followers</div>
            <div onClick={CloseFollowersHandler} className=" cursor-pointer">
            <CloseOutlinedIcon/>
            </div>
          </div>
          <div className="flex-grow flex flex-col overflow-auto hideDaBar">
          {objOfFollow.followers.map((list)=> <Followers id={list} key={list} unFollowingHandler={unFollowingHandler}/>)}
          </div>
    </div>
    </div>
    </div>}
    {isFollowing && <div className="absolute  top-0 w-screen h-screen z-50 bgBlack-opacity">
        <div className="flex justify-center items-center ">
        <div className=" my-5 w-[505px] mx-2 h-[565px] max-[770px]:h-[calc(100vh-90px)] dark:bg-neutral-800 rounded-lg flex flex-col bg-white">
          <div className="w-full  p-2 mb-2 flex justify-between items-center border-solid  border-b-[1px] border-[var(--border)]">
            <div className="flex-grow text-center">Following</div>
            <div onClick={CloseFollowersHandler} className=" cursor-pointer">
            <CloseOutlinedIcon/>
            </div>
          
          </div>
          <div className="flex-grow flex flex-col overflow-auto hideDaBar">
          {objOfFollow.following.map((list)=> <Following id={list} key={list} unFollowingHandler={unFollowingHandler}/>)}
          </div>
    </div>
    </div>
    </div>}
    </>
  );
};
function Following({id , unFollowingHandler}){
  const [userData, setUserdata] = useState({})
const navigate = useNavigate()
  useEffect(()=>{
    async function fetchData(){
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data()
      setUserdata(docData)
    }
    fetchData()
  },[])
  if(userData == {}){
    return <></>
  }
  return(
    

<div className=" p-2 overflow-auto hideDaBar">
<div className="flex justify-between items-center">
  <div  onClick={()=> navigate("/profiles/" + id)}   className="flex items-center gap-2 cursor-pointer">
  <img className=" h-8 w-8 rounded-full object-cover" src={ userData.profileimg ? userData.profileimg : "https://scontent-lcy1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-lcy1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=E8cry8APuaMAX8YXlJm&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfDNP3IqQ5YRy1GVa_cbwhMFW3BaZP7Iyld0WZVtNJ44Tg&oe=64D8E54F"} alt="" />
  <div className=" text-sm">
    {id}
  </div>
  </div>
  <button onClick={()=>unFollowingHandler(id, "following")} className="py-[6px] px-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700">Unfollow</button>
</div>
</div>
  )
}
function Followers({id , unFollowingHandler}){
  const [userData, setUserdata] = useState({})
  const navigate = useNavigate()
  useEffect(()=>{
    async function fetchData(){
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data()
      setUserdata(docData)
    }
    fetchData()
  },[])
  if(userData == {}){
    return <></>
  }
 
    
  return(
    

<div className=" p-2 overflow-auto hideDaBar">
<div className="flex justify-between items-center">
  <div onClick={()=> navigate("/profiles/" + id)}  className="flex items-center cursor-pointer gap-2">
  <img className=" h-8 w-8 rounded-full object-cover" src={ userData.profileimg ? userData.profileimg : "https://scontent-lcy1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-lcy1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=E8cry8APuaMAX8YXlJm&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfDNP3IqQ5YRy1GVa_cbwhMFW3BaZP7Iyld0WZVtNJ44Tg&oe=64D8E54F"}  alt="" />
  <div className=" text-sm">
    {id}
  </div>
  </div>
  <button onClick={()=>unFollowingHandler(id, "followers")} className="py-[6px] px-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700">Remove</button>
</div>
</div>
  )
}

function Post({ id }) {
  const [data, setData] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "post", id);
      const docSnap = await getDoc(docRef);
      const dataz = docSnap.data();

      setData(dataz);
    }
    fetch();
  }, []);

  if (!data) {
    return <></>;
  }
  return (
    <>
      <div
        onClick={()=> navigate("/post/" + id)}
        className=" cursor-pointer pics relative"
        style={{ paddingBottom: "100%" }}
      >
        {data.type == "video" ? (
          <>
            <video
              src={data.url}
              key={id}
              className="w-full h-full object-cover absolute top-0 left-0 "
            />
            <div className="absolute top-0 z-[1]  w-full h-full pichover">
              <div className="flex justify-center w-full  h-full  items-center">
                <PlayCircleOutlineIcon
                  style={{ fontSize: 40 }}
                  className="text-white "
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={data.url}
              key={id}
              className="w-full h-full object-cover absolute top-0 left-0 "
            />
            <div className="absolute top-0 z-[1]  w-full h-full pichover"></div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
