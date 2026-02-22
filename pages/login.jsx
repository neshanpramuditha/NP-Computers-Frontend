import { Link } from "react-router-dom";

export default function LoginPage(){
    return(
        <div className="w-full h-full bg-[url(/background.jpg)] bg-cover bg-center no-repeat flex">
            <div className="w-[50%] h-full flex justify-center items-center flex-col">
                <img src="/logo.png" alt="logo" className="w-[400px] h-[400px] object-center"/>
                <h1 className="text-white text-4xl font-bold mt-5">N Computers</h1>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-md shadow-2xl rounded-lg flex-col justify-center items-center text-center text-white">
                    <input type="text" placeholder="Username" className="w-[80%] h-12 mx-auto mt-32 rounded-md px-4 text-lg outline-none border-2"/>
                    
                    <input type="password" placeholder="Password" className="w-[80%] h-12 mx-auto mt-8 rounded-md px-4 text-lg outline-none border-2"/>
                    <p className="w-full text-white text-right pr-[45px] mt-[5px]"> Forgot Password? <Link to="/forgot-password" className="text-accent hover:underline font-bold">Reset</Link></p>
                    
                    <button className="w-[80%] h-12 mx-auto mt-12 bg-accent text-white font-bold rounded-lg text-lg hover:bg-blue-500 transition">Login</button>
                    <button className="w-[80%] h-12 mx-auto mt-5 border-2 border-accent text-white font-bold rounded-lg text-lg hover:bg-blue-500 transition ">Login With Google</button>
                    <p className="text-right pr-[45px] mt-[5px]">Don't have an account
                        <Link to="/register" className="text-accent hover:underline font-bold"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}