import axios from "axios";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function UserData(){

    const [user, setUser] = useState(null)
    const [state, setState] = useState("me")

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")

            if(token != null){
                axios.get(import.meta.env.VITE_API_URL+"/users/profile", {
                    headers:{
                        Authorization: "Bearer "+token
                    }
                }).then(
                    (response)=>{
                        console.log(response.data)
                        setUser(response.data)
                    }
                )
            }
        }, []
    )
    return(
        <>
        {
        user == null?<div className="w-[150px] h-[50px] flex justify-center items-center">
            <Link to="/login" className="text-white text-lg mx-4 hover:border-b-2">Login</Link>
            <Link to="/register" className="text-white text-lg mx-4 hover:border-b-2">Register</Link>
        </div>:
        <div className="w-[150px] h-[50px] border-1 border-white flex justify-between items-center rounded-full overflow-hidden shadow-2xl">
                
                <img src={user.images || "/images/default-profile.png"} alt="profile" className="w-[50px] h-[50px] object-cover"/>
                

            <select value={state} onChange={
                (e)=>{
                    setState(e.target.value)

                    if(e.target.value=="orders"){
                        window.location.href="/my-orders"
                    }
                    if(e.target.value=="settings"){
                        window.location.href="/settings"
                    }
                    if(e.target.value=="logout"){
                        localStorage.removeItem("token")
                        window.location.href="/login"
                    }
                    setState("me")
                }

            }
            className="bg-accent text-white">
                <option value="me" className="text-white p-2">{user.firstName}</option>
                <option value="orders" className="text-white p-2">My orders</option>
                <option value="settings" className="text-white p-2">Settings</option>
                <option value="logout" className="text-white p-2">Logout</option>
            </select>
        </div>
        }
        </>
    )
}