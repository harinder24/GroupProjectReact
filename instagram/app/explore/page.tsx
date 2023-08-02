'use client'
import Nav from "../nav/page";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const explore = () => {
    return(
        <div className="flex">
        <Nav/>

        <div className=" container flex flex-col mx-auto">

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

                <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                <div>
                    <img className="h-50 w-50  rounded-lg" src="eximg\cat1.png" alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="eximg\celebrity.png?w=500&h=500&fit=crop" alt=""/>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="eximg\shoes.png?w=500&h=500&fit=crop" alt=""/>
                </div>
                </div>



            </div>

            
        
        
        </div>
        </div>
    )
}

export default explore;