import "./style.css";
import NavBar from "./Navbar";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useEffect, useState } from "react";
import Context from "../context";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate, useParams } from "react-router-dom";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { db } from "../config";


export default function Post() {
    const [picData, setPicData] = useState(null)
    const idPost = useParams()
    const navigate  = useNavigate()
    const { setUserBasicInfo, userBasicInfo } = useContext(Context);
    useEffect(()=>{
        if (userBasicInfo.email == null) {
            navigate("/login");
          }
    },[])
useEffect(()=>{
async function fetchData(){
    const docRef = doc(db, "post", idPost.id);
const docSnap = await getDoc(docRef);
const dataFetch = docSnap.data()

setPicData(dataFetch)
}
fetchData()
},[idPost])
if(!picData){
    return <></>
}
  return (
    <div className="flex dark:bg-black min-h-screen">
        <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">
          <NavBar  />
        </div>
        <div className="flex-grow flex justify-center h-screen overflow-auto hideDaBar">
            <PicPost url={picData.url} id={idPost.id} type={picData.type} numcomment={picData.numcomment} captions={picData.captions} user={picData.user} />
        </div>
        </div>
  )
}

function PicPost({ url, numcomment, id, type, comment, captions, user }) {
    const [profilePic, setPropfilepic] = useState("");
    const [isFav, setIsFav] = useState(false);
    const [isSav, setIsSav] = useState(false);
    const [commentVal, setCommentVal] = useState("");
    const { setUserBasicInfo, userBasicInfo } = useContext(Context);
    const [isFollowing, setIsFollowing] = useState(false);
    const [numberOfCom, setNumberOfCom] = useState(0);
    const [showComment, setShowComment] = useState(false);
    const [commentList, setCommentList] = useState(null);
    const [isPopOpen, setIsPopOpen] = useState(false)
    const [shareList, setShareList] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
      async function fetch() {
        const docRef = doc(db, "user", user);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data.profileimg) {
          if (data.profileimg != "") {
            setPropfilepic(data.profileimg);
          }
        }
      }
      fetch();
  
      setNumberOfCom(numcomment);
      for (let i = 0; i < userBasicInfo.likes.length; i++) {
        if (userBasicInfo.likes[i] == id) {
          setIsFav(true);
        }
      }
      for (let i = 0; i < userBasicInfo.saved.length; i++) {
        if (userBasicInfo.saved[i] == id) {
          setIsSav(true);
        }
      }
      if (userBasicInfo.following) {
        for (let i = 0; i < userBasicInfo.following.length; i++) {
          if (userBasicInfo.following[i] == user) {
            setIsFollowing(true);
          }
        }
      }
  
      if (userBasicInfo.username == user) {
        setIsFollowing(true);
      }
    }, []);
    async function favHandler() {
      if (isFav) {
        const likeArray = userBasicInfo.likes;
        const updatedArray = likeArray.filter((arr) => arr !== id);
        setUserBasicInfo({ ...userBasicInfo, likes: updatedArray });
        const userRef = doc(db, "user", user);
  
        await updateDoc(userRef, {
          likes: updatedArray,
        });
        const postRef = doc(db, "post", id);
  
        await updateDoc(
          postRef,
          {
            numlikes: increment(-1),
          },
          { merge: true }
        );
        setIsFav(false);
      } else {
        const likeArray = userBasicInfo.likes;
        likeArray.push(id);
        setUserBasicInfo({ ...userBasicInfo, likes: likeArray });
        const userRef = doc(db, "user", user);
  
        await updateDoc(userRef, {
          likes: likeArray,
        });
        const postRef = doc(db, "post", id);
  
        await updateDoc(
          postRef,
          {
            numlikes: increment(1),
          },
          { merge: true }
        );
        setIsFav(true);
      }
    }
    async function savHandler() {
      if (isSav) {
        const savedArray = userBasicInfo.saved;
        const updatedArray = savedArray.filter((arr) => arr !== id);
        setUserBasicInfo({ ...userBasicInfo, saved: updatedArray });
        const userRef = doc(db, "user", user);
  
        await updateDoc(userRef, {
          saved: updatedArray,
        },
        { merge: true });
        setIsSav(false);
      } else {
        const savedArray = userBasicInfo.saved;
        savedArray.push(id);
        setUserBasicInfo({ ...userBasicInfo, likes: savedArray });
        const userRef = doc(db, "user", user);
  
        await updateDoc(userRef, {
          saved: savedArray,
        });
        setIsSav(true);
      }
    }
    async function commentPostHandler() {
      const postRef = doc(db, "post", id);
  
      await updateDoc(
        postRef,
        {
          comment: arrayUnion({ user: userBasicInfo.username, data: commentVal }),
          numcomment: increment(1),
        },
        { merge: true }
      );
      handleCommentIncrement();
      handleHideComment();
      setCommentListHandler();
  
      setCommentVal("");
    }
    const setCommentListHandler = () => {
      let a = commentList;
      if (!commentList) {
        a = [];
      }
      a.push({ user: userBasicInfo.username, data: commentVal });
      a.reverse();
      let updatedCommentList = a;
      console.log(a);
      setCommentList(updatedCommentList);
    };
  
    const handleCommentIncrement = () => {
      setNumberOfCom(numberOfCom + 1);
    };
    const handleShowComment = async () => {
      const docRef = doc(db, "post", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
  
      setCommentList(data.comment.reverse());
  
      setShowComment(true);
    };
  
    const handleHideComment = () => {
      setShowComment(false);
    };
  
    async function followingHandler() {
      const obj = userBasicInfo;
      if (!obj.following) {
        obj.following = [];
      }
      obj.following.push(user);
      setUserBasicInfo( obj );
      const postRef = doc(db, "user", userBasicInfo.username);
  
      await updateDoc(
        postRef,
        {
          following: arrayUnion(user),
        },
        { merge: true }
      );
  
      const postRef2 = doc(db, "user", user);
  
      await updateDoc(
        postRef2,
        {
          followers: arrayUnion(userBasicInfo.username),
        },
        { merge: true }
      );
  
      setIsFollowing(true);
    }
    function CloseFollowersHandler(){

        setIsPopOpen(false)
      }
      async function isPopOpenHandler(){
        const docRef = doc(db, "user", userBasicInfo.username);
        const docSnap = await getDoc(docRef);
        const dataDocSnap = docSnap.data()
        if(!dataDocSnap.message){
          dataDocSnap.message = []
        }
    
        setShareList(dataDocSnap.message.reverse())
        setIsPopOpen(true)
      }
    return (
        <>
        {isPopOpen && <div className="absolute  top-0 w-screen h-screen z-50 bgBlack-opacity">
          <div className="flex justify-center items-center ">
            <div className=" my-5 w-[505px] mx-2 h-[565px] max-[770px]:h-[calc(100vh-90px)] dark:bg-neutral-800 rounded-lg flex flex-col bg-white">
              <div className="w-full  p-2 mb-2 flex justify-between items-center border-solid  border-b-[1px] border-[var(--border)]">
                <div className="flex-grow text-center">Share</div>
                <div
                  onClick={CloseFollowersHandler}
                  className=" cursor-pointer"
                >
                  <CloseOutlinedIcon />
                </div>
              </div>
              <div className="flex-grow flex flex-col overflow-auto hideDaBar">
              {shareList && shareList.map((list) => (
                <Following
                  id={list}
                  key={list}
                  url={url}
                  postid={id}
                />
              ))}
              </div>
            </div>
          </div>
        </div>}
      <div className="flex flex-col w-full items-center mb-10">
        <div className="w-[470px] max-[480px]:w-screen">
          <div className="flex flex-row px-2 w-full gap-2 h-[58px] items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <img onClick={()=> navigate("/profile/" + user)}
                className="rounded-full object-cover cursor-pointer  h-[32px] w-[32px]"
                src={profilePic ? profilePic : "/src/public/profile.jpg"}
                alt=""
              />
  
              <div>
                <div className="flex gap-2 items-center">
                  {" "}
                  <span onClick={()=> navigate("/profiles/" + user)} className="  text-sm cursor-pointer font-medium">{user}</span>
                  <span>
                    {isFollowing ? (
                      <></>
                    ) : (
                      <div
                        onClick={followingHandler}
                        className="font-semibold text-xs text-sky-500 cursor-pointer"
                      >
                        Follow
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div>
              {/* <MoreHorizIcon /> */}
            </div>
          </div>
          {type === "image" ? (
            <img
              src={url}
              className="px-2 w-full max-h-[90vh] object-cover"
              alt=""
            />
          ) : (
            <video className="w-full max-h-[90vh] px-2" controls autoPlay>
              <source src={url} type="video/mp4" />
            </video>
          )}
          <div className="flex flex-row w-full justify-between">
            <div>
              <span onClick={favHandler}>
                {isFav ? (
                  <FavoriteIcon className="m-2 w-[42px] h-[42px] cursor-pointer text-red-500" />
                ) : (
                  <FavoriteBorderOutlinedIcon className="m-2 w-[42px] h-[42px] cursor-pointer" />
                )}
              </span>
              <span onClick={isPopOpenHandler}>
              <SendOutlinedIcon className="m-2  w-[42px] h-[42px] cursor-pointer" /></span>
            </div>
            <div onClick={savHandler} className="self-end">
              {isSav ? (
                <BookmarkIcon className="m-2  w-[42px] h-[42px] self-end cursor-pointer" />
              ) : (
                <BookmarkBorderOutlinedIcon className="m-2  w-[42px] h-[42px] self-end cursor-pointer" />
              )}
            </div>
          </div>
  
          <div className="p-2 pb-0 text-sm mb-1">
            <span className=" font-semibold">{user} </span> {captions}
          </div>
          {showComment ? (
            <div className=" cursor-pointer relative p-2 pb-0 text-base text-gray-500 h-[120px] overflow-auto">
              <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2">
                {commentList.map((comment, index) => (
                  <Comment key={index} user={comment.user} data={comment.data} />
                ))}
              </div>
              <div
                onClick={handleHideComment}
                className=" text-xs sticky bottom-[-1px] bg-white dark:bg-black"
              >
                Show less
              </div>{" "}
              </div>
            </div>
          ) : (
            numberOfCom !== 0 && (
              <div
                onClick={handleShowComment}
                className=" cursor-pointer p-2 pb-0 text-base text-gray-500"
              >
                View {numberOfCom > 1 && "all"} {numberOfCom}{" "}
                {numberOfCom > 1 ? "comment" : "comments"}
              </div>
            )
          )}
  
          <div className="p-2 pb-4 border-[var(--border)] border-b-[1px] border-solid text-base flex items-center">
            <input
              type="text"
              value={commentVal}
              onChange={(event) => setCommentVal(event.target.value)}
              placeholder="Add a comment"
              className="caret-black dark:caret-white placeholder:text-gray-500 outline-0 flex-grow dark:bg-black "
            />
            {commentVal && (
              <>
                <div
                  onClick={commentPostHandler}
                  className=" cursor-pointer text-blue-500 hover:text-blue-600 font-bold"
                >
                  Post
                </div>
              </>
            )}
          </div>
        </div>
      </div></>
    );
  }
  
function Following({ id, url , postid }) {
    const [userData, setUserdata] = useState({});
    const [isNotSent, setIsNotsent] = useState(false)
    const { setUserBasicInfo, userBasicInfo } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
      async function fetchData() {
        const docRef = doc(db, "user", id);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        setUserdata(docData);
      }
      fetchData();
    }, []);
  
    async function sendHandler(){
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
  
      const postRef = doc(db, "chat", navigationUrl);
  
        await updateDoc(
          postRef,
          {
            data: arrayUnion({
              user: userBasicInfo.username,
              ismessage: false,
              data: url,
              postid: postid
            }),
          },
          { merge: true }
        );
      
      
      setIsNotsent(true)
    }
    if (userData == {}) {
      return <></>;
    }
    return (
      <div className=" p-2 overflow-auto hideDaBar">
        <div className="flex justify-between items-center">
          <div onClick={()=> navigate("/redirect/" + id)}  className="flex items-center gap-2 cursor-pointer">
            <img
              className=" h-8 w-8 rounded-full object-cover"
              src={
                userData.profileimg
                  ? userData.profileimg
                  : "/src/public/profile.jpg"
              }
              alt=""
            />
            <div className=" text-sm">{id}</div>
          </div>
          {!isNotSent && 
          <div onClick={sendHandler} className="cursor-pointer"><SendOutlinedIcon/></div>
          }
          
        </div>
      </div>
    );
  }
  const Comment = ({ user, data }) => {
    const [profilePic, setPropfilepic] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
      async function fetch() {
        const docRef = doc(db, "user", user);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        console.log(data.profileimg, user, data);
        setPropfilepic(data.profileimg);
      }
      fetch();
    }, []);
    if (!profilePic) {
      return <></>;
    }
    return (
      <>
        <div onClick={()=> navigate("/profiles/" + user)}  className="flex cursor-pointer gap-2">
          <img
            className="rounded-full object-cover  h-[25px] w-[25px]"
            src={profilePic}
            alt=""
          />
          <div>
            <span className=" font-semibold mr-2 text-black dark:text-white text-sm">
              {user}
            </span>
            <span className=" text-xs">{data}</span>
          </div>
        </div>
      </>
    );
  };
