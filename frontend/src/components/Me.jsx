import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Me = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate("/signin");
        }
        else{
            navigate("/dashboard");
        }
    },[])

    return(
        <div></div>
    )
}