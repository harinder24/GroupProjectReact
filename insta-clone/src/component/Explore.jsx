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
              <div  onClick={()=> navigate("/post/" + photo.id)} 
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

