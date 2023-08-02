'use client'
import Nav from "../nav/page";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const explore = () => {
    return(
        <div className="flex dark:bg-black">
        <Nav/>

        <div className=" container px-2 flex flex-col mx-auto">

            {/* Search Bar */}
            <div className="flex flex-row h-8 items-center m-5 bg-gray-200 box-border rounded-[8px] px-2 ">
                <SearchOutlinedIcon className=" text-gray-500" />
                
                <input type="text"
                    className=" bg-inherit text-gray-500 placeholder:text-gray-500 outline-0 "
                    placeholder="Search"
                />
            </div>

            {/* Hashtag Box */}
            <div className="container relative flex flex-wrap px-8 space-x-4 ">
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">outfit inspo </button>
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">interior design</button>  
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">kitty cat</button>
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">outfit inspiration</button>
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">inspirational quotes</button>
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">fashion inspo</button>
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">outfit ideas</button>
                <button className=" bg-gray-200 h-8 mb-2 flex rounded px-6 py-1 text-black hover:bg-gray-300">rock climbing</button>
            </div>
            

            {/* PICTUREEESSSSSSSSSSSSS */}
            <div className="container">
                {/* <div className="grid grid-cols-3 gap-2 place-items-stretch h-56 ..."> */}
                {/* </div> */}

                <div className="grid grid-cols-3 gap-2 place-items-stretch h-56 ... md:grid-cols-3">
                <div>
                    {/* <img className="h-50 w-50  rounded-lg" src="eximg\cat1.png" alt=""/> */}
                    <img src="https://images.unsplash.com/photo-1600354587397-681c16c184bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    {/* <img className="h-auto max-w-full rounded-lg" src="eximg\celebrity.png?w=500&h=500&fit=crop" alt=""/> */}
                    <img src="https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://plus.unsplash.com/premium_photo-1677087121676-2acaaae5b3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1508515053963-70c7cc39dfb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1617191519105-d07b98b10de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1579158951805-53f80485ed44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1644421439741-712c7fde7e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=891&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1645527898423-a9654db8d29a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1597589022928-bb4002c099ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1615485737651-580c9159c89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=881&q=80" alt=""/>
                </div>
                <div>
                    <img src="https://plus.unsplash.com/premium_photo-1661583774985-f952ba8b7a71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt=""/>
                </div>
                <br></br>
                </div>



            </div>

            
        
        
        </div>
        </div>
    )
}

export default explore;