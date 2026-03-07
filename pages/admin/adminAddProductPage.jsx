import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../utils/mediaUpload";

export default function AdminAddProductPage(){

    const [productID, setproductID] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("Others");
    const [brand, setBrand] = useState("Standard");
    const [model, setModel] = useState("");
    const [isVisible, setisVisible] = useState(true);
    const [files , setFiles] = useState([]);
    const navigate = useNavigate()

    async function handleAddProduct(){
        try {
            if(productID == ""){
            toast.error("Product ID cannot be empty");
            return;
            }
            if(name == ""){
                toast.error("Product name cannot be empty");
                return;
            }
                        
            if(description == ""){
                toast.error("Product description cannot be empty");
                return;
            }
            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be logged in to add a product");
                window.location.href = "/login";
                return;
            }

            const fileUploadPromises = [];
            
            for(let i=0 ; i<files.length ; i++){
            
            fileUploadPromises[i] = uploadFile(files[i])

            } 
            const imageURLs = await Promise.all(fileUploadPromises);

            // "sound,base,audio,bluetooth"
            // altNames.split(",") => ["sound","base","audio","bluetooth"]
            await axios.post(import.meta.env.VITE_API_URL + "/products",{
                productID: productID,
                name: name,
                description: description,
                price: price,
                labelledPrice: labelledPrice,
                altNames:altNames.split(","),
                images:imageURLs,
                category: category,
                brand: brand,
                model:model,
                isVisible: isVisible
            },{
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product added successfully!");
            
            // Redirect to the products page after successful addition
            navigate("/admin/products");

        }
        catch (error) {
            // console.error("CREATE PRODUCT ERROR:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Failed to add product");
            return;
        }

    }


    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track">
            <h1 className="w-full text-3xl font-bold mb-4 sticky top-0 bg-primary">Add New Product</h1>
            <div className="w-[50%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Product ID</label>
            <input value = {productID} 
            onChange={
                (e)=>{
                    setproductID(e.target.value)
                }
            }
            type="text" placeholder="Ex: ID001" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white"/>
            </div>

            {/* Product Name -------------------------------------------*/}
            <div className="w-[50%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Product Name</label>
            <input value = {name}
            onChange={
                (e)=>{
                    setName(e.target.value)
                }
            }
            type="text" placeholder="Ex: Laptop" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white"/>
            </div>

            {/* Description -------------------------------------------*/}
            <div className="w-full h-[170px] flex flex-col">
            <label className="text-xl font-bold ml-2">Description</label>
            <textarea value = {description}
            onChange={
                (e)=>{
                    setDescription(e.target.value)
                }
            }
            type="text" placeholder="Type here..." className="h-[100px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white"/>
            </div>

            {/* Add Images---------------------------------------------------- */}
            <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold ml-2">Images</label>
                <input multiple 
                onChange={
                    (e)=>{
                        setFiles(e.target.files)
                    }
                }
                
                type="file" className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2 focus:outline-white"/>
            </div>

            {/* Alternative Names -------------------------------------------*/}
            <div className="w-full h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Alternative Names (Comma Separated)</label>
            <input value = {altNames}
            onChange={
                (e)=>{
                    setAltNames(e.target.value)
                }
            }
            placeholder="Ex: Laptop, Notebook, Portable Computer" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white"/>
            </div>
            
            {/* Price -------------------------------------------*/}
            <div className="w-[50%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Price</label>
            <input value = {price}
            onChange={
                (e)=>{
                    setPrice(e.target.value)
                }
            }
            type="number" placeholder="250000" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white"/>
            </div>

            {/* LabelledPrice Price -------------------------------------------*/}
            <div className="w-[50%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Labled Price</label>
            <input value = {labelledPrice}
            onChange={
                (e)=>{
                    setLabelledPrice(e.target.value)
                }
            }
            type="number" placeholder="280000" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white"/>
            </div>

            {/* Category -------------------------------------------*/}
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Category</label>
            <select value = {category}
            onChange={
                (e)=>{
                    setCategory(e.target.value)
                }
            }
            className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white">
                <option value="Laptops">Laptops</option>
                <option value="Desktops">Desktops</option>
                <option value="Monitors">Monitors</option>
                <option value="Printers">Printers</option>
                <option value="Accessories">Accessories</option>
                <option value="Others">Others</option>
        
            </select>    
            </div>

            {/* Brand -------------------------------------------*/}
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Brand</label>
            <select value = {brand}
            onChange={
                (e)=>{
                    setBrand(e.target.value)
                }
            }
            className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2  focus:outline-white">
                <option value="Standard">Standard</option>
                <option value="HP">HP</option>
                <option value="Dell">Dell</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Asus">Asus</option>
                <option value="Acer">Acer</option>
                <option value="Apple">Apple</option>
                <option value="Logitech">Logitech</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Others">Others</option>
        
            </select> 
            </div>

            {/* Model -------------------------------------------*/}
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Model</label>
            <input value = {model}
            onChange={
                (e)=>{
                    setModel(e.target.value)
                }
            }
            type="text" placeholder="Ex: Inspiron 15" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white"/>   
            </div>

            {/* Is Visible -------------------------------------------*/}
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Is Visible</label>
            <select value = {isVisible}
            onChange={
                (e)=>{
                    setisVisible(e.target.value === "true")
                }
            }
            placeholder="True" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 focus:outline-white">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>    
            </div>

            <div className="w-full h-[80px] bg-white sticky bottom-0 rounded-b-2xl flex justify-end items-center p-4">
                <button onClick={handleAddProduct} className="bg-accent text-white font-bold py-2 px-4 rounded-[10px] hover:bg-blue-500">Add Product</button>
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-[10px] hover:bg-red-600 ml-4">Cancel</button>

            </div>


        </div>
    )
}
