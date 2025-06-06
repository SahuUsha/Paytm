import React, { useEffect ,useState} from 'react'
import { AppBar } from '../ui/AppBar'
import { Balance } from '../ui/Balance'
import { Users } from '../ui/UserComponent'
import axios from 'axios'

const Dashboard = () => {
const [user, setuser] = useState([])

  const getUser = async()=>{
    try {
      const response = await axios.get("http://localhost:5000/api/v1/bank/useraccount",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`

        }
      })
      if(response){
        console.log("Response from server:", response.data.data);
        setuser(response.data.data);
      }
      
    } catch (error) {
      console.error('Error fetching user:', error);
      alert('An error occurred while fetching user data. Please try again later: ' + error);  
      
    }
  }
  useEffect(()=>{
    getUser()
  },[])

  return (
    <div>
      <AppBar  user={user} />
      <div className='m-8'>
        <Balance user={user} />
        <Users/>

      </div>
    </div>
  )
}

export default Dashboard
