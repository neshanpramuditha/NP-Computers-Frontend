import { useState } from "react";

export default function ImageSlideShow(props){
    const images = props.images;
    const [selectedImage, setSelectedImage] = useState(0);

    return(
        <div className="w-[500px] h-[600px] flex flex-col gap-4">

            {/* Main Image */}
            <div className="w-full h-[500px] rounded-xl overflow-hidden">
                <img 
                    src={images[selectedImage]} 
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
            </div>
            
            {/* Thumbnail Row */}
            <div className="w-full h-[90px] flex flex-row px-2 gap-3 overflow-x-auto justify-center ">
                {
                    images.map((img, index)=>{
                        return(
                            <img
                                key={index}
                                src={img}
                                onClick={()=>setSelectedImage(index)}
                                className={`w-[80px] h-[80px] object-cover rounded-[20px] cursor-pointer border-3 transition duration-200
                                ${
                                    selectedImage === index
                                    ? "border-red-600 scale-104"
                                    : "border-accent opacity-80 hover:opacity-100"
                                }`}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}