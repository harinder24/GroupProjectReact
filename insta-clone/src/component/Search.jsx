import React, { useContext, useState, useEffect } from 'react'
import NavBar from './Navbar'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SendIcon from '@mui/icons-material/Send';
import Context from '../context';
import { arrayUnion, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../config';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import './explore.css'
export default function Search() {
    const { userBasicInfo ,followingSuggestion, SetFollowingSuggestion } = useContext(Context);
    const [needSuggestion, setNeedSuggestion] = useState(true)
    const [hashtagResult, setHashtagResult] = useState(false)
    const [userResult, setUserResult] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState("")
 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRandomDocuments = async () => {
      if (userBasicInfo.email == null) {
        navigate("/login");
      } else {
   
      }
    };
    fetchRandomDocuments();
    fetchDocumentsNotInArray("user", 4).then((documents) => {
    
      for(let i = 0; i < documents.length; i++){
          if(!documents[i].profileimg){
            documents[i].profileimg = "src/public/profile.img"
          }
      }
      SetFollowingSuggestion(documents)
    });
    
  
  }, []);

  const fetchDocumentsNotInArray = async (collectionName , limitCount) => {
  
    const arr = userBasicInfo.following
    if(!arr.includes(userBasicInfo.username)){
    arr.push(userBasicInfo.username)}

    const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);

  const documents = querySnapshot.docs
    .filter((doc) => !arr.includes(doc.id))
    .slice(0, limitCount)
    .map((doc) => ({ id: doc.id, ...doc.data() }));
    return documents
  };

  async function handleSearch(){
    setNeedSuggestion(false)
    setHashtagResult(false)
    setUserResult(false)
    setError(false)
    if(search == ""){
        return
    }
    if(search.charAt(0) === "#"){
      const docRef = doc(db, "hashtag", search);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
 const document =  docSnap.data()


 if(document.list == []){
  setError("No post found")
 }else{
  setHashtagResult(document.list)

 }

} else {

  setError("No post found")
}
    }else{
   



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
        setUserResult(arr)
      } catch (error) {
       
      }

    }
  }
 

  return (
    <div className="flex dark:bg-black min-h-screen">
    <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">

<NavBar />
 </div>

 <div className='flex-grow h-screen overflow-auto hideDaBar2' >
    <div className='flex flex-grow items-center justify-center'>
     <div className="flex flex-grow flex-row h-8 items-center my-5 mx-2 max-w-[600px] bg-gray-200 box-border rounded-[8px] px-2 ">
    <SearchOutlinedIcon className=" text-gray-500" />

    <input type="text"
        className=" bg-inherit flex-grow dark:caret-black dark:text-black  placeholder:text-gray-500 outline-0 "
        placeholder="Search"
        value={search}
        onChange={(event)=>setSearch(event.target.value)}
    />
</div>
<div onClick={handleSearch}>
<SendIcon className='mr-2 cursor-pointer text-gray-500 hover:text-black dark:hover:text-gray-500 dark:text-white'/>
</div>
 </div>
 {needSuggestion &&
 <div className=' flex justify-center'>
 <div className='w-[600px] max-[630px]:w-full mx-2'>
 <div className="w-full flex justify-between items-center mb-[10px]">
              <div className="font-semibold text-sm text-gray-500">
                Suggestions for you
              </div>
             
            </div>
 {followingSuggestion.map((item) => (
    <Suggestions key={item.id} id={item.id} />
  ))}
  </div>
  </div>}
  {userResult && <div className=' flex justify-center'>
    
 <div className='w-[600px] max-[630px]:w-full mx-2'>
 <div className="w-full flex justify-between items-center mb-[10px]">
           
             
            </div>
 {userResult.map((item) => (
    <Suggestions key={item.id} id={item.id} />
  ))}
 
  </div>
  </div>}
  {error && <div className=' text-center'>{error}</div>}
  {hashtagResult && <><div className="px-10 max-[500px]:px-2 grid grid-cols-3 gap-2">{hashtagResult.map((item) => (
    <Post key={item} id={item} />
  ))}</div></>}
 </div>
    </div>
  )
}
function Post({id}){
  const [data, setData] = useState(false)

  useEffect(()=>{
   async function fetch(){
    const docRef = doc(db, "post", id);
const docSnap = await getDoc(docRef);
const dataz = docSnap.data()

setData(dataz)
   }
   fetch()
  },[])

  if(!data){
    return <></>
  }
return(
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
                        <div  className="flex justify-center w-full  h-full  items-center">
<PlayCircleOutlineIcon style={{ fontSize: 40 }}  className="text-white "/></div>
                    </div>
                  </>
                ) : (
                    <>
                  <img
                    src={data.url}
              key={id}
                    className="w-full h-full object-cover absolute top-0 left-0 "
                  />
                  <div className="absolute top-0 z-[1]  w-full h-full pichover"></div></>
                )}
              </div>
</>)
}
const Suggestions = ({id, profileimg = "src/public/profile.jpg"}) => {
    const { setUserBasicInfo, userBasicInfo } = useContext(Context);
    const [isFollowing, setIsFollowing] = useState(false)
    async function followingHandler(){
      const obj = userBasicInfo;
      if(!obj.following){
        obj.following = []
      }
        obj.following.push(id)
        setUserBasicInfo(obj)
        const postRef = doc(db, "user", userBasicInfo.username);
  
        await updateDoc(postRef, {
          following: arrayUnion(id),
        },{merge : true});
  
        const postRef2 = doc(db, "user", id);
  
        await updateDoc(postRef2, {
          followers: arrayUnion(userBasicInfo.username),
        },{merge : true});
  
        setIsFollowing(true)
    }
    if(id == userBasicInfo.username){
      return <></>
    }
    return (
      <div className="flex justify-between items-center w-full m-2 mx-0">
        <div className="flex items-center flex-row gap-2">
          <img
            className="w-[32px] h-[32px] rounded-full object-cover"
            src={profileimg}
            alt=""
          />
          <div className="flex flex-col justify-center">
            <div className="text-[12px] font-semibold">{id}</div>
          </div>
        </div>
        {isFollowing ? <></> :
        <div onClick={followingHandler} className="font-semibold text-xs text-sky-500 cursor-pointer">Follow</div>
    }
    </div>
    );
  };
  