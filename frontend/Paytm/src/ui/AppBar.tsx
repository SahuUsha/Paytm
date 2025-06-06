interface AppProps {
  user: any; // Ideally, use a proper type instead of `any`
}



export const AppBar = ({user} : AppProps ) => {

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center font-semibold h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {user?.userId?.username}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user?.userId?.firstName[0].toUpperCase()}
                </div>
            </div>
        </div>
    </div>
}