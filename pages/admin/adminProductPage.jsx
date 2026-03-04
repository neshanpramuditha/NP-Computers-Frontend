import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
    
    return(
        <div className="w-full h-full overflow-y-scroll">
          {
            products.map(
              (item, index)=>{
                return <h1 key={item.productID}> {item.name} </h1>
              }
            )
          }
            <Link to = "/admin/add-product" className="text-white  bg-accent w-[50px] h-[50px] flex justify-center items-center rounded-[15px] hover:rounded-full fixed bottom-12 right-12">
                <FaPlus />
            </Link>
        </div>
    )

}