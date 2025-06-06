interface BalanceProps {
  user: any; // Ideally, use a proper type instead of `any`
}

export const Balance = ({ user }: BalanceProps) => {
    console.log("User data in Balance component:", user);
  return (
    <div className="flex flex-col">
      <div className="font-semibold text-gray-700 m-4 text-2xl">
        Welcome  <span className="font-bold text-black">{user?.userId?.firstName} {user?.userId?.lastName} </span> to Paytm App
      </div>
      <div className="font-semibold text-gray-800 ml-4 text-lg">
        Your Balance: ₹{user?.balance?.toFixed(2)}
      </div>
    </div>
  );
};
