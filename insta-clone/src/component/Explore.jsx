import { useContext, useEffect, useState } from "react";
import NavBar from "./Navbar";
import Context from "../context";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import './explore.css'
const Explore = () => {
  const { userBasicInfo } = useContext(Context);
  const [randomPost, setRandomPost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRandomDocuments = async () => {
      if (userBasicInfo.email == null) {
        navigate("/login");
      } else {
        const random = await getRandomDocuments("post", 30);
        setRandomPost(random);
      }
    };
    fetchRandomDocuments();
  }, []);

  const getRandomDocuments = async (collectionName, numDocuments) => {
    const collectionRef = collection(db, collectionName);

    // Step 1: Get the total count of documents in the collection
    const querySnapshot = await getDocs(collectionRef);
    const totalDocuments = querySnapshot.size;

    // Step 2: Generate random indexes and fetch documents based on those indexes
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
    

    // Fetch the documents using the random indexes
    const randomDocuments = [];
    for (const index of randomIndexes) {
      const snapshot = querySnapshot.docs[index];
      randomDocuments.push({ id: snapshot.id, data: snapshot.data() });
    }

    return randomDocuments;
  };

  if (!randomPost) {
    return <div></div>;
  }

  return (
    <div className="flex dark:bg-black">
      <NavBar />

      <div
        id="exploreMainContect"
        className=" pt-8 container px-2 flex flex-col mx-auto h-screen overflow-auto hideDaBar2"
      >
        <div className="container grid grid-cols-3 gap-2">
          {randomPost.map((photo, index) => {
            return (
              <div
                className=" cursor-pointer pics relative"
                style={{ paddingBottom: "100%" }}
              >
                {photo.data.type == "video" ? (
                  <>
                    <video
                      src={photo.data.url}
                      key={index}
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
                    src={photo.data.url}
                    key={index}
                    className="w-full h-full object-cover absolute top-0 left-0 "
                  />
                  <div className="absolute top-0 z-[1]  w-full h-full pichover"></div></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;

//     {/* Search Bar */}
//     <div className="flex flex-row h-8 items-center m-5 bg-gray-200 box-border rounded-[8px] px-2 ">
//     <SearchOutlinedIcon className=" text-gray-500" />

//     <input type="text"
//         className=" bg-inherit text-gray-500 placeholder:text-gray-500 outline-0 "
//         placeholder="Search"
//     />
// </div>

// {/* Hashtag Box */}
// <div className="container relative flex flex-wrap px-8 space-x-4 ">
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">outfit inspo </button>
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">interior design</button>
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">kitty cat</button>
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">outfit inspiration</button>
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">inspirational quotes</button>
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">fashion inspo</button>
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">outfit ideas</button>
//     <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">rock climbing</button>
// </div>
