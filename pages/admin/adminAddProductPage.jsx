import { useState } from "react";

export default function AdminAddProductPage(){

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [discription, setDescription] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labledprice, setLabledPrice] = useState("");
    const [category, setCategory] = useState("Others");
    const [brand, setBrand] = useState("Standard");
    const [model, setModel] = useState("");
    const [isVisible, setIsVisible] = useState(true);


    return(
        <div className="w-full max-h-full flex flex-wrap">
            <div className="w-[50%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Product ID</label>
            <input value = {productId} 
            onChange={
                (e)=>{
                    setProductId(e.target.value)
                }
            }
            type="text" placeholder="Ex: ID001" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white"/>
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
            type="text" placeholder="Ex: Laptop" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white"/>
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
            type="text" placeholder="Type here..." className="h-[100px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white"/>
            </div>

            {/* Alternative Names -------------------------------------------*/}
            <div className="w-full h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Alternative Names</label>
            <input value = {altNames}
            onChange={
                (e)=>{
                    setAltNames(e.target.value)
                }
            }
            type="text" placeholder="Ex: HP" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white"/>
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
            type="text" placeholder="250000" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white"/>
            </div>

            {/* Labled Price -------------------------------------------*/}
            <div className="w-[50%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Labled Price</label>
            <input value = {labledprice}
            onChange={
                (e)=>{
                    setLabledPrice(e.target.value)
                }
            }
            type="text" placeholder="280000" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white"/>
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
            type="text" placeholder="Laptop" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white">
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
            type="text" placeholder="HP" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white">
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
            type="text" placeholder="Ex: Inspiron 15" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white"/>   
            </div>

            {/* Is Visible -------------------------------------------*/}
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="text-xl font-bold ml-2">Is Visible</label>
            <select value = {isVisible}
            onChange={
                (e)=>{
                    setBrand(e.target.value)
                }
            }
            type="text" placeholder="True" className="h-[40px] border-4 border-accent rounded-[10px] p-2 m-2 flex  focus:outline-white">
                <option value="true">True</option>
                <option value="false">False</option>
            </select>    
            </div>


        </div>
    )
}
