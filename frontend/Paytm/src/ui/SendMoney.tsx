import axios from "axios";
import React,{useState} from "react";
import { useSearchParams } from "react-router-dom";

export const Send: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")
  const name = searchParams.get("name")
  const [amount, setamount] = useState(0)
 
  const handlTransLate = async()=>{
    try {
        const response = await axios.post("http://localhost:5000/api/v1/bank/transfer", { 
            to: id,
            amount: amount
        },{
            headers :{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            
           
            
            }
        })
        console.log("Response from server:", response.data);
        if(response){
            alert("Transaction successful")
            setamount(0)
        }
        
    } catch (error) {
        console.error('Error during transaction:', error);
        alert('An error occurred during transaction. Please try again later: ' + error);
        
    }

  }


  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name?.[0]?.toUpperCase() }</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label
                  htmlFor="amount"  // ✅ correct JSX attribute
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  id="amount"
                  onChange={(e) => setamount(Number(e.target.value))}
                  placeholder="Enter amount"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <button onClick={()=>{handlTransLate()}}  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
