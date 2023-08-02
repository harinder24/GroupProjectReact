import NavBar from './Navbar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './explore.css'

const Explore = () => {
    const exploreImgs =[
        {
            image: "src/public/eximg/cars.jpg",
            text: "4"
        },
        {
            image: "src/public/eximg/meme.png",
            text: "55"
        },
        {
            image: "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1677087121676-2acaaae5b3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
        },
        {
            image: "src/public/eximg/shoes.png"
        },
        {
            image: "https://images.unsplash.com/photo-1617191519105-d07b98b10de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
        },
        {
            image: "https://images.unsplash.com/photo-1579158951805-53f80485ed44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
        },
        {
            image: "https://images.unsplash.com/photo-1644421439741-712c7fde7e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=891&q=80"
        },
        {
            image: "src/public/eximg/twt2.png"
        },
        {
            image: "https://images.unsplash.com/photo-1597589022928-bb4002c099ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
        },
        {
            image: "https://images.unsplash.com/photo-1615485737651-580c9159c89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=881&q=80"
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1661583774985-f952ba8b7a71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
        }
    ]

    return(
        <div className="flex dark:bg-black">
        <NavBar/>

        <div id='exploreMainContect' className=" container px-2 flex flex-col mx-auto h-screen overflow-auto">

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

            <div className='conatiner grid grid-cols-3 gap-2'>
                {
                    exploreImgs.map((photo, index) =>{
                        return(
                            <div className='pics'>
                            <img
                                src={photo.image}
                                key={index}
                                alt={photo.text}
                                //className='w-full h-full object-cover '
                                className='pics'
                                
                                 
                            />
                            
                            </div>
                            
                            
                            
                        );
                    })
                }
            </div>
        
        </div>
        </div>
    )
}

export default Explore;