import React, { useContext, useEffect, useState } from "react";
import NavBar from "./Navbar";
import Context from "../context";
import { useNavigate } from "react-router-dom";
import { db } from "../config";
import "./style.css"
import { doc, getDoc } from "firebase/firestore";
export default function Notification() {
    const { userBasicInfo} = useContext(Context);
    const navigate = useNavigate()
    useEffect(()=>{if (userBasicInfo.email == null) {
      navigate("/login");
    }},[])
    
  return (
    <div className="flex bg-white dark:bg-black min-h-screen">
      <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">
        <NavBar />
      </div>
      <div className="flex-grow h-screen overflow-auto hideDaBar">
        <div className="flex flex-col flex-grow pt-4 justify-center">
            <h2 className="w-full text-center text-2xl font-semibold pb-4 mb-2 border-solid border-[var(--border)] border-b-[1px]">Notification</h2>
            <div className="w-full justify-center flex">
                {userBasicInfo.followers ? <><div className="min-w-[250px] mx-2">
                    {userBasicInfo.followers.map((items)=> <NotificationMessage key={items} id={items}/>)}
                    </div></> : <></>}
            </div>
        </div>
      </div>
    </div>
  );
}

function NotificationMessage({id}){
    const [userData, setUserData] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchData(){
            const docRef = doc(db, "user", id);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data()
            setUserData(docData)
        }
        fetchData()
    },[])
    
    return(
        <div  onClick={()=> navigate("/profiles/" + id)}  className="w-full cursor-pointer flex gap-2 my-2 items-center">
            <img className="w-7 max-h-7 rounded-full object-cover" src={userData.profileimg ? userData.profileimg : "https://scontent-lcy1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-lcy1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=E8cry8APuaMAX8YXlJm&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfDNP3IqQ5YRy1GVa_cbwhMFW3BaZP7Iyld0WZVtNJ44Tg&oe=64D8E54F"}  alt="" />
            <div><b>{id}</b> started following you</div>
        </div>
    )
}
