
import React, { useEffect, useContext, useState } from 'react'
import { doc, setDoc , getDoc} from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword , signInWithPopup } from "firebase/auth";

import Context from '../context';
import { db, fb, auth } from '../config';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate()
    const { setUserBasicInfo , userBasicInfo } = useContext(Context);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirm, setConfirm] = useState(false)
    async function hbHandler(event){
      event.preventDefault();
      signInWithPopup(auth,fb).then((result)=>{
        console.log(result.user);
      })
    }
    useEffect(()=>{
      if(userBasicInfo.email != null){
        navigate('/')
      }
    },[])
    async function signUpHandler(event){
        event.preventDefault()

        if (!email) {
            setEmailError("Please enter your email address.");
       
      
            return;
          } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Please enter a valid email address.");
         
            return;
          } else {
     
      
            setEmailError("");
          }

          if(!fullName){
            setEmailError("Please enter your full name")
            return
          }else {
      
            setEmailError("");
          }
      

          if(!username){
            setEmailError("Please enter username")
            return
          }else {
      
            setEmailError("");
          }
      
      
          if (!password) {
            setEmailError("Please enter your password.");
     
      
            return;
          } else if (password.length < 6) {
            setEmailError("Please enter a password with at least 6 characters.");
        
      
            return;
          } else {
      
            setEmailError("");
          }
   

