'use client'
import Nav from "../nav/page";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import "./page.css";

const profile = () => {
    return (
        <>
        <Nav/>
          <header>
            <div className="container">
              <div className="profile">
                
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

                <div className="profile-user-settings">
                  <h1 className="profile-user-name">Betty Merid</h1>

                  
                  <button className="btn profile-edit-btn">Edit profile</button>

                  <button className="btn profile-edit-btn">View archive</button>


                  <button> </button>

                  <img className="setting-icon" src="https://pic.onlinewebfonts.com/thumbnails/icons_276805.svg" style={{maxWidth:'5%'}}/>
                  
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

                <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 ...">
                    <div className="gallery-item" tabIndex={0}>
                        <img
                            src="https://images.unsplash.com/photo-1690207714547-6e76b0e61b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80?w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />
                        <div className="gallery-item-info">
                            <ul>
                            <li className="gallery-item-likes">
                                <span className="visually-hidden">Likes:</span>
                                <i className="fas fa-heart" aria-hidden="true"></i> 56
                            </li>
                            <li className="gallery-item-comments">
                                <span className="visually-hidden">Comments:</span>
                                <i className="fas fa-comment" aria-hidden="true"></i> 2
                            </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="gallery-item" tabIndex={0}>
                        <img
                            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />
                        <div className="gallery-item-info">
                            <ul>
                            <li className="gallery-item-likes">
                                <span className="visually-hidden">Likes:</span>
                                <i className="fas fa-heart" aria-hidden="true"></i> 56
                            </li>
                            <li className="gallery-item-comments">
                                <span className="visually-hidden">Comments:</span>
                                <i className="fas fa-comment" aria-hidden="true"></i> 2
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="gallery-item" tabIndex={0}>
                        <img
                            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />
                        <div className="gallery-item-info">
                            <ul>
                            <li className="gallery-item-likes">
                                <span className="visually-hidden">Likes:</span>
                                <i className="fas fa-heart" aria-hidden="true"></i> 56
                            </li>
                            <li className="gallery-item-comments">
                                <span className="visually-hidden">Comments:</span>
                                <i className="fas fa-comment" aria-hidden="true"></i> 2
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="gallery-item" tabIndex={0}>
                        <img
                            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />
                        <div className="gallery-item-info">
                            <ul>
                            <li className="gallery-item-likes">
                                <span className="visually-hidden">Likes:</span>
                                <i className="fas fa-heart" aria-hidden="true"></i> 56
                            </li>
                            <li className="gallery-item-comments">
                                <span className="visually-hidden">Comments:</span>
                                <i className="fas fa-comment" aria-hidden="true"></i> 2
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="gallery-item" tabIndex={0}>
                        <img
                            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />
                        <div className="gallery-item-info">
                            <ul>
                            <li className="gallery-item-likes">
                                <span className="visually-hidden">Likes:</span>
                                <i className="fas fa-heart" aria-hidden="true"></i> 56
                            </li>
                            <li className="gallery-item-comments">
                                <span className="visually-hidden">Comments:</span>
                                <i className="fas fa-comment" aria-hidden="true"></i> 2
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="gallery-item" tabIndex={0}>
                        <img
                            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                            className="gallery-image"
                            alt=""
                        />
                        <div className="gallery-item-info">
                            <ul>
                            <li className="gallery-item-likes">
                                <span>Likes:</span>
                                <i></i> 56
                            </li>
                            <li className="gallery-item-comments">
                                <span>Comments:</span>
                                <i></i> 10
                            </li>
                            </ul>
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
        </>
      );
    };

export default profile;

