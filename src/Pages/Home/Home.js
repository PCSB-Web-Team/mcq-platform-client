import React from "react";
// import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full flex justify-center absolute top-0 left-0 text-center w-full p-4">
      <div className="h-[80%] text-center flex flex-col backdrop-blur-sm justify-center w-full m-auto space-y-4 bg-gradient-to-b from-gray-400/20 to-gray-500/20">
        <div>
          <img
            className=" w-80 md:w-[300px] mx-auto"
            src="https://www.vdm.ford.com/content/dam/na/ford/en_us/images/mustang/2025/jellybeans/Ford_Mustang_2025_200A_PJS_883_89W_13B_COU_64F_99H_44U_EBST_YZTAC_DEFAULT_EXT_4.png"
            alt="pict logo"
          ></img>
        </div>
        <div className="text-6xl tracking-widest text-white font-extralight">
          MCQ Platform
        </div>
        {/* <div className="grid grid-cols-2 mx-auto gap-6 py-4">
          <a href="https://pcsbxenia.com/" rel="noreferrer" target="_blank">
            <div className="h-[200px] w-[300px] bg-gray-50"></div>
          </a>
          <a href="https://pcsbxenia.com/" rel="noreferrer" target="_blank">
            <div className="h-[200px] w-[300px] bg-gray-50"></div>
          </a>
        </div> */}
      </div>
    </div>
  );
}
