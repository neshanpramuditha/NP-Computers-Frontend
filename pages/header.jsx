import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import UserData from "../src/components/userdata";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuPanelRightClose } from "react-icons/lu";

export default function Header(){

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return () => {
        document.body.style.overflow = "auto";
    };
}, [isOpen]);

    return(
        <header className="w-full sticky top-0 bg-accent/95 backdrop-blur-md shadow-md h-[60px] flex justify-center items-center z-55 border-b border-white/10">
            
            {/* Mobile Menu Icon */}
            <GiHamburgerMenu 
                onClick={()=>{setIsOpen(true)}} 
                size={28} 
                color="white" 
                className="absolute right-5 lg:hidden cursor-pointer hover:scale-110 transition-transform duration-200"
            />

            {/* Logo */}
            <div className="h-full flex items-center absolute left-4 gap-2">
                <Link to="/">
                <img src="/logo2.png" alt="logo" className="h-[36px] lg:h-[42px] object-contain drop-shadow-sm" />
                </Link>
                <h1 className="text-white text-lg lg:text-1xl font-semibold tracking-wide">NP Computers</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="h-full lg:flex justify-center items-center hidden gap-6">
                <Link to="/" className="text-white/90 text-md font-medium relative group">
                    Home
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <Link to="/products" className="text-white/90 text-md font-medium relative group">
                    Products
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <Link to="/about" className="text-white/90 text-md font-medium relative group">
                    About
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <Link to="/contact" className="text-white/90 text-md font-medium relative group">
                    Contact
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </div>

            {/* Right Section */}
            <div className="absolute right-10 lg:flex hidden h-full items-center gap-6">
                <Link to="/cart" className="relative group">
                    <MdOutlineShoppingCart 
                        size={26} 
                        color="white" 
                        className="transition-transform duration-200 group-hover:scale-110"
                    />
                </Link>

                <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <UserData/>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isOpen &&
            <div className="fixed bg-black/60 backdrop-blur-sm w-full h-screen top-0 left-0 transition-opacity duration-300 z-99">
                
                <div className="absolute right-0 top-0 w-[300px] h-full bg-white shadow-2xl rounded-l-2xl flex flex-col">

                    {/* Sidebar Header */}
                    <div className="h-[60px] bg-accent flex items-center px-4 relative shadow-md">
                        <img src="/logo2.png" alt="logo" className="h-[36px]" />
                        <h1 className="text-white text-lg font-semibold ml-2">NP Computers</h1>

                        <LuPanelRightClose 
                            onClick={()=>{setIsOpen(false)}} 
                            size={26} 
                            color="white" 
                            className="absolute right-4 cursor-pointer hover:rotate-90 transition-transform duration-300"
                        />
                    </div>

                    {/* Sidebar Links */}
                    <div className="flex flex-col mt-6 px-6 gap-5 text-gray-700 font-medium">
                        <a href="/" className="hover:text-accent transition-colors cursor-pointer">Home</a>
                        <a href="/products" className="hover:text-accent hover:border-b-2 hover:border-accent transition-colors cursor-pointer">Products</a>
                        <a href="/about" className="hover:text-accent transition-colors cursor-pointer">About</a>
                        <a href="/contact" className="hover:text-accent transition-colors cursor-pointer">Contact</a>
                        <a href="/login" className="hover:text-accent transition-colors cursor-pointer">Login</a>
                        <a href="/register" className="hover:text-accent transition-colors cursor-pointer">Register</a>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto p-6  border-t border-accent flex items-center justify-between">
                        <a href="/cart" className="flex items-center gap-2 text-accent font-medium hover:text-blue-500 cursor-pointer">
                            <MdOutlineShoppingCart size={22} />
                            Cart
                        </a>

                        <UserData/>
                    </div>

                </div>
            </div>
            }

        </header>
    )
}