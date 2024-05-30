import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosClient } from "../../../api/axios";

function AjouterStagiare() {
    const [isStageCreated,setisStageCreated] = useState(false);

    const createValidationSchema = z.object({
        name: z.string()
            .nonempty({ message: "Le nom ne doit pas être vide" })
            .max(50, { message: "Le nom ne doit pas dépasser 50 caractères" }),
        email: z.string()
            .nonempty({ message: "L'adresse email ne doit pas être vide" })
            .min(10, { message: "L'adresse email doit contenir au moins 10 caractères" })
            .max(50, { message: "L'adresse email ne doit pas dépasser 50 caractères" }),
        password: z.string()
            .nonempty({ message: "Le mot de passe ne doit pas être vide" })
            .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
            .max(20, { message: "Le mot de passe ne doit pas dépasser 20 caractères" }),
    });

    const {register,handleSubmit,formState : {errors,isSubmitting},setError,reset} = useForm({
        mode : "onSubmit",
        resolver : zodResolver(createValidationSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        const text = data.password;
        try {
            const result = await axiosClient.post("/admin/stagiaires", {...data,text});
            const {status} = result;
            if(status === 200){
                setisStageCreated(true);
                reset();
                setTimeout(() => {
                    setisStageCreated(false);
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                let {errors} = error.response.data;
                if (errors) {
                    errors = Object.entries(errors);
                    errors.forEach((error) => {
                        const [fieldName, errorMessages] = error;
                        setError(fieldName, {message: errorMessages.join("")});
                    });
                }
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }
        }
    }
    return (
        <>
        <div className="mt-[25px] pb-[100px] relative">
            <form action="" className="w-[800px] border-[1px] border-gray-300 mx-auto p-[20px]"
            onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Nom et Prénom</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("name")}/>
                    {errors.name && <span className="text-red-500">{errors.name.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Email</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("email")}/>
                    {errors.email && <span className="text-red-500">{errors.email.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Mot De Pass</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("password")}/>
                    {errors.password && <span className="text-red-500">{errors.password.message}</span> }
                </div>

                <div className="flex justify-end">
                    {isSubmitting ?
                        <button
                            type="submit"
                            disabled
                            className="bg-secondary text-white font-bold w-[150px] h-[40px] cursor-pointer flex justify-center items-center"
                        >
                            <div className="loader"></div>
                        </button>
                        :
                        <button
                        type="submit"
                        className="bg-secondary text-white font-bold w-[150px] h-[40px] cursor-pointer"
                        >
                            Ajouter
                        </button>
                    }
                </div>
            </form>
            {isStageCreated &&
            <div className="w-[250px] bg-green-100 p-[20px] absolute left-[400px] bottom-[300px]">
                <h2 className="font-bold">Succès</h2>
                <p>Stagiaire créé avec succès !!</p>
            </div>
            }
        </div>
        </>
    )
}

export default AjouterStagiare
