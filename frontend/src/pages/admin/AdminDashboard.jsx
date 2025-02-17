import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {

    // const token = localStorage.getItem("token");
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if(!token){
    //         navigate("/signin");
    //     }
    //     else{
    //         navigate("/dashboard");
    //     }
    // },[])

    return(
        <div className="bg-black">
            <span className="text-white">welcome to painter dashboard</span>
        </div>
    )
}