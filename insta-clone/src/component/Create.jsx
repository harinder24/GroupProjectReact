import React, { useContext, useEffect, useState } from "react";
import NavBar from "./Navbar";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { db } from "../config";
import Context from "../context";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, arrayUnion, getDoc, setDoc  } from "firebase/firestore";
export default function Create() {
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [localLink, setLocalLink] = useState("");
  const [stage, setStage] = useState(true);
  const [textareaValue, setTextareaValue] = useState('');

  const { userBasicInfo } = useContext(Context);
  const navigate = useNavigate()
  useEffect(()=>{
    if(userBasicInfo.email == null){
      navigate('/login')
    }
  },[])
  const handleChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleResize = (e) => {
    // e.target.style.height = 'auto';
    // e.target.style.height = `${e.target.scrollHeight}px`;
  };

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
   
      setMediaUrl(data.secure_url);
      setMediaType(localLink.type.includes("video") ? "video" : "image");
    

      const hashtagArray1 = textareaValue.split(" ");
      let hashtagArray = []
      for(let i = 0; i < hashtagArray1.length; i++){
        if(hashtagArray1[i].charAt(0) === "#"){
          hashtagArray.push(hashtagArray1[i])
        }
      }
      
    console.log(hashtagArray1);
      const postData = {
        captions : textareaValue,
        comment : [],
        type : localLink.type.includes("video") ? "video" : "image",
        url : data.secure_url,
        numcomment: 0,
        user: userBasicInfo.username,
        numlikes: 0
      }
 
      const docRef = await addDoc(collection(db, "post"), postData);
      const postId = docRef.id
         
          
      const userRef = doc(db, "user", userBasicInfo.username);
      await updateDoc(userRef, {
        post: arrayUnion(postId)
      }, { merge: true });

      for(let i = 0; i < hashtagArray.length; i++){
        const searchString = hashtagArray[i];
        console.log(searchString);
        const docRef = doc(db, "hashtag", searchString);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
         
          await updateDoc(docRef, {
            list: arrayUnion(postId)
          }, { merge: true });
        } else {
       
          await setDoc(docRef, {
            list: arrayUnion(postId)
          }, { merge: true });
        }
      }
      setTextareaValue("")
      setLocalLink("")
      setMediaType("")
      setMediaUrl("")
      setStage(true)

    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setLocalLink(file)
    setStage(false)
    // handleUpload(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setLocalLink(file)
    setStage(false)
    // handleUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex dark:bg-black  bg-neutral-400">
      <NavBar />
      <div
        id="createMainDiv"
        className="h-screen flex-grow overflow-auto flex justify-center items-center"
      >
        <div className=" my-5 w-[505px] mx-2 h-[565px] max-[770px]:h-[300px] dark:bg-neutral-800 rounded-lg flex flex-col bg-white">
          <div className="py-2 flex justify-center border-b-[1px] border-[var(--border)]">
            Create new post
          </div>
          <div className="flex flex-grow justify-center items-center flex-col">
            {stage ? <div className="flex flex-col gap-3">
              <div className="flex justify-center">
                <InsertPhotoOutlinedIcon sx={{ fontSize: 50 }} />
                <OndemandVideoOutlinedIcon sx={{ fontSize: 50 }} />
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
                  accept="image/*,video/*"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
                <div className=" text-lg ">Drag photos and videos here</div>
              </div>
              <button
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                className=" cursor-pointer p-2 bg-blue-500 rounded-xl hover:bg-blue-600 font-bold text-white"
              >
                Select from computer
              </button>
            </div> : 
            <div className="w-full">
               <div className="container mx-auto p-4">
      <textarea
        className="w-full min-h-20 h-[150px] resize-y overflow-y-auto border rounded focus:outline-none focus:neutral-blue-500"
        value={textareaValue}
        onChange={handleChange}
        onInput={handleResize}
        placeholder="Add caption..."
      />
    </div>
    <div className="w-full flex justify-center">
            <button onClick={handleUpload}  className=" cursor-pointer p-2 bg-blue-500 rounded-xl hover:bg-blue-600 font-bold text-white">
                Create new post
            </button>
            </div>
              </div>}
            
          </div>
        </div>
      </div>
    </div>
  );
}

// <div aria-label="Write a caption..." class="xw2csxc x1odjw0f x1n2onr6 x1hnll1o xpqswwc xl565be x5dp1im xdj266r x11i5rnm xat24cr x1mh8g0r x1w2wdq1 xen30ot x1swvt13 x1pi30zi xh8yej3 x5n08af notranslate" contenteditable="true" role="textbox" spellcheck="true" tabindex="0" data-lexical-editor="true" style="user-select: text; white-space: pre-wrap; word-break: break-word;"><p class="xdj266r x11i5rnm xat24cr x1mh8g0r"><br></p></div>