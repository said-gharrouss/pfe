import { useForm } from "react-hook-form";
import { axiosClient } from "../../../api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import PropTypes from 'prop-types';

function UpdateInstructor({id,onUpdateInstructor}) {

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


    const {register,handleSubmit,formState : {errors,isSubmitting},setValue,setError} = useForm({
        mode : "onSubmit",
        resolver : zodResolver(createValidationSchema),
    });

    useEffect(() => {
        let instructors = JSON.parse(localStorage.getItem("instructors"));
        let instructor = instructors.filter(stage => stage.id == id);
        if (instructor) {
            setValue('name', instructor[0].name);
            setValue('email', instructor[0].email);
            setValue('password', instructor[0].text);
        }
    },[id,setValue])

    const onSubmit = async (data) => {
        const text = data.password;
        console.log(text);
        try {
            const result = await axiosClient.put(`/admin/instructors/${id}`, {...data,text});
            const {status} = result;
            if(status === 200){
                onUpdateInstructor(null);
            }

        } catch (error) {
            let {errors} = error.response.data;
            if (errors) {
                errors = Object.entries(errors);
                errors.forEach((error) => {
                    const [fieldName, errorMessages] = error;
                    setError(fieldName, {message: errorMessages.join("")});
                });
            }
        }
    }
    return (
            <>
            <div className=" pb-[100px]  absolute w-[100vw] h-[100vh] bg-[#7e656d70] top-0 left-0">
                <form action="" className="w-[800px] border-[1px] border-gray-300 bg-white shadow-lg  p-[20px] absolute top-[10%] left-[20%]"
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
                                Modifier
                            </button>
                        }
                    </div>
                </form>
            </div>
            </>
    )
}

UpdateInstructor.propTypes = {
    id: PropTypes.number.isRequired,
    onUpdateInstructor: PropTypes.func.isRequired,
};

export default UpdateInstructor
