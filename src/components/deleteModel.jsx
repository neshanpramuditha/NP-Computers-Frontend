import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";

export default function DeleteModel(props){
    const [isVisible, setIsVisible] = useState(false);

    const product = props.products;
    const setLoading = props.setLoading;
    return(
        <div>
            <CiTrash onClick={()=>{setIsVisible(true)}} className="hover:text-red-600 cursor-pointer"/>
            {
                isVisible && (
                    <div className="fixed z-100 bg-black/50 w-screen h-screen top-0 left-0 flex justify-center items-center">
                        <div className="w-[400px] h-[200px] bg-white rounded-lg relative">
                            <button onClick={
                                ()=>{setIsVisible(false)}
                            }
                            className="w-[40px] h-[40px]  text-red-600 absolute right-0 rounded-tr-lg text-sm font-bold hover:bg-red-600 hover:text-white cursor-pointer">
                                X
                            </button>
                            <h2 className="text-xl font-bold text-center mt-8">Are you sure you want to delete the product ID {product.productID} ?</h2>

                            <div className="flex justify-center items-center gap-5 mt-10">
                                <button className="bg-red-600 text-white text-lg px-3 py-1 rounded hover:bg-red-700"
                                onClick={
                                    ()=>{
                                        const token = localStorage.getItem("token")
                                        axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productID, {
                                            headers: {Authorization: "Bearer " + token}
                                        }).then(()=>{
                                            setIsVisible(false);
                                            toast.success("Product deleted successfully!");
                                            setLoading(true);
                                        }).catch((error)=>{
                                            toast.error(error.response?.data?.message || "Failed to delete product");
                                            setIsVisible(false);
                                        })
                                    }}
                                >Delete</button>
                                <button className="bg-gray-300 text-black text-lg px-3 py-1 rounded hover:bg-gray-400"
                                onClick={()=>{setIsVisible(false)}}>Cancel</button>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}