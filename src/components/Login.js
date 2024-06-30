import { useState } from "react";

function Login ({}) {
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleAuth = () => {
    setIsSigningIn(!isSigningIn)
  }

  return (
    <div className="border-2 border-red-500 flex items-center justify-center w-screen h-screen">
      {isSigningIn ? (
        
        <div className="flex flex-col items-center justify-between p-4 w-1/4 h-2/3 animate-color-change rounded-2xl shadow-popup">
          <p className="text-textcolor text-5xl ">SIGN IN</p>
          <form className="w-3/4 flex flex-col">
            <label className="text-textcolor text-sm mb-1" for='hotelname'>Hotel Name</label>
            <input className="h-9 pl-1 text-textcolor rounded-md bg-transparent border-dashed border-2 hover:border-solid border-textcolor focus:shadow-input " name='hotelname'></input>
            <label className="text-textcolor text-sm mt-3 mb-1" for='password'>Password</label>
            <input className="h-9 pl-1 text-textcolor rounded-md bg-transparent border-dashed border-2 hover:border-solid border-textcolor focus:shadow-input" name='password'></input>
            <button className="w-2/3 h-9 self-center hover:bg-gradient-to-r from-pink-500 hover:to-yellow-500 hover:border-0 hover:shadow-md border-2 border-textcolor rounded-md mt-7 text-textcolor">Sign in</button>
          </form>
          <p onClick={handleAuth} className="text-textcolor underline cursor-pointer"> Sign up</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between p-4 w-1/4 h-2/3 animate-color-change rounded-2xl shadow-popup">
          <p className="text-textcolor text-5xl">SIGN UP</p>
          <form className="w-3/4 flex flex-col">
            <label className="text-textcolor text-sm mb-1" for='hotelname'>Hotel Name</label>
            <input className="h-9 pl-1 text-textcolor rounded-md bg-transparent border-dashed border-2 hover:border-solid border-textcolor focus:shadow-input" name='hotelname'></input>
            <label className="text-textcolor text-sm mt-2 mb-1" for='hotelname'>Email</label>
            <input className="h-9 pl-1 text-textcolor rounded-md bg-transparent border-dashed border-2 hover:border-solid border-textcolor focus:shadow-input" name='email'></input>
            <label className="text-textcolor text-sm mt-2 mb-1" for='hotelname'>Password</label>
            <input className="h-9 pl-1 text-textcolor rounded-md bg-transparent border-dashed border-2 hover:border-solid border-textcolor focus:shadow-input" name='password'></input>
            <label className="text-textcolor text-sm mt-2 mb-1" for='password'>Confirm password</label>
            <input className="h-9 pl-1 text-textcolor rounded-md bg-transparent border-dashed border-2 hover:border-solid border-textcolor focus:shadow-input" name='password_confirm'></input>
            <button className="w-2/3 h-9 self-center hover:bg-gradient-to-r from-pink-500 hover:to-yellow-500 hover:border-0 hover:shadow-md border-2 border-textcolor rounded-md mt-7 text-textcolor">Sign in</button>
          </form>
          <p onClick={handleAuth} className="text-textcolor underline cursor-pointer"> Sign in</p>

        </div>
      )}
    </div>
  )
}

export default Login;