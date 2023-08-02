import NavBar from './Navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "./Profile.css";

import React, { useState } from 'react';



const Profile = () => {

    const [dialog, setDialog] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    'https://www.sarkarinaukriexams.com/images/post/1670771584desola-lanre-ologun-IgUR1iX0mqM-unsplash_(1).jpg'
  );

  const toggleDialog = () => {
    setDialog(!dialog);
  };
    
  const imagesForProfile =[
    {
      image: "https://picsum.photos/500",
    },
    {
      image: "https://picsum.photos/500",
    },
    {
      image: "https://picsum.photos/500",
    },
    {
      image: "https://picsum.photos/500",
    },
    {
      image: "https://picsum.photos/500",
    },
    {
      image: "https://picsum.photos/500",
    },
  ]
  
  
  function MouseOver(event) {
    event.target.style.background = 'red';
  }
  function MouseOut(event){
    event.target.style.background="";
  }

    return (
      <div className="flex dark:bg-black min-h-screen">
         <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">

<NavBar />
      </div>
      <div className="mainPage"> 
      <div id="profileMainView" className="box-border h-screen flex flex-col overflow-auto no-scrollbar">
        <header>
          <div className="container ">
            <div className="profile">

            
              <div className="profile-image">
              <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" sx={{ width: 150, height: 150}} />
              </div>


              <div className="profile-user-settings flex justify-between gap-2">

                <h1 className="profile-user-name">Betty Merid</h1>

                
                <button className="profile-edit-btn">Edit profile</button>

                <button className="profile-edit-btn">View archive</button>


                <button>  <img className="setting-icon" src="https://pic.onlinewebfonts.com/thumbnails/icons_276805.svg" style={{width:'25px'}}/> </button>


                <button className="btn profile-settings-btn" aria-label="profile settings">
                  <i className="fas fa-cog" aria-hidden="true"></i>
                </button>

              </div>
              <div className="profile-stats">
                <ul>
                  <li>
                    <span className="profile-stat-count">164</span> posts
                  </li>
                  <li>
                    <span className="profile-stat-count">188</span> followers
                  </li>
                  <li>
                    <span className="profile-stat-count">206</span> following
                  </li>
                </ul>
              </div>
              <div className="profile-bio">
                <p>
                  <span className="profile-real-name"> Betty </span> 
                  <span className="profile-pronoun">she/her</span>
                </p>
                <span > This is the page that I worked on</span>
              </div>
              
            </div>
            {/* End of profile section */}
          </div>
          {/* End of container */}

        </header>
        <main>
          <div class="container mx-auto px-10">

          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
        </Box>
            <div>

          <div className="grid grid-cols-3 gap-2 place-items-stretch h-56 ...">
              {
                imagesForProfile.map((photo, index) =>  {
                  return(
                    <div tabIndex={0}>
                      <a class="relative group"
                        href="##">
                          <img src={photo.image} />
                          <div className="postInfo" class="z-20">

                            <div  class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-10xl text-white">  Likes: {photo.likes} Comments {photo.comments}</div>

                            </div>
                      </a>
                  </div>
                  )
                })
              }

            
          </div>

              {/* Add other gallery items similarly */}
            </div>

            
            {/* End of gallery */}
               {/* <div className="loader"></div> */}

          </div>

          {/* End of container */}
        </main>
        </div>
        </div>
      </div>
      );
    };



export default Profile;

