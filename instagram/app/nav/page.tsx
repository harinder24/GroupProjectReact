"use client";
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import FeaturedVideoOutlinedIcon from "@mui/icons-material/FeaturedVideoOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import "./page.css";
import Link from "next/link";
type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="px-3 pt-2 pb-5 bg-white flex flex-col  box-border gap-y-2 w-[244px] h-screen border-r-[1px] border-solid border-[var(--border)]  z-[5] max-[1264px]:w-[72.8px] max-[770px]:fixed max-[770px]:w-full max-[770px]:flex-row max-[770px]:bottom-0 max-[770px]:h-fit max-[770px]:p-0 max-[770px]:justify-evenly dark:bg-black navBartopborder">
      <div className="mt-2 px-3 pt-[25px] mb-[19px] box-border max-[770px]:hidden rounded-lg min-[770px]:max-[1264px]:p-3 hover:min-[770px]:max-[1264px]:bg-gray-200 hover:dark:min-[770px]:max-[1264px]:bg-zinc-800 cursor-pointer logoHoveNav">
        <a href="/login">
        <img
          src="/instagramlogotext.png"
          className="h-[29px] w-[103px] object-cover object-navinstalogo max-[1264px]:hidden dark:object-navinstalogodark"
          alt=""
        />
        </a>
        <InstagramIcon className="min-[1264px]:hidden   " />
      </div>

      <Link href="/">
      <div className="p-3  flex items-center  rounded-lg hover:min-[770px]:bg-gray-200 dark:hover:min-[770px]:bg-zinc-800 cursor-pointer logoHoveNav">
        <HomeOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Home</div>
      </div>
      </Link>
      <div className="p-3  flex items-center  rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <SearchIcon className="w-[24px] h-[24px]" />
        <div className="pl-4 text-xs max-[1264px]:hidden ">Search</div>
      </div>
      <Link href="/explore">
      <div className="p-3  flex items-center max-[770px]:hidden rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <ExploreOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden ">Expore</div>
      </div>
      </Link>
      <div className="p-3  flex items-center rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <FeaturedVideoOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Reels</div>
      </div>
      <div className="p-3  flex items-center rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <MessageOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Messages</div>
      </div>
      <div className="p-3  flex items-center  max-[770px]:hidden rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <FavoriteBorderOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Notifications</div>
      </div>
      <div className="p-3  flex items-center  max-[770px]:hidden  rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <AddBoxOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">Create</div>
      </div>
      <Link href="/profile">
      <div className="p-3  flex items-center  rounded-lg hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <img src="/profile.jpg" alt="" className=" rounded-full" width="24px" />
        <div className="pl-4 text-xs max-[1264px]:hidden ">Profile</div>
      </div>
      </Link>
      <div className="p-3  flex items-center mt-auto rounded-lg max-[770px]:hidden hover:min-[770px]:bg-gray-200  cursor-pointer  dark:hover:min-[770px]:bg-zinc-800 logoHoveNav">
        <MenuOutlinedIcon className="w-[24px] h-[24px]"/>
        <div className="pl-4 text-xs max-[1264px]:hidden">More</div>
      </div>
    </nav>
  );
};

export default Nav;
