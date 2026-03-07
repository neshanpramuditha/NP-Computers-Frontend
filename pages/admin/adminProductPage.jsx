import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-format";
import axios from "axios";

const sampleProducts = [
  {
    productID: "P1001",
    name: "Wireless Bluetooth Headphones",
    description: "High quality wireless headphones with noise cancellation.",
    altNames: ["Bluetooth Headset", "Wireless Headphones"],
    price: 12500,
    labelledPrice: 15000,
    category: "Electronics",
    images: [
      "/images/headphones-1.png",
      "/images/headphones-2.png"
    ],
    isVisible: true,
    brand: "Sony",
    model: "WH-CH520",
    qty: 50
  },
  {
    productID: "P1002",
    name: "Gaming Mouse RGB",
    description: "Ergonomic gaming mouse with customizable RGB lighting.",
    altNames: ["RGB Mouse", "Gaming Mouse"],
    price: 4500,
    labelledPrice: 5500,
    category: "Accessories",
    images: [
      "/images/mouse-1.png",
      "/images/mouse-2.png"
    ],
    isVisible: true,
    brand: "Logitech",
    model: "G102",
    qty: 75
  },
  {
    productID: "P1003",
    name: "Mechanical Keyboard",
    description: "Mechanical keyboard with blue switches for tactile feedback.",
    altNames: ["Gaming Keyboard", "Mech Keyboard"],
    price: 9800,
    labelledPrice: 11500,
    category: "Accessories",
    images: [
      "/images/keyboard-1.png",
      "/images/keyboard-2.png"
    ],
    isVisible: true,
    brand: "Redragon",
    model: "K552",
    qty: 40
  },
  {
    productID: "P1004",
    name: "Smart Watch Series 7",
    description: "Fitness tracking smartwatch with heart rate monitor.",
    altNames: ["Fitness Watch", "Smartwatch"],
    price: 22000,
    labelledPrice: 25000,
    category: "Wearables",
    images: [
      "/images/smartwatch-1.png",
      "/images/smartwatch-2.png"
    ],
    isVisible: true,
    brand: "Apple",
    model: "Series 7",
    qty: 30
  },
  {
    productID: "P1005",
    name: "Portable Power Bank 20000mAh",
    description: "High capacity power bank with fast charging support.",
    altNames: ["Power Bank", "Portable Charger"],
    price: 6500,
    labelledPrice: 7500,
    category: "Electronics",
    images: [
      "/images/powerbank-1.png",
      "/images/powerbank-2.png"
    ],
    isVisible: true,
    brand: "Anker",
    model: "PowerCore 20000",
    qty: 60
  }
];

export default function AdminProductPage(){

    const[products,setProducts] = useState(sampleProducts);
    
    useEffect(
      ()=>{
            const token = localStorage.getItem("token");
    
    axios.get(import.meta.env.VITE_API_URL + "/products" ,{
        headers: {
            Authorization: "Bearer " + token
        }
    }).then((response) => {
        setProducts(response.data);
    })
      }, []
    )

    return(
        <div className="w-full h-full overflow-hidden">
          <div className="p-6 bg-primary min-h-screen">
  <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">

    {/* Header */}
    <div className="px-6 py-4 bg-secondary text-white flex justify-between items-center">
      <h2 className="text-xl font-semibold">Product List</h2>
      <span className="bg-accent px-3 py-1 rounded-full text-sm">
        {products.length} Products
      </span>
    </div>

    {/* Scrollable Table */}
    <div className="max-h-[500px] overflow-y-auto overflow-x-auto">

      <table className="min-w-full text-sm text-left">

        {/* Sticky Head */}
        <thead className="bg-primary text-secondary uppercase text-xs sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4">Product ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Labelled Price</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Visibility</th>
            <th className="px-6 py-4">Brand</th>
            <th className="px-6 py-4">Model</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y">
          {products.map((item, index) => (
            <tr
              key={item.productID || `product-${index}`}
              className="hover:bg-primary/40 transition"
            >
              <td className="px-6 py-4 font-medium text-secondary">
                {item.productID}
              </td>

              <td className="px-6 py-4 font-semibold">
                {item.name}
              </td>

              <td className="px-6 py-4 text-accent font-semibold">
                {getFormattedPrice(item.price)}
              </td>

              <td className="px-6 py-4 line-through text-gray-400">
                {getFormattedPrice(item.labelledPrice)}
              </td>

              <td className="px-6 py-4">
                <span className="bg-primary text-secondary px-3 py-1 rounded-full text-xs">
                  {item.category || "Uncategorized"} 
                </span>
              </td>

              <td className="px-6 py-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border shadow-sm"
                />
              </td>

              <td className="px-6 py-4">
                {item.isVisible ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Visible
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                    Hidden
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-secondary whitespace-nowrap">
                {item.brand || <span className="text-secondary/40">N/A</span>}
                </td>

              <td className="px-6 py-4 text-secondary whitespace-nowrap">
                {item.model || <span className="text-secondary/40">N/A</span>}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  </div>
</div>
            <Link to = "/admin/add-product" className="text-white  bg-accent w-[50px] h-[50px] flex justify-center items-center rounded-[15px] hover:rounded-full fixed bottom-12 right-12">
                <FaPlus />
            </Link>
        </div>
    )

}