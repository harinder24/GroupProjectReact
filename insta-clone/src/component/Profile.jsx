import NavBar from './Navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import "./style.css";

import React, { useState } from 'react';

const Profile = () => {

    const [dialog, setDialog] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    'https://www.sarkarinaukriexams.com/images/post/1670771584desola-lanre-ologun-IgUR1iX0mqM-unsplash_(1).jpg'
  );

  const toggleDialog = () => {
    setDialog(!dialog);
  };
    
    return (
      <div className="flex dark:bg-black min-h-screen">
         <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">

<NavBar />
      </div >
      <div id="profileMainView" className="box-border h-screen flex flex-col overflow-auto no-scrollbar">
        <header>
          <div className="container ">
            <div className="profile">

            {/* <div>
    <button onClick={toggleDialog}>Show Popup Image</button>
    <p></p>
    {dialog && (
      <div className="dialog">
        <div className="dialog-content">
          <button onClick={toggleDialog} className="close-icon">
            &times;
          </button>
          <img src={imageSrc} alt="Popup Image" />
        </div>
      </div>
    )}
  </div> */}

              
            {/* <div className="cropper">
                  <span className="text">
                      Drag and drop image file
                      <span className="normal">or</span>
                      <span className="normal">Click to choose an image</span>
                  </span>
                  <input type="file" id="file_image"/>
              </div> */}

              <div className="profile-image">
              <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" sx={{ width: 100, height: 100}} />
              </div>

              {/* <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" /> */}

              <div className="profile-user-settings flex justify-between gap-2">
                <h1 className="profile-user-name">Betty Merid</h1>

                
                <button className="btn profile-edit-btn">Edit profile</button>

                <button className="btn profile-edit-btn">View archive</button>


                <button>  <img className="setting-icon" src="https://pic.onlinewebfonts.com/thumbnails/icons_276805.svg" style={{width:'25px'}}/> </button>

              
                
                {/* <Button className="settings-btn" style={{backgroundImage:"url(https://pic.onlinewebfonts.com/thumbnails/icons_276805.svg)",backgroundSize:"cover", width:"100px", height:"100px"}}></Button> */}

                

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
                  <span className="profile-real-name"> Betty </span> This is the page that I worked on
                </p>
              </div>
              
            </div>
            {/* End of profile section */}
          </div>
          {/* End of container */}

        </header>
        <main>
          <div className="container">
            <div className="gallery">

          <div className="grid grid-cols-3 gap-2 place-items-stretch h-56 ...">
              
              {/* <button onClick={toggleDialog}> */}
              <div className="gallery-item" tabIndex={0}>
                      <img
                          src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                          className="gallery-image"
                          alt=""
                      />
                      <div className="gallery-item-info">
                          <li className="gallery-item-likes">
                              <span className="visually-hidden">Likes:</span>
                              <i aria-hidden="true"></i> 75
                          </li>
                          <li className="gallery-item-comments">
                              <span className="visually-hidden">Comments:</span>
                              <i  aria-hidden="true"></i> 4
                          </li>
                      </div>
              </div>
              {/* </button> */}
                  
                  <div className="gallery-item" tabIndex={0}>
                      <img
                          src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80?w=500&h=500&fit=crop"
                          className="gallery-image"
                          alt=""
                      />
                      <div className="gallery-item-info">
                          <li className="gallery-item-likes">
                              <span className="visually-hidden">Likes:</span>
                              <i aria-hidden="true"></i> 1,678
                          </li>
                          <li className="gallery-item-comments">
                              <span className="visually-hidden">Comments:</span>
                              <i  aria-hidden="true"></i> 34
                          </li>
                      </div>
                  </div>
                  
                  <div className="gallery-item" tabIndex={0}>
                      <img
                          src="https://images.unsplash.com/photo-1508515053963-70c7cc39dfb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80?w=500&h=500&fit=crop"
                          className="gallery-image"
                          alt=""
                      />
                      <div className="gallery-item-info">
                          <li className="gallery-item-likes">
                              <span className="visually-hidden">Likes:</span>
                              <i aria-hidden="true"></i> 47
                          </li>
                          <li className="gallery-item-comments">
                              <span className="visually-hidden">Comments:</span>
                              <i  aria-hidden="true"></i> 9
                          </li>
                      </div>
                  </div>

                  <div className="gallery-item" tabIndex={0}>
                      <img
                          src="https://plus.unsplash.com/premium_photo-1669018131050-e7b5719d201b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&?w=500&h=500&fit=crop"
                          className="gallery-image"
                          alt=""
                      />
                      <div className="gallery-item-info">
                          <li className="gallery-item-likes">
                              <span className="visually-hidden">Likes:</span>
                              <i aria-hidden="true"></i> 5
                          </li>
                          <li className="gallery-item-comments">
                              <span className="visually-hidden">Comments:</span>
                              <i  aria-hidden="true"></i> 0
                          </li>
                      </div>
                  </div>

                  <div className="gallery-item" tabIndex={0}>
                      <img
                          src="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&?w=500&h=500&fit=crop"
                          className="gallery-image"
                          alt=""
                      />
                      <div className="gallery-item-info">
                          <li className="gallery-item-likes">
                              <span className="visually-hidden">Likes:</span>
                              <i aria-hidden="true"></i> 83
                          </li>
                          <li className="gallery-item-comments">
                              <span className="visually-hidden">Comments:</span>
                              <i  aria-hidden="true"></i> 0
                          </li>
                      </div>
                  </div>

                 <div className="gallery-item" tabIndex={0}>
                      <img
                          src="https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=855&q=80?w=500&h=500&fit=crop"
                          className="gallery-image"
                          alt=""
                      />
                      <div className="gallery-item-info">
                          <li className="gallery-item-likes">
                              <span className="visually-hidden">Likes:</span>
                              <i aria-hidden="true"></i> 2
                          </li>
                          <li className="gallery-item-comments">
                              <span className="visually-hidden">Comments:</span>
                              <i  aria-hidden="true"></i> 1
                          </li>
                      </div>
                  </div>


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
      );
    };



export default Profile;

