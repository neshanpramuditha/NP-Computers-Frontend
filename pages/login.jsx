import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate(); // pages අතර smoothly මාරු වෙන්න portal එකක් හදාගන්න මේ hook එක පාවිච්චි කරනව

    async function login(){
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + "/users/login", {
                email: email,
                password: password
            })
            console.log(response)

            localStorage.setItem("token",response.data.token)

            if(response.data.role == "admin"){
                //Redirect to Admin dashboard
                //window.location.href = "/admin/" මේකෙදි පේජ් එකකින් පේජ් එකකට අයනකොට ස්මූත් නෑ - පරණ  කරමය මේක
                navigate("/admin/")
            }else{
                navigate("/")
            }
            // alert("Login successful")
            toast.success("Login successful")
        }
        catch(error){
            toast.error(error?.response?.data?. message || "Login failed. Please check your credentials and try again.")
        }
    }

    return(
        <div className="w-full h-full bg-[url(/background.jpg)] bg-cover bg-center no-repeat flex">
            <div className="w-[50%] h-full flex justify-center items-center flex-col">
                <img src="/logo.png" alt="logo" className="w-[400px] h-[400px] object-center"/>
                <h1 className="text-white text-4xl font-bold mt-5">N Computers</h1>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-md shadow-2xl rounded-lg flex-col justify-center items-center text-center text-white">
                    
                    <input type="email" placeholder="Email"
                        onChange={
                        (e)=>{
                            setEmail(e.target.value);
                        }
                    }
                    className="w-[80%] h-12 mx-auto mt-32 rounded-md px-4 text-lg outline-none border-2"/>
                    
                    <input type="password" placeholder="Password"
                    onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    }
                    className="w-[80%] h-12 mx-auto mt-8 rounded-md px-4 text-lg outline-none border-2"/>
                    <p className="w-full text-white text-right pr-[45px] mt-[5px]"> Forgot Password? <Link to="/forgot-password" className="text-accent hover:underline font-bold">Reset</Link></p>
                    
                    <button 
                    onClick={login}
                    className="w-[80%] h-12 mx-auto mt-12 bg-accent text-white font-bold rounded-lg text-lg hover:bg-blue-500 transition">Sign Up</button>
                    
                    <button className="w-[80%] h-12 mx-auto mt-5 border-2 border-accent text-white font-bold rounded-lg text-lg hover:bg-blue-500 transition ">Sign Up With Google</button>
                    <p className="text-right pr-[45px] mt-[5px]">Don't have an account
                        <Link to="/register" className="text-accent hover:underline font-bold"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}