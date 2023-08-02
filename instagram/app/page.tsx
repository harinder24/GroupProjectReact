"use client";

import './mainPage.css'
import Nav from "@/app/nav/page";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const Home: React.FC = () => {
  return (
    <>
  
      <div className="flex bg-white dark:bg-black min-h-screen">
        
        <div className=" sticky top-0 max-[770px]:relative max-[770px]:top-auto">

    <Nav />

          </div >
          
        <div id="mainPageMainContent" className=" flex-grow flex justify-center gap-x-[64px] pt-12 max-[770px]:pt-0">
        <div className='flex flex-col justify-start items-center'>
         
        <div className='h-[64px] flex flex-row w-screen p-4 mb-5 secondaryNav items-center justify-between border-[var(--border)] border-b-[1px] border-solid'>
          <img src="/instagramlogotext.png" className=' h-[29px] w-[103px] object-cover object-navinstalogo dark:object-navinstalogodark ' alt="" />
          <div className='flex gap-2' >
          <AddBoxOutlinedIcon className='' />
          <FavoriteBorderOutlinedIcon className='' />
          </div>
        </div>
          
          <div className="w-[630px] flex flex-col max-[640px]:w-screen" >
          
              <div id="InstaStories" className=" w-full flex flex-row gap-4 overflow-auto pb-4 ">
                
                <Story/><Story/><Story/><Story/><Story/><Story/><Story/><Story/><Story/><Story/><Story/><Story/><Story/>

              </div>
              <div className='flex flex-col w-full items-center'>
                  <div className='w-[470px] max-[480px]:w-screen'>
                    <div className='flex flex-row px-2 w-full gap-2 h-[58px] items-center justify-between'>
                      <div className='flex flex-row items-center gap-2'>
                      
                            <img className="rounded-full object-cover  h-[32px] w-[32px]" src="https://th.bing.com/th/id/R.7383028831604862ec47fefee3e8f43f?rik=JvqjDCfPocchLg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fimages-of-nature-4.jpg&ehk=%2b1REJDS0cEPD0z2IP%2fddCyP9IgFz6xVpp8fyQr78SJ0%3d&risl=&pid=ImgRaw&r=0" alt="" />
                         
                          <div>
                              <span className=' text-sm font-medium'>Memeacc</span> <span className=' text-xs font-normal text-gray-500'> &#8226; 9 ago </span>
                          </div>
                      </div>
                      <div>
                        <MoreHorizIcon/>
                      </div>
                    </div>
                    <img src="https://th.bing.com/th/id/R.7383028831604862ec47fefee3e8f43f?rik=JvqjDCfPocchLg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fimages-of-nature-4.jpg&ehk=%2b1REJDS0cEPD0z2IP%2fddCyP9IgFz6xVpp8fyQr78SJ0%3d&risl=&pid=ImgRaw&r=0" className='px-2 w-full' alt="" />
                    <div className='flex flex-row w-full justify-between'>
                      <div>
                        <FavoriteBorderOutlinedIcon className='p-2 w-[42px] h-[42px]'/>
                        <AddCommentOutlinedIcon className='p-2  w-[42px] h-[42px]' />
                        <SendOutlinedIcon className='p-2  w-[42px] h-[42px]'/>
                        </div>
                        <div className='self-end'>
                        <BookmarkBorderOutlinedIcon className='p-2  w-[42px] h-[42px] self-end'/>
                        </div>
                    </div>
                    <div className='p-2 pb-0 text-sm'>
                      Liked by <span className=' font-semibold'>Elon Musk</span> and <span  className=' font-semibold'>others</span>
                    </div>
                    <div className='p-2 pb-0 text-sm'>
                      <span className=' font-semibold'>Memeacc </span> Elon Musk rn...
                    </div>
                    <div className='p-2 pb-0 text-sm text-gray-500'>
                      more
                    </div>
                    <div className='p-2 pb-0 text-base text-gray-500'>
                      View all 3 comments
                    </div>
                    <div className='p-2 pb-4 border-[var(--border)] border-b-[1px] border-solid text-base text-gray-500'>
                      Add a comment..
                    </div>
                  </div>
              </div>
          </div>
          </div>
          <div className='w-[320px] flex flex-col max-[1160px]:hidden'>
               <div className='w-full h-[56px] mb-2 flex justify-between items-center'>
                <div className='flex flex-row gap-3 items-center'>
                    <img className='h-[56px] w-[56px] object-cover rounded-full' src="https://th.bing.com/th/id/OIP.Ghae4OEdb4UmC3hkqpFvLAHaGd?pid=ImgDet&rs=1" alt="" />
                    <div className=' font-semibold text-sm'>Yeee.hawww</div>
                </div>
                <div className='font-semibold text-xs text-sky-500'>
                  Switch
                </div>
               </div>
               <div className='w-full flex justify-between items-center mb-[10px]'>
                  <div className='font-semibold text-sm text-gray-500'>
                      Suggestions for you
                  </div>
                  <div className='text-xs font-semibold'>
                      See all
                  </div>
               </div>
               <Suggestions/><Suggestions/><Suggestions/><Suggestions/>

               <div className='mt-6 text-[12px] text-gray-300 w-full'>
                About &#8226; Help &#8226; Press &#8226; API &#8226; Jobs &#8226; Privacy &#8226; Terms &#8226; Locations &#8226; Language &#8226; Meta Verified
               </div>
          </div>
          </div>
        </div>
        </>
  );
};


const Story = () => {
  return(
    <div className=" flex flex-col">
                  <div className="relative w-16 h-16">
                    <img src="https://twibbon.blob.core.windows.net/twibbon/2017/349/bfce11cf-20e8-48b9-ab19-bb43247b89c8.png" className="w-16 h-16 absolute top-0" alt="" />
                    <div className="rounded-full absolute  h-[56px] w-[56px] top-[4px] left-[4px]">
                    <img src="https://th.bing.com/th/id/R.7383028831604862ec47fefee3e8f43f?rik=JvqjDCfPocchLg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fimages-of-nature-4.jpg&ehk=%2b1REJDS0cEPD0z2IP%2fddCyP9IgFz6xVpp8fyQr78SJ0%3d&risl=&pid=ImgRaw&r=0" className="object-cover h-[56px] w-[56px] rounded-full" alt="" />
                    </div>
                  </div>
                  <div className="w-16 h-4 overflow-hidden text-xs flex justify-center">
                    ashca
                  </div>
                </div>
  )
}

const Suggestions = () =>{
  return (
    <div className='flex justify-between items-center w-full m-2 mx-0'>
                <div className='flex items-center flex-row gap-2'>
                  <img className='w-[32px] h-[32px] rounded-full object-cover' src="https://th.bing.com/th/id/OIP.Ghae4OEdb4UmC3hkqpFvLAHaGd?pid=ImgDet&rs=1" alt="" />
                  <div className='flex flex-col justify-center'>
                    <div className='text-[12px] font-semibold'>
                      RobinHood
                    </div>
                    <div className='text-[12px] text-gray-500'>
                        Followed by Drake
                    </div>
                  </div>
                </div>
                <div className='font-semibold text-xs text-sky-500'>
                  Follow
                </div>
               </div>
  )
}

export default Home;
