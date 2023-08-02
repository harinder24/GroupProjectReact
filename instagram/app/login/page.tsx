"use client";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

const Login: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/image1.png", "/image2.png", "/image3.png", "/image4.png"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const footerdata = [
    "Meta",
    "About",
    "Blog",
    "jobs",
    "Help",
    "API",
    "Privacy",
    "Terms",
    "Top Accounts",
    "Locations",
    "Instagram Lite",
    "Contact Uploading & Non-Users",
    "Meta Verified",
  ];
  return (
    <section className="min-h-screen bg-white">
      <article className=" py-8 flex justify-center mx-auto w-full">
        <div className="bg-phone mb-2 bg-[length:468.32px_634.15px;] h-[581.15px] basis-[380.32px] self-center mr-8 bg-phoneimg box-border flex-grow-0 max-[785px]:hidden relative">
          <div className="relative ml-[113px] pt-0 flex flex-col box-border mt-[27px] align-baseline">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-[250px] h-[538.84px]"
            />
          </div>
        </div>
        <div className="text-black flex flex-col flex-grow justify-center mt-3 max-w-[350px] max-[380px]:w-full">
          <div className="flex bg-white shrink-0 flex-col items-center py-[10px] mb-[10px] align-baseline relative box-border border-solid border-[1px] border-[#dbdbdb] rounded-[1px] max-[380px]:rounded-none max-[380px]:border-0 max-[380px]:w-full">
            <div className="mt-9 overflow-y-visible mb-3 first-line: bg-transparent box-border flex flex-col shrink-0 items-stretch overflow-x-visible self-auto justify-start relative flex-grow-0 ">
              <i className="bg-igtextlogo bg-auto w-[175px] h-[51px] inline-block bg-iglogologin"></i>
            </div>
            <div className="mb-[10px] max-w-[350px] flex flex-grow max-[380px]:w-full justify-center">
              <form
                action=""
                method="post"
                className="flex flex-col align-baseline m-0 p-0 border-0 w-[266px] max-[380px]:w-full max-[380px]:px-2"
              >
                <div className="overflow-y-visible mt-6 bg-transparent flex flex-col box-border shrink-0 items-stretch self-auto grow-0 ">
                  <div className="mb-[6px] ">
                    <div className="text-[14px] border-solid border-[1px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] w-full box-border flex items-center text-black flex-row relative ">
                      <label
                        // htmlFor=""
                        className="h-9 relative align-baseline flex "
                      >
                        <input
                          placeholder="Email"
                          className=" pl-2 appearance-none bg-[#fafafa] w-[264px] flex-grow m-0 outline-none overflow-hidden pt-[9px] pr-[7px] text-[14px] pb-[8px] text-ellipsis font-medium max-[380px]:w-full"
                          type="text"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-[6px] ">
                    <div className="text-[14px] border-solid border-[1px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] w-full box-border flex items-center text-black flex-row relative ">
                      <label
                        // htmlFor=""
                        className="h-9 relative align-baseline flex"
                      >
                        <input
                          placeholder="Password"
                          className=" pl-2 appearance-none bg-[#fafafa] w-[264px] flex-grow m-0 outline-none overflow-hidden pt-[9px] pr-[7px] text-[14px] pb-[8px] text-ellipsis font-medium max-[380px]:w-full"
                          type="password"
                        />
                      </label>
                    </div>
                  </div>
                {/* <Link href="/"> */}
                  <button className="w-[265px] bg-sky-500 text-white py-1 mt-2 rounded-[7px] hover:bg-sky-600 font-semibold max-[380px]:w-full">
                    Log in
                  </button>
                  {/* </Link> */}
                </div>
              </form>
            </div>
            <div className="flex w-[256px] mt-2 mb-5 max-[380px]:w-full">
              <div className="top-[.45em] flex-shrink flex-grow h-[1px] relative bg-[#dbdbdb]"></div>
              <span className="flex-grow-0 text-xs px-4 text-gray-400 font-semibold">
                OR
              </span>
              <div className="top-[.45em] flex-shrink flex-grow h-[1px] relative bg-[#dbdbdb]"></div>
            </div>
            <div className="font-semibold text-sm text-blue-900">
              Login with facebook
            </div>
            <div className="text-xs text-blue-900 pt-4 pb-3">
              Forgot password?
            </div>
          </div>

          <div className="bg-white items-center box-border flex flex-col shrink-0 relative align-baseline border-solid border-[1px] border-[#dbdbdb] rounded-[1px] max-[380px]:border-0 max-[380px]:rounded-none">
            <span>
              <p className=" text-black m-[20px] text-[14px] text-center">
                Don't have an account?{" "}
                <a className=" text-sky-500" href="/signup">
                  Sign up
                </a>
              </p>
            </span>
          </div>

          <div className=" flex flex-col">
            <p className=" my-[10px] mx-[20px] text-[14px] text-black text-center align-baseline">
              Get the app.
            </p>
            <div className=" flex flex-row gap-2 my-[10px] justify-center max-[380px]:flex-wrap">
              <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D300EA2EC-5727-4CBF-8DAA-E80FF52EB07E%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge&pli=1">
                <img className="h-10" src="/playstore.png" alt="" />
              </a>
              <a href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1020">
                <img className="h-10" src="/microsoft.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </article>
      <footer className=" bg-white box-border flex px-4 relative items-stretch justify-center order-5 flex-shrink-0">
        <div className="box-border px-4 flex flex-wrap justify-center gap-x-3 text-[12px] text-gray-500 mb-5">
          {footerdata.map((data) => {
            return <a href="">{data}</a>;
          })}
        </div>
        <div></div>
      </footer>
    </section>
  );
};

const DynamicPage = dynamic(() => Promise.resolve(Login), { ssr: false });

export default DynamicPage;
