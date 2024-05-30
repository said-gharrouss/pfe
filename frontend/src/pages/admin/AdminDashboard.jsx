import { useEffect, useState } from "react";
import { ADMIN_LOGIN } from "../../router/Index";
import userApi from "../../services/api/student/userApi";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Stagiaires from "./Stagiaires/Stagiaires";
import Instructors from "./Instructors/Instructors";

function AdminDashboard() {
    const [isLoginClicked,setIsLoginClicked] = useState(false);
    const [selectPage,setSelectPage] = useState(1);
    const navigate = useNavigate();
    const {isAuthenticated,setUser,setIsAuthenticated,logout,user} = useUserContext();
    const [pageLoiding,setPageLoiding] = useState(true);
    useEffect(()=>{
        if(isAuthenticated === true){
            setPageLoiding(false);
            userApi.getUser("admin").then(({data})=>{
                setUser(data);
                setIsAuthenticated(true);
                window.localStorage.setItem("AUTHENTICATED","true");
            }).catch(() => {
                logout()
            })
        } else {
            navigate(ADMIN_LOGIN);
        }
    },[isAuthenticated]);

    if(pageLoiding){
        return <></>
    }


    const logoutButton = async () => {
        await userApi.logout().then(() =>{
            logout();
            navigate();
        })
    }

    const handleSelectPage = (index) => {
        setSelectPage(index);
    }

    return (
        <>
        <div className=" bg-white shadow-md">
            <nav className="py-[20px] flex justify-between items-center container">
                <div className="uppercase text-secondary text-[30px] font-bold">gestion des stages</div>
                <div className="hidden sm:block">
                <nav className="flex gap-6" >
                    <span href="#" className={`cursor-pointer shrink-0 rounded-lg p-2 text-sm font-medium
                    ${selectPage === 1 ? "span_hover_style" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
                    onClick={() => handleSelectPage(1)}>Stagiaires</span>

                    <span href="#" className={`cursor-pointer shrink-0 rounded-lg p-2 text-sm font-medium
                    ${selectPage === 2 ? "span_hover_style" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
                    onClick={() => handleSelectPage(2)}>Enseignants</span>
                </nav>
                </div>
                <div className="relative">
                    <button className="bg-secondary w-[150px] h-[40px] text-white rounded-[6px]
                    flex items-center justify-between px-[10px]"
                    onClick={() => setIsLoginClicked(prevState => !prevState)}>
                        <span><i className="fa-regular fa-user"></i> <span className="ml-[10px]">{user?.name}</span></span>
                        <span className={`${isLoginClicked ? "rotate" : ""} transition-[all_0.3s] `}><i className="fa-solid fa-angle-down"></i></span>
                    </button>
                    {
                        isLoginClicked &&
                        <ul className="absolute bg-white w-full rounded-[6px] border-[1px] border-gray-500 overflow-hidden mt-[3px]">
                            <li className="h-[40px] flex items-center px-[10px] hover:bg-lightgray transition-[all_0.3s] cursor-pointer"
                            onClick={() => logoutButton()}>Logout</li>
                        </ul>
                    }
                </div>
            </nav>
        </div>
        {
            selectPage === 1 && <Stagiaires/>
        }
        {
            selectPage === 2 && <Instructors/>
        }
        </>
    )
}

export default AdminDashboard
