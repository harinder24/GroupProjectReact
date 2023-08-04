import React from "react";
import NavBar from "./Navbar";
import "./style.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { collection, doc, getDocs,getDoc, increment, query, updateDoc, where, arrayUnion } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Context from "../context";
import { db } from "../config";

export default function Reels() {
  const { userBasicInfo } = useContext(Context);
const [randomPost, setRandomPost] = useState([]);
const navigate = useNavigate();
const [logicPost, setLogicPost] = useState({})
const [isDataLoaded, setIsDataLoaded] = useState(false);
const [num, setNum] = useState(0)

useEffect(() => {
  const fetchRandomDocuments = async () => {
    if (userBasicInfo.email == null) {
 
      navigate("/login");

    } else {
      const random = await getRandomDocuments("post", 20);
  
      setLogicPost(random[num])
      setRandomPost(random);
      setIsDataLoaded(true);
    }
  };
  fetchRandomDocuments();
}, []);

useEffect(() => {
  console.log(randomPost);
}, [randomPost]);

const getRandomDocuments = async (collectionName, numDocuments) => {
  const collectionRef = collection(db, collectionName);

  const q =  query(collectionRef, where("type", "==", "video"));
  const querySnapshot = await getDocs(q);
  const totalDocuments = querySnapshot.size;

  const randomIndexes = [];
  while (
    randomIndexes.length < numDocuments &&
    randomIndexes.length < totalDocuments
  ) {
    const randomIndex = Math.floor(Math.random() * totalDocuments);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  const randomDocuments = [];
  for (const index of randomIndexes) {
    const snapshot = querySnapshot.docs[index];
    randomDocuments.push({ id: snapshot.id, data: snapshot.data() });
  }

  return randomDocuments;
};
if (!isDataLoaded) {
  return <div></div>;
}

function arrowUpHandler() {
  if (num === 0) {
    return;
  } else {
    setNum(prevNum => prevNum - 1);
    setLogicPost(randomPost[num - 1]);
  }
}

function arrowDownHandler() {
  if (num === randomPost.length - 1) {
    setNum(0);
    setLogicPost(randomPost[0]);
  } else {
    setNum(prevNum => prevNum + 1);
    setLogicPost(randomPost[num + 1]); 
  }
}

  
  return (
    <>
    <div className="flex bg-white dark:bg-black min-h-screen">
      <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">
        <NavBar />
      </div>
      <div className="h-screen flex-grow overflow-auto hideDaBar flex justify-center items-center">
        <Reel key={logicPost.id}
                url={logicPost.data.url}
                id={logicPost.id}
                numcomment={logicPost.data.numcomment}
                comment={logicPost.data.comment}
                user={logicPost.data.user}
                captions={logicPost.data.captions}
             />
      </div>
    </div>
    <div className="absolute top-0 right-0 h-screen mr-3" >
      <div className="flex h-screen flex-col justify-between">
          <div onClick={arrowUpHandler} className="p-3 rounded-full bg-neutral-200 mt-[50px] hover:bg-neutral-300 cursor-pointer">
          <ArrowUpwardIcon className=""/>
          </div>
          <div onClick={arrowDownHandler} className="p-3 rounded-full bg-neutral-200 mb-[50px] max-[770px]:mb-[100px] hover:bg-neutral-300 cursor-pointer">
          <ArrowDownwardIcon className=""/>
          </div>
      </div>
    </div>
    </>
  );
}

function Reel({ url, numcomment, id, comment, captions, user }) {
  const [profilePic, setPropfilepic] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [isSav, setIsSav] = useState(false);
  const [commentVal, setCommentVal] = useState("");
  const { setUserBasicInfo, userBasicInfo } = useContext(Context);
  const [numberOfCom, setNumberOfCom] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [commentList, setCommentList] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userBasicInfo.profileimg) {
      setPropfilepic(userBasicInfo.profileimg);
    }
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
      });
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
        comment: arrayUnion({ user: user, data: commentVal }),
        numcomment: increment(1),
      },
      { merge: true }
    );
    handleCommentIncrement();
    setCommentListHandler();
    setCommentVal("");
  }
  const setCommentListHandler = () => {
    let updatedCommentList = [
      ...commentList,
      { user: user, data: commentVal },
    ].reverse();
    setCommentList(updatedCommentList);
  };

  const handleCommentIncrement = () => {
    setNumberOfCom(numberOfCom + 1);
  };
  const handleShowComment = async () => {
    if (showComment) {
      setShowComment(false);
    }else
    {
      const docRef = doc(db, "post", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

console.log(id, "id");
      setCommentList(data.comment.reverse());
   
      setShowComment(true);
    }
  };

  async function followingHandler() {
    const obj = userBasicInfo;
    if (!obj.following) {
      obj.following = [];
    }
    obj.following.push(user);
    setUserBasicInfo({ obj });
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
  return (
    <div className=" w-[372px]  h-[90vh] mb-10 relative flex justify-center items-center bg-black">
      <video className="w-full max-h-[90vh] px-2 relative" controls autoPlay>
        <source
          src={url}
          type="video/mp4"
        />
        <div className="z-10 absolute top-0">hi</div>
      </video>
      <div className="absolute top-[30%] flex flex-col gap-2 right-[20px]">
        <div
          onClick={favHandler}
          className="p-2 rounded-full bg-opacity cursor-pointer"
        >
          {" "}
          <span>
            {isFav ? (
              <FavoriteIcon className=" text-red-500" />
            ) : (
              <FavoriteIcon className=" text-white  " />
            )}
          </span>
        </div>
        <div
          onClick={handleShowComment}
          className="p-2 rounded-full bg-opacity cursor-pointer"
        >
          {" "}
          <CommentIcon className="text-white" />
        </div>
        <div className="p-2 rounded-full bg-opacity cursor-pointer">
          {" "}
          <SendIcon className="text-white" />
        </div>
        <div
          onClick={savHandler}
          className="p-2 rounded-full bg-opacity cursor-pointer"
        >
          {" "}
          {isSav ? (
            <BookmarkIcon className="text-white" />
          ) : (
            <BookmarkBorderOutlinedIcon className="text-white" />
          )}
        </div>
      </div>
      <div className="absolute bottom-[90px] left-[20px] max-[360px]:bottom-[10px]">
        <div className="flex items-center justify-center gap-2">
        <img
          className="rounded-full object-cover  h-[32px] w-[32px]"
          src={profilePic ? profilePic : "src/public/profile.jpg"}
          alt=""
        />

        <div>
          <div className="flex gap-2 items-center">
            {" "}
            <span className=" text-sm font-medium text-white">{user}</span>
            <span>
              {isFollowing ? (
                <></>
              ) : (
                <button
                  onClick={followingHandler}
                  className=" px-2 py-1 bg-blue-500 text-xs font-bold text-white rounded-lg"
                >
                  Follow
                </button>
              )}
            </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 pt-2 px-2 w-full z-30 bg-black">
        <div className="relative">
        {showComment && (
          <div className="  relative   pb-0 text-base text-gray-500 h-[140px] overflow-auto w-full  ">
            <div className="flex flex-col gap-2">
              {commentList.map((comment, index) => (
                <Comment key={index} user={comment.user} data={comment.data} />
              ))}
            </div>
            <div className="sticky bottom-0">
            <div className="text-base flex items-center">
              <input
                type="text"
                value={commentVal}
                onChange={(event) => setCommentVal(event.target.value)}
                placeholder="Add a comment"
                className=" placeholder:text-gray-500 outline-0 flex-grow bg-black "
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
          </div>
          
        )}
      </div>
      </div>
    </div>
  );
}
const Comment = ({ user, data }) => {
  const [profilePic, setPropfilepic] = useState("");
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "user", user);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setPropfilepic(data.profileimg);
    }
    fetch();
  }, []);
  return (
    <>
      <div className="flex gap-2">
        <img
          className="rounded-full object-cover  h-[25px] w-[25px]"
          src={profilePic ? profilePic : "src/public/profile.jpg"}
          alt=""
        />
        <div>
          <span className=" font-semibold mr-2 text-white text-sm">
            {user}
          </span>
          <span className=" text-xs">{data}</span>
        </div>
      </div>
    </>
  );
};
