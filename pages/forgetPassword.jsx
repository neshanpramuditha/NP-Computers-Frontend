import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(){
    
    const [email, setEmail] = useState("");
    const [otpSend, setOtpSend] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    async function sendOTP(){
        setOtpSend(true);
        try{
            await axios.post(import.meta.env.VITE_API_URL+"/users/send-otp", {email:email})
            toast.success("OTP sent to your email, Check now!")
        }
        catch(err){
            toast.error(err?.response?.data?.message || "Failed to send OTP, Please try again!")
            setOtpSend(false);
        }
    }

    async function resetPassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match!");
            return;
        }
        try{
            await axios.post(
                import.meta.env.VITE_API_URL+"/users/verify-otp",
                {email:email, otp:otp, newPassword:newPassword}
            )
            toast.success("Password reset successful!")
            navigate("/login")
        }
        catch(err){
            toast.error(err?.response?.data?.message || "Failed to reset password, Please try again!")
        }
    }
        
    return(
        <div className="flex justify-center items-center min-h-screen bg-primary px-4">
            
            {!otpSend &&
            <div className="w-full max-w-md backdrop-blur-3xl rounded-xl shadow-2xl p-8 flex flex-col items-center">
                <h1 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h1>

                <input 
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg border border-secondary outline-none mb-5"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>

                <button 
                onClick={sendOTP} 
                className="w-full p-3 bg-accent rounded-lg text-white font-bold hover:bg-accent/80 transition-colors">
                    Send OTP
                </button>
            </div>}

            {
                otpSend &&
                <div className="w-full max-w-md backdrop-blur-3xl rounded-xl shadow-2xl p-8 flex flex-col items-center">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Reset Password</h1>
                    
                    <input 
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full p-3 rounded-lg border border-secondary outline-none mb-4"
                    onChange={(e)=>{
                        setOtp(e.target.value)
                    }}/>

                    <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-3 rounded-lg border border-secondary outline-none mb-4"
                    onChange={(e)=>{
                        setNewPassword(e.target.value)
                    }}/>

                    <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full p-3 rounded-lg border border-secondary outline-none mb-6"
                    onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }}/>

                    <button 
                    onClick={resetPassword}
                    className="w-full p-3 bg-accent rounded-lg text-white font-bold hover:bg-accent/80 transition-colors">
                        Reset Password
                    </button>
                </div>
            }

        </div> 
    )
}