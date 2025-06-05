import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./Pages/signUp"
import SignIn from "./Pages/signIn"
import Dashboard from "./Pages/dashboard"
import SendMoney from "./Pages/sendMoney"



function App() {


  return (
    <>
  <BrowserRouter>
  <Routes>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="/signin" element={<SignIn/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/send" element={<SendMoney/>}/>
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
