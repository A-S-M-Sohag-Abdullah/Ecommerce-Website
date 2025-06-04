import { faAngleDown, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-10 w-full bg-[#070B1D] h-16 text-white flex items-center px-5 justify-between">
      <h1 className="text-2xl font-semibold text-yellow-300">
        <span className="text-blue-600">EX</span>
        <span className="text-white">CLUS</span>IVE
      </h1>

      <div className="flex space-x-7 items-center">
        <Image width={30} height={30} src="/chat.svg" alt="chat" />
        <div className="relative">
          <span className="size-4 font-semibold text-xs flex items-center justify-center bg-blue-600 rounded-full absolute top-[-5px] right-[-5px]">5</span>
          <Image width={20} height={20} src="/notification.svg" alt="chat" />
        </div>

        <div className="flex space-x-3 items-center">
          <h2 className="bg-green-400 text-2xl size-9 rounded-full flex items-center justify-center font-semibold">S</h2>  <span className="font-semibold">SOHAG ABDULLLAH</span> 
          <button className="size-5 flex items-center cursor-pointer"><FontAwesomeIcon icon={faAngleDown} /></button>
        </div>
      </div>
    </div>
  );
}
