import NavBar from "./Navbar";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PagesOutlinedIcon from "@mui/icons-material/PagesOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./style.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import React, { useState, useContext, useEffect } from "react";
import Context from "../context";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const OtherProfile = () => {
  const [userData, setUserData] = useState(false);
  const { setUserBasicInfo, userBasicInfo } = useContext(Context);

  const [isFollowers, setIsfollowers] = useState(false);
  const [isFollowing, setIsfollowing] = useState(false);
  const [objOfFollow, setObjOfFollow] = useState({});
    const [profilePic , setProfilePic] = useState("")
  const [isUserFollowing, setUsUserFollowing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (userBasicInfo.email == null) {
      navigate("/login");
    }

    async function fetchData() {
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      if (!docData.followers) {
        docData.followers = [];
      }
      if (!docData.following) {
        docData.following = [];
      }
      setProfilePic(docData.profileimg)
      setObjOfFollow({
        followers: docData.followers,
        following: docData.following,
      });
      if (userBasicInfo.username == docData.username) {
       
        navigate("/profile");
      }

  

      setUserData(docData);
    }
    fetchData();
   
 
  }, []);

  useEffect(()=>{
    userBasicInfo.following.forEach(follower => {
      if (follower === userData.username) {
        setUsUserFollowing(true);
      }
    });
    
  },[userBasicInfo,userData])
  async function followersHandler() {
    const docRef = doc(db, "user", userData.username);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    if (!docData.followers) {
      docData.followers = [];
    }
    if (!docData.following) {
      docData.following = [];
    }
    setUserData(docData)
    setObjOfFollow({
      followers: docData.followers,
      following: docData.following,
    })
    setIsfollowers(true);
  }
  async function followingHandler() {
    const docRef = doc(db, "user", userData.username);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    if (!docData.followers) {
      docData.followers = [];
    }
    if (!docData.following) {
      docData.following = [];
    }
    setUserData(docData)
    setObjOfFollow({
      followers: docData.followers,
      following: docData.following,
    })
    setIsfollowing(true);
  }
  function CloseFollowersHandler() {
    setIsfollowers(false);
    setIsfollowing(false);
  }

  async function unFollowingHandler(id, type) {
    if (type == "followers") {
      const savedArray = objOfFollow.followers;
      const updatedArray = savedArray.filter((arr) => arr !== id);
      setObjOfFollow({ ...objOfFollow, followers: updatedArray });
      const userRef = doc(db, "user", userData.username);
      const userRef2 = doc(db, "user", id);
      await updateDoc(userRef, {
        followers: updatedArray,
      });

      await updateDoc(
        userRef2,
        {
          following: arrayRemove(userBasicInfo.username),
        },
        { merge: true }
      );
    } else {
      const savedArray = objOfFollow.following;
      const updatedArray = savedArray.filter((arr) => arr !== id);
      setObjOfFollow({ ...objOfFollow, following: updatedArray });
      const userRef = doc(db, "user", userData.username);
      const userRef2 = doc(db, "user", id);
      await updateDoc(
        userRef,
        {
          following: updatedArray,
        },
        { merge: true }
      );
      await updateDoc(
        userRef2,
        {
          followers: arrayRemove(userBasicInfo.username),
        },
        { merge: true }
      );
    }
  }

  async function fHandler(){
    if(isUserFollowing){
        const savedArray = objOfFollow.followers;
        const updatedArray = savedArray.filter((arr) => arr !== id);
        const userRef = doc(db, "user", userBasicInfo.username);
        const userRef2 = doc(db, "user", userData.username);
        setUserBasicInfo({...userBasicInfo, following: updatedArray})
        setObjOfFollow({ ...objOfFollow, followers: updatedArray });
        await updateDoc(
          userRef,
          {
            following: updatedArray,
          },
          { merge: true }
        );
        await updateDoc(
          userRef2,
          {
            followers: arrayRemove(userBasicInfo.username),
          },
          { merge: true }
        );
        setUsUserFollowing(false)
    }else{
       
        const savedArray = objOfFollow.followers;
    savedArray.push(userData.username);

    setObjOfFollow({ ...objOfFollow, followers: savedArray });
    let arr = [];
      if(userBasicInfo.following){
        arr = userBasicInfo.following
      }
      arr.push(userData.username)
    setUserBasicInfo({...userBasicInfo, following: arr})
    const postRef = doc(db, "user", userBasicInfo.username);
    await updateDoc(
      postRef,
      {
        following: arrayUnion(userData.username),
      },
      { merge: true }
    );

    const postRef2 = doc(db, "user", userData.username);

    await updateDoc(
      postRef2,
      {
        followers: arrayUnion(userBasicInfo.username),
      },
      { merge: true }
    );
    setUsUserFollowing(true)
    }
   
  }
  return (
    <>
      <div className="flex dark:bg-black min-h-screen">
        <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">
          <NavBar />
        </div>
        <div className="flex-grow flex flex-col h-screen overflow-auto hideDaBar">
          <div className="pt-8 flex justify-center gap-[100px] max-[770px]:gap-4 border-[var(--border)] pb-8 border-b-[1px] border-solid  ">
            <div className="flex">
              <img
                className="h-[150px] w-[150px] rounded-full object-cover max-[770px]:h-[75px] max-[770px]:w-[75px]"
                src={               profilePic == "/src/public/profile.jpg" ? "/src/public/profile.jpg" : profilePic
                  
                }
                alt=""
              />
            </div>
            <div className="flex flex-col pt-4 max-[770px]:pt-0 ">
              <div className="flex gap-4 items-center max-[500px]:flex-col max-[500px]:items-start">
                <div className=" text-2xl max-[770px]:text-xl">
                  {userData.username}
                </div>
                <div className="flex gap-2">
                  {isUserFollowing ? (
                    <button onClick={fHandler} className="px-3 max-[500px]:pt-2 py-[6px] rounded-md bg-gray-100 hover:bg-gray-200 font-semibold text-sm dark:bg-neutral-700 hover:dark:bg-neutral-800">
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={fHandler} className="px-3 max-[500px]:pt-2 py-[6px] rounded-md bg-gray-100 hover:bg-gray-200 font-semibold text-sm dark:bg-neutral-700 hover:dark:bg-neutral-800">
                      Follow
                    </button>
                  )}

                  <button className="px-3 max-[500px]:pt-2 py-[6px] rounded-md bg-gray-100 hover:bg-gray-200 font-semibold text-sm dark:bg-neutral-700 hover:dark:bg-neutral-800">
                    Message
                  </button>
                </div>
              </div>
              <div className="flex gap-4 pt-4  max-[500px]:hidden ">
                <div>{userData.post ? userData.post.length : 0} post</div>{" "}
                <div onClick={followersHandler} className=" cursor-pointer">
                {objOfFollow.followers ? objOfFollow.followers.length : 0}  followers
                </div>{" "}
                <div onClick={followingHandler} className="cursor-pointer">
                {objOfFollow.following ? objOfFollow.following.length : 0} following
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-center min-[500px]:hidden ">
            <div className="flex flex-grow justify-evenly gap-4 pt-4  ">
              <div>{userData.post ? userData.post.length : 0} post</div>{" "}
              <div onClick={followersHandler} className=" cursor-pointer">
                {objOfFollow.followers ? objOfFollow.followers.length : 0} followers
              </div>{" "}
              <div onClick={followingHandler} className="cursor-pointer">
                {objOfFollow.following ? objOfFollow.following.length : 0} following
              </div>
            </div>{" "}
          </div>
          <div>
            <div className="w-full flex justify-center py-2">
              <div className="w-[200px] flex justify-center ">
                <div className="flex gap-1 items-center p-2 cursor-pointer">
                  <PagesOutlinedIcon /> <div className=" text-lg">Post</div>
                </div>
              </div>
            </div>
          </div>
          <div className=" px-10 max-[500px]:px-2 grid grid-cols-3 gap-2 ">
            {userData.post && userData.post.reverse().map((item) => <Post key={id} id={item} />)}
          </div>
        </div>
      </div>
   
      {isFollowers && (
        <div className="absolute top-0 w-screen h-screen z-50 bgBlack-opacity">
          <div className="flex justify-center items-center ">
            <div className=" my-5 w-[505px] mx-2 h-[565px] max-[770px]:h-[calc(100vh-90px)] dark:bg-neutral-800 rounded-lg flex flex-col bg-white">
              <div className="w-full p-2 mb-2 flex justify-between items-center border-solid  border-b-[1px] border-[var(--border)]">
                <div className="flex-grow text-center">Followers</div>
                <div
                  onClick={CloseFollowersHandler}
                  className=" cursor-pointer"
                >
                  <CloseOutlinedIcon />
                </div>
              </div>
              <div className="flex-grow flex flex-col overflow-auto hideDaBar">
              {objOfFollow.followers.map((list) => (
                
                <Following
                  id={list}
                  key={list}
             
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {isFollowing && (
        <div className="absolute  top-0 w-screen h-screen z-50 bgBlack-opacity">
          <div className="flex justify-center items-center ">
            <div className=" my-5 w-[505px] mx-2 h-[565px] max-[770px]:h-[calc(100vh-90px)] dark:bg-neutral-800 rounded-lg flex flex-col bg-white">
              <div className="w-full  p-2 mb-2 flex justify-between items-center border-solid  border-b-[1px] border-[var(--border)]">
                <div className="flex-grow text-center">Following</div>
                <div
                  onClick={CloseFollowersHandler}
                  className=" cursor-pointer"
                >
                  <CloseOutlinedIcon />
                </div>
              </div>
              <div className="flex-grow flex flex-col overflow-auto hideDaBar">
              {objOfFollow.following.map((list) => (
                <Following
                  id={list}
                  key={list}
            
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
function Following({ id }) {
  const [userData, setUserdata] = useState({});
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
        <div></div>
   
        
      </div>
    </div>
  );
}
function Post({ id }) {
  const [data, setData] = useState(false);

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

export default OtherProfile;
