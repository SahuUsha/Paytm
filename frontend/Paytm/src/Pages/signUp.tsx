import React,{useState} from 'react'
import { Heading } from '../ui/Heading'
import { SubHeading } from '../ui/Subheading'
import { InputBox } from '../ui/InputBox'
import { Button } from '../ui/Button'
import { BottomWarning } from '../ui/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp= () => {
const [firstName, setfirstName] = useState("")
const [lastName, setLastName] = useState("")
const [username, setuserName] = useState("")
const [password, setpassword] = useState("")

const navgate = useNavigate()

const handleSignUp = async() => {

  //  username : zod.string(),
  //   password : zod.string(),
  //   firstName : zod.string(),
  //   lastName : zod.string()
 

  try {
    const response =await axios.post("http://localhost:5000/api/v1/users/signup", {username, password, firstName, lastName})
    console.log("Response from server:", response.data);
    if(response){
      alert("User created successfully")
      setfirstName("")
      setLastName("")
      setuserName("")
      setpassword("")
      navgate("/signin")
      
    }

    
  } catch (error) {
    console.error('Error during sign up:', error);
    alert('An error occurred during sign up. Please try again later : ' + error);
    
  }
}

  return (
   <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
     <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
     <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
         <InputBox onChange={(e:any) => setuserName(e.target.value)} placeholder='Usha' label='Username' />
         <InputBox onChange={(e:any)=>setpassword(e.target.value)} placeholder='********' label='Password' />
         <InputBox onChange={(e : any)=>
setfirstName(e.target.value)
         } placeholder="John" label={"First Name"} />
         <InputBox onChange={(e:any)=>setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
    
          <div className="pt-4">
            <Button label='Sign Up' onClick={()=>{handleSignUp()}} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
       
          

     </div>
        
    
    </div>
  </div>
  )
}

export default SignUp
