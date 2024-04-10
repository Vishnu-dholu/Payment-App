import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usernameState, passwordState } from "../states";
import Loader from "../components/Loader";



const Signin = () => {

    const [username, setUsername] = useRecoilState(usernameState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [showLoader, setShowLoader] = useState(false);

    const navigate = useNavigate();

    async function handleSignin() {
        setShowLoader(true);

        try{
            const res = await fetch("https://mern-paytm-backend.vercel.app/api/v1/user/signin", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!res.ok){
                alert(`HTTP error! status ${res.status}`);
                setShowLoader(false);
                return
            }

            const data = await res.json();

            setShowLoader(false);

            alert(data.msg);

            localStorage.setItem("mytoken", data.token);

            navigate("/dashboard");
        } catch (err) {
            console.log("Request Crashed!");
        }
    }

    function navigateToSignup (){
        navigate("/signup");
    }
   
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
        <div className="p-6 rounded-2xl flex flex-col justify-center bg-white drop-shadow-xl">
            <div className="text-center">
                <h1 className="text-3xl text-bold mb-2">Sign-In</h1>
                <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your Credentials to access your account</p>
            </div>

            <label htmlFor="username">Username</label>
            <input className="p-1 border-2 mb-2 mt-1" type="text" value={username} onChange={e => setUsername(e.target.value)} />

            <label htmlFor="username">Password</label>
            <input className="p-1 border-2 mb-2 mt-1" type="text" value={password} onChange={e => setPassword(e.target.value)} />
            
            <button className="border-black bottom-2 rounded-xl bg-black text-white mt-2 mb-2 w-1/2 m-auto hover:bg-teal-400">Sign-In</button>
            <div className="flex justify-center">
                <p className="mr-2">Don't have an account</p>
                <a onClick={navigateToSignup} className="underline hover:text-teal-400 cursor-pointer">Sign-Up</a>
            </div>
        </div>
        {showLoader && <div className="absolute w-full h-full flex items-center justify-center bg-gray-200 opacity-80">
            <Loader />
        </div>}
    </div>
  )
}

export default Signin