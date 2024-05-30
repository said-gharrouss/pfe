import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {STUDENT_DASHBOARD_ROUTE } from "../../router/Index";
import { useUserContext } from "../../context/UserContext";

function StudentLogin() {
    const [eye,setEye] = useState("fa-solid fa-eye-slash");
    const [inputType,setInputType] = useState("password");
    const handleEyeChange = () => {
        setEye(prevEye => prevEye === "fa-solid fa-eye-slash" ? "fa-solid fa-eye" : "fa-solid fa-eye-slash" );
        setInputType(prevType => prevType === "password" ? "text" : "password")
    }

    const {login,setIsAuthenticated,setToken} = useUserContext()
    const navigate = useNavigate();

    const StudentLoginSchema = z.object({
        email : z.string()
                    .nonempty("email is required")
                    .email("email is not valid"),
        password : z.string()
                    .nonempty("password is required")
                    .min(6,{message : "password must be at least 6 chatachters"})
                    .max(18,{message : "password must be smaller than 18 charachters"})
    })

    const {register,handleSubmit,formState : {errors,isSubmitting},setError} = useForm({
        resolver : zodResolver(StudentLoginSchema),
    });

    const onSubmit = async (values) =>{
        await login(values.email,values.password)
        .then( ({status,data}) => {
            if(status === 200){
                setIsAuthenticated(true);
                const token = data.token;
                setToken(token);
                const {role} = data.user;
                switch (role) {
                    case "student" :
                        navigate(STUDENT_DASHBOARD_ROUTE);
                        break;
                    case "admin" :
                        setError("email",{
                            message: "Veuillez vous connecter avec le formulaire de connexion administrateur si vous êtes administrateur !!"
                        })
                        break;
                    case "instructor" :
                        setError("email", {
                            message: "Veuillez vous connecter avec le formulaire de connexion Enseignant si vous êtes enseignant !!"
                        });
                }
            }
        }
        ).catch(({response}) => {
            setError("email",{
                message : response.data.message,
            })
        } );
    }

    return (
        <div className="w-[300px] sm:w-[400px] md:w-[500px] rounded-[6px] bg-lightwhite py-[50px]  p-[20px] shadow-sm
        border-[1px] border-secondary mx-auto mt-[100px] relative">
            <p className="text-[25px] font-bold text-center mb-[20px]">Bienvenue de retour, étudiant(e)</p>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[15px]">
                    <input type="text" className="w-full block h-[50px] outline-none rounded-[6px] px-[20px] focus border-[1px] border-secondary"
                    placeholder="Entrez votre adresse e-mail" {...register("email")}/>
                    {errors.email  && <span className="text-red-500">{errors.email.message}</span> }
                </div>
                <div className="mb-[15px]">
                    <div className="flex relative">
                        <input type={inputType} className="w-full block h-[50px] outline-none rounded-[6px] px-[20px] focus border-[1px] border-secondary"
                        placeholder="Entrez votre mot de passe" {...register("password")}/>
                        <label className="absolute right-[20px] top-[50%] translate-y-[-50%] cursor-pointer"
                        onClick={() => handleEyeChange()}>
                            <i className={eye}></i>
                        </label>
                    </div>
                    {errors.password  && <span className="text-red-500">{errors.password.message}</span> }
                </div>
                <div className="mb-[15px]">
                {isSubmitting ?
                    <button
                        type="submit"
                        disabled
                        className="w-full rounded-lg bg-indigo-200 px-5 py-3 text-sm font-medium text-white
                        flex justify-center"
                    >
                        <div className="loader"></div>
                    </button>
                    :
                    <button
                    type="submit"
                    className="block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white"
                    >
                        Log in
                    </button>
                    }
                </div>
            </form>
            <Link to="/">
                <div className="absolute bg-secondary text-white font-semibold  h-[40px] w-[40px] rounded-[50%]
                flex justify-center items-center text-[20px] top-[-20px] right-[-15px] cursor-pointer hover:bg-red-500"><i className="fa-solid fa-xmark"></i></div>
            </Link>
        </div>
    )
}

export default StudentLogin
