import React, { useState } from 'react';
import { Heading } from '../ui/Heading';
import { SubHeading } from '../ui/Subheading';
import { InputBox } from '../ui/InputBox';
import { Button } from '../ui/Button';
import { BottomWarning } from '../ui/BottomWarning';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

const navigate = useNavigate()

  const handleSignin=async()=>{
    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/signin", {username, password });
      console.log("Response from server:", response.data);
      if(response){
        localStorage.setItem("token", response.data.data)
        alert("User signed in successfully");
        navigate
        
      }
      
    } catch (error) {
      console.error('Error during sign in:', error);
      alert('An error occurred during sign in. Please try again later : ' + error );
      
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          
          <InputBox
            label="Username"
            placeholder="usha"
            onChange={(e : any) => setUsername(e.target.value)}
          />
          
          <InputBox
            label="Password"
            placeholder="********"
            onChange={(e : any) => setPassword(e.target.value)}
          />

          <div className="pt-4">
            <Button label="Sign In" onClick={() => {handleSignin()}} />
          </div>

          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
