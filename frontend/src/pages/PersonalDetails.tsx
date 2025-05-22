import { useContext, useEffect, useState } from "react"
import TopBar from "../component/TopBar"
import { UserContext } from "../context/UserContext"
import { colorMap } from "../App"
import { RiLoginBoxFill } from "react-icons/ri";
import { DiScala } from "react-icons/di";
//@ts-ignore
import platform from 'platform'

export interface DeviceInfo {
  browser: string;
  os: string;
  layout: string;
  manufacturer?: string;
  product?: string;
  description: string;
}

export const getDeviceInfo = (): DeviceInfo => {
  return {
    browser: `${platform.name} ${platform.version}`,
    os: `${platform.os?.family} ${platform.os?.version}`,
    layout: platform.layout ?? "unknown",
    manufacturer: platform.manufacturer,
    product: platform.product,
    description: platform.description ?? "",
  };
};



function PersonalDetails() {
    const context=useContext(UserContext);
     const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

   useEffect(() => {
    setDeviceInfo(getDeviceInfo());
    console.log(getDeviceInfo())
   }, []);
  return (
    <>
    <TopBar navigate="/setting" value="Personal Details"/>
    <div className="flex flex-col items-center  w-full ">
       <div className="h-auto w-full md:w-[70%] xl:w-[50%] flex justify-center mt-4  gap-2 px-6 flex-col "> 
        <div className="w-full h-20 border rounded-xl flex  px-4 py-3 gap-3 mt-5">
            <div className={`${colorMap[context?.user.picture || 0]} w-13 h-13 rounded-full flex justify-center items-center text-white text-lg`}>{context?.user.name.charAt(0)}</div>
            <div className="">
            <h1 className="font-bold mt-1.5">Profile</h1>
            <h1 className="text-lg mt-[-8px]">{context?.user.name}</h1>
            </div>
        </div> 
        <div className=" mt-1">
            <h1 className="text-lg text-gray-600">Account info</h1> 
            <div className="mt-2 border  rounded-xl">
                <div className="border-b w-full px-4 py-2">
                    <h1 className="flex items-center text-lg gap-2   tracking-wider"><RiLoginBoxFill/>Login details </h1>
                <h1 className="ml-8 tracking-wide text-sm">Device: {deviceInfo?.product}</h1>
                <h1 className="ml-8 tracking-wide text-sm">Browser: {deviceInfo?.browser.split(" ")[0]}</h1>

                </div>
                <h1 className="flex items-center text-lg gap-2  px-4 py-2 tracking-wider"><DiScala/>Joined details</h1>
                <h1 className="text-sm ml-10 mt-[-8px]  pb-2">{context?.user.createdAt.split('T')[0]}</h1>
            </div>
        </div> 
       </div>
    </div>
    </>
  )
}

export default PersonalDetails