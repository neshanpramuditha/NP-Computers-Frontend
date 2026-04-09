import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin(
    {
        onSuccess:(response)=>{
            axios.post(import.meta.env.VITE_API_URL+"/users/google-login", {token:response.access_token})
            
            .then((response)=>{
                toast.success("Google login successful!")
                localStorage.setItem("token", response.data.token)

                if(response.data.role == "admin"){
                    navigate("/admin/")
                }else{
                    navigate("/")
                }
            
            }).catch((err)=>{
                toast.error(err?.response?.data?.message || "Google login failed. Please try again.")
            });
        },
        onError:()=>{
            toast.error("Google login failed. Please try again.")
        }
    }
)

    async function signup() {

        // Basic validation
        if (password != confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/users/", // fixed endpoint
                {
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    password:password
                }
            );

            console.log(response);
            toast.success("Signed up successfuly");

            // Redirect to login page
            navigate("/login/");
            
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to sign up"
            );
        }
    }

    return (
        <div className="w-full h-screen bg-[url(/background.jpg)] bg-cover bg-center flex">
            {/* Left Side */}
            <div className="w-1/2 hidden md:flex flex-col justify-center items-center text-white">
                <img
                    src="/logo1.png"
                    alt="logo"
                    className="w-[400px] h-[400px] object-contain"
                />
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="w-[400px] backdrop-blur-md bg-white/10 shadow-2xl rounded-2xl flex flex-col items-center text-white p-8 gap-4">

                    <h2 className="text-2xl font-bold mb-2 text-white">Create Account</h2>

                    {/* Name Row */}
                    <div className="w-full flex gap-4">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-1/2 h-12 rounded-md px-4 text-white text-sm outline-none border-2"
                            type="text"
                            placeholder="First Name"
                        />

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-1/2 h-12 rounded-md px-4 text-white text-sm outline-none border-2"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 rounded-md px-4 text-white text-sm outline-none border-2"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 rounded-md px-4 text-white text-sm outline-none border-2"
                    />

                    {/* Confirm Password */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 rounded-md px-4 text-white text-sm outline-none border-2"
                    />

                    {/* Sign Up Button */}
                    <button
                        onClick={signup}
                        className="w-full h-12 bg-accent text-white font-bold rounded-lg text-lg hover:bg-blue-500 transition"
                    >
                        Sign Up
                    </button>

                    {/* Google Button */}
                    <button 
                    onClick={googleLogin}
                    className="w-full h-12 border-2 border-accent text-white font-bold rounded-lg text-lg hover:bg-accent transition">
                        Sign up with Google
                    </button>

                    {/* Login Redirect */}
                    <p className="w-full text-right text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-accent hover:underline font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}