const docRef = doc(db,"user", username);
try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setEmailError('User already exists with this username');
      return;
    } else {
    }
  } catch (error) {
    console.error('Error checking username:', error);
  }
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
             setConfirm(true)
             
            })
            .catch((error) => {
                console.log(error);
              setEmailError("error");
            });
          if(confirm){
            const docData = {
              email: email,
              username: username,
              fullname: fullName,
              profileimg: "/src/public/profile.jpg",
              likes: [],
              following:[],
              followers:[],
              posts:[],
              saved:[],
              notification:[],
              message:[]
          };
          await setDoc(doc(db, "user", username), docData);
            setUserBasicInfo(docData)
            navigate('/')
          }
    }
    const footerdata = [
        "Meta",
        "About",
        "Blog",
        "jobs",
        "Help",
        "API",
        "Privacy",
        "Terms",
        "Top Accounts",
        "Locations",
        "Instagram Lite",
        "Contact Uploading & Non-Users",
        "Meta Verified",
      ];
  return (
    <div className='bg-white w-full min-h-screen flex flex-col items-center justify-center mx-auto'>
         <div className="text-black flex flex-col flex-grow  mt-3 max-w-[350px] max-[380px]:w-full">
          <div className="flex w-[358px] bg-white shrink-0 flex-col items-center py-[10px] mb-[10px] align-baseline relative box-border border-solid border-[1px] border-[#dbdbdb] rounded-[1px] max-[380px]:rounded-none max-[380px]:border-0 max-[380px]:w-full">
            <div className="mt-9 overflow-y-visible mb-3 first-line: bg-transparent box-border flex flex-col shrink-0 items-stretch overflow-x-visible self-auto justify-start relative flex-grow-0 ">
              <i className="bg-igtextlogo bg-auto w-[175px] h-[51px] inline-block bg-iglogologin"></i>
            
        </div>
       
        <div className='text-gray-500 font-semibold text-lg text-center w-[256px] max-[380px]:w-full' >
            
            Sign up to see photos and video from your friends.
        </div>
        <div className='px-2 w-[265px] max-[380px]:w-full'>
        <button onClick={hbHandler} className=" w-full bg-sky-500 text-white py-1 rounded-[7px] hover:bg-sky-600 font-medium text-base  mt-4 mb-3">
                    Log in with Facebook
        </button>
        </div>
        <div className='w-[256px] mt-2 max-[380px]:w-full px-2' >
        <div className=" flex w-full">
              <div className="top-[.45em] flex-shrink flex-grow h-[1px] relative bg-[#dbdbdb]"></div>
              <span className="flex-grow-0 text-xs px-4 text-gray-400 font-semibold">
                OR
              </span>
              <div className="top-[.45em] flex-shrink flex-grow h-[1px] relative bg-[#dbdbdb]"></div>
            </div>
            </div>
            <div className="mb-[10px] max-w-[350px] flex flex-grow max-[380px]:w-full justify-center">
              <form
                
                className="flex flex-col align-baseline m-0 p-0 border-0 w-[266px] max-[380px]:w-full max-[380px]:px-2"
              >
                <div className="overflow-y-visible mt-6 bg-transparent flex flex-col box-border shrink-0 items-stretch self-auto grow-0 ">
                  <div className="mb-[6px] ">
                    <div className="text-[14px] border-solid border-[1px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] w-full box-border flex items-center text-black flex-row relative ">
                      <label
                        // htmlFor=""
                        className="h-9 relative align-baseline flex "
                      >
                        <input
                          placeholder="Email"
                          className=" caret-black  pl-2 appearance-none bg-[#fafafa] w-[264px] flex-grow m-0 outline-none overflow-hidden pt-[9px] pr-[7px] text-[14px] pb-[8px] text-ellipsis font-medium max-[380px]:w-full"
                          type="email"
                          value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-[6px] ">
                    <div className="text-[14px] border-solid border-[1px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] w-full box-border flex items-center text-black flex-row relative ">
                      <label
                        // htmlFor=""
                        className="h-9 relative align-baseline flex "
                      >
                        <input
                          placeholder="Full name"
                          className="caret-black pl-2 appearance-none bg-[#fafafa] w-[264px] flex-grow m-0 outline-none overflow-hidden pt-[9px] pr-[7px] text-[14px] pb-[8px] text-ellipsis font-medium max-[380px]:w-full"
                          type="text"
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-[6px] ">
                    <div className="text-[14px] border-solid border-[1px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] w-full box-border flex items-center text-black flex-row relative ">
                      <label
                        // htmlFor=""
                        className="h-9 relative align-baseline flex "
                      >
                        <input
                          placeholder="Username"
                          className="caret-black pl-2 appearance-none bg-[#fafafa] w-[264px] flex-grow m-0 outline-none overflow-hidden pt-[9px] pr-[7px] text-[14px] pb-[8px] text-ellipsis font-medium max-[380px]:w-full"
                          type="text"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-[6px] ">
                    <div className="text-[14px] border-solid border-[1px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] w-full box-border flex items-center text-black flex-row relative ">
                      <label
                        // htmlFor=""
                        className="h-9 relative align-baseline flex"
                      >
                        <input
                          placeholder="Password"
                          className="caret-black pl-2 appearance-none bg-[#fafafa] w-[264px] flex-grow m-0 outline-none overflow-hidden pt-[9px] pr-[7px] text-[14px] pb-[8px] text-ellipsis font-medium max-[380px]:w-full"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  {emailError ? <div className=" text-[10px] text-center text-[#cf0007]">{emailError}</div> :
                  <div className='text-black mt-4 mb-2 w-[265px] max-[380px]:w-full text-[12px] text-center'>
           People who use our service may have uploaded your contact information to Instagram. <a className=" text-blue-900" href="">Learn More</a>
            </div>}
           <div className='text-black mt-2 mb-2  w-[265px] max-[380px]:w-full text-[12px] text-center'>
           By signing up, you agree to our <a className=" text-blue-900" href=""> Terms</a> ,  <a className=" text-blue-900" href="">Privacy Policy</a> and <a className=" text-blue-900" href="">Cookies Policy</a>  .
           </div>
                  <button onClick={signUpHandler} className="w-[265px] bg-sky-500 text-white py-1 mt-2 rounded-[7px] hover:bg-sky-600 font-semibold max-[380px]:w-full">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
           
          </div>
            
          <div className="bg-white items-center box-border flex flex-col shrink-0 relative align-baseline border-solid border-[1px] border-[#dbdbdb] rounded-[1px] max-[380px]:border-0 max-[380px]:rounded-none">
            <span>
              <p className=" text-black m-[20px] text-[14px] text-center">
                 Have an account?{" "}
                <Link className=" text-sky-500" to="/login">
                  Log in
                </Link>
              </p>
            </span>
          </div>

          <div className=" flex flex-col">
            <p className=" my-[10px] mx-[20px] text-[14px] text-black text-center align-baseline">
              Get the app.
            </p>
            <div className=" flex flex-row gap-2 my-[10px] justify-center max-[380px]:flex-wrap">
              <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D300EA2EC-5727-4CBF-8DAA-E80FF52EB07E%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge&pli=1">
                <img className="h-10" src="src/public/playstore.png" alt="" />
              </a>
              <a href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1020">
                <img className="h-10" src="src/public/microsoft.png" alt="" />
              </a>
            </div>
          </div>
         
        </div>
        <footer className=" bg-white box-border flex px-4 relative items-stretch justify-center order-5 flex-shrink-0">
        <div className=" box-border px-4 flex flex-wrap justify-center gap-x-3 text-[12px] text-gray-500 mb-5">
          {footerdata.map((data) => {
            return <a key={data} href="">{data}</a>;
          })}
        </div>
        <div></div>
      </footer>
    </div>
  )
}

export default Signup;