'use client'
import Nav from "../nav/page";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const explore = () => {
    return(
        <div className="flex">
        <Nav/>

        {/* Search Bar */}
        <div className="flex flex-row h-8 items-center m-5 bg-gray-200 box-border rounded-[8px] px-2">
            <SearchOutlinedIcon className=" text-gray-500" />
            
            <input type="text"
                className=" bg-inherit text-gray-500 placeholder:text-gray-500 "
                placeholder="Search"
    
                />
            
        </div>
        
        
        </div>
    )
}

export default explore;