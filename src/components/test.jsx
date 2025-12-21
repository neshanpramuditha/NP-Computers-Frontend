export default function Test() {
    return (
        <>
        <div className="w-[600px] h-[600px] border-4 relative">
          <div className = "w-[500px] h-[500px] bg-gray-300 flex flex-row justify-evenly items-center">
            <div className="w-[75px] h-[75px] bg-blue-600"/>
            <div className="w-[75px] h-[75px] bg-yellow-400 absolute top-[0px] right-[8px] z-10"/> {/*absolute, fixed position වලට use කරන්න පුළුවන් - fix තරම් මුරණ්ඩු නෑ  */}
            <div className="w-[75px] h-[75px] bg-green-400 fixed top-[5px] left-[500px] z-10"/> {/*right, left, top, bottum ඕන විදිහකට align කරගන්න පුළුවන් */}
            <div className="w-[75px] h-[75px] bg-red-400"/>
            <div className="w-[75px] h-[75px] bg-black"/>
            <div className="w-[75px] h-[75px] bg-cyan-400"/>
          </div>
        </div>
        </>
    )
}