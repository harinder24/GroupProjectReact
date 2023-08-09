import React, { useContext, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import FeaturedVideoOutlinedIcon from "@mui/icons-material/FeaturedVideoOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context";


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate();
  const {
  
    setUserBasicInfo,
   
  } = useContext(Context);
  function menuHandler(){
    const x = isMenuOpen
    setIsMenuOpen(!x)
  }
  function logOuthandler(){
    setUserBasicInfo({});
    navigate("/login");
  }
 const {userBasicInfo} = useContext(Context)
  
  return (
    <nav className="px-3 pt-2 pb-5 bg-white flex flex-col  box-border gap-y-2 w-[244px] h-screen border-r-[1px] border-solid border-[var(--border)]  z-[5] max-[1264px]:w-[72.8px] max-[770px]:fixed max-[770px]:w-full max-[770px]:flex-row max-[770px]:bottom-0 max-[770px]:h-fit max-[770px]:p-0 max-[770px]:justify-evenly dark:bg-black navBartopborder">
      <div className="mt-2 px-3 pt-[25px] mb-[19px] box-border max-[770px]:hidden rounded-lg min-[770px]:max-[1264px]:p-3 hover:min-[770px]:max-[1264px]:bg-gray-200 hover:dark:min-[770px]:max-[1264px]:bg-zinc-800 cursor-default logoHoveNav">
        <img
                      
          src="https://github.com/harinder24/GroupProjectReact/blob/main/insta-clone/src/public/instagramlogotext.png?raw=true"
          className="h-[29px] w-[103px] object-cover object-navinstalogo max-[1264px]:hidden dark:object-navinstalogodark"
          alt=""
        />
        <div className="min-[1264px]:hidden " ><InstagramIcon className=" " /></div>
        
      </div>
      
<Link to="/">
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start  flex items-center  rounded-lg hover:min-[770px]:bg-gray-200 dark:hover:min-[770px]:bg-zinc-800 cursor-pointer logoHoveNav">
        <HomeOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Home</div>
      </div>
      </Link>
      <Link to="/explore">
        <Link to="/search">
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start flex items-center  rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <SearchIcon className="w-[24px] h-[24px]" />
        <div className="pl-4 text-xs max-[1264px]:hidden ">Search</div>
      </div>
      </Link>
      </Link>
      <Link to="/explore" className=" logoHoveNav">
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start flex items-center  rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800  " >
        <ExploreOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden ">Expore</div>
      </div>
      </Link>
      <Link to="/reels">
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start flex items-center rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <FeaturedVideoOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Reels</div>
      </div>
      </Link>
      <Link to="/message">
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start flex items-center rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <MessageOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Messages</div>
      </div></Link>
   <Link to="/notification" className="max-[770px]:hidden " >
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start flex items-center  max-[770px]:hidden rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <FavoriteBorderOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Notifications</div>
      </div>
      </Link>
      <Link to="/create" className="max-[770px]:hidden ">
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start  flex items-center  max-[770px]:hidden  rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <AddBoxOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Create</div>
      </div>
      </Link>
     <Link to="/profile">
      <div className="px-[5px] py-3 min-[290px]:px-3  min-[770px]:justify-center min-[1264px]:justify-start flex items-center  rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <img src={userBasicInfo.profileimg} alt="" className=" rounded-full w-6 h-6 object-cover"  />
        <div className="pl-4 text-xs max-[1264px]:hidden ">Profile</div>
      </div>
      </Link>
      <div className="mt-auto">
      <div onClick={menuHandler} className="relative max-[770px]:hidden">
      <div className="px-[5px] py-3 min-[290px]:px-3 min-[770px]:justify-center min-[1264px]:justify-start flex items-center mt-auto rounded-lg max-[770px]:hidden hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
       
        <MenuOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">More</div>
        
        </div>
    
      {isMenuOpen &&
        <div onClick={logOuthandler} className="absolute top-[-55px]  h-10 w-[100px] bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700  cursor-pointer rounded-xl">
       <div className="h-10 w-[100px] flex justify-center items-center ">
          <div>
            Log out
          </div>
       </div>
        </div> }
        </div>
        </div>
    </nav>
  );
};

export default NavBar;