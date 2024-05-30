import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { axiosClient } from "../../api/axios";
import {useState } from "react";
import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/UserContext";

function CreateStage() {
    const [isStageCreated,setisStageCreated] = useState(false);
    const {user} = useUserContext();

    const createValidationSchema = z.object({
        nome_de_entreprise: z.string()
            .nonempty({ message: "Le nom de l'entreprise ne doit pas être vide" })
            .max(50, { message: "Le nom de l'entreprise ne doit pas dépasser 50 caractères" }),
        adress_de_entreprise: z.string()
            .nonempty({ message: "L'adresse de l'entreprise ne doit pas être vide" })
            .min(10, { message: "L'adresse de l'entreprise doit contenir au moins 10 caractères" })
            .max(50, { message: "L'adresse de l'entreprise ne doit pas dépasser 50 caractères" }),
        phone: z.string()
            .nonempty({ message: "Le numéro de téléphone ne doit pas être vide" })
            .length(10, { message: "Le numéro de téléphone doit contenir 10 caractères" }),
        encadrant: z.string()
            .nonempty({ message: "Le nom de l'encadrant ne doit pas être vide" })
            .min(5, { message: "Le nom de l'encadrant doit contenir au moins 5 caractères" })
            .max(50, { message: "Le nom de l'encadrant ne doit pas dépasser 50 caractères" }),
        institulé_de_sujet: z.string()
            .nonempty({ message: "L'intitulé du sujet ne doit pas être vide" })
            .min(5, { message: "L'intitulé du sujet doit contenir au moins 5 caractères" })
            .max(50, { message: "L'intitulé du sujet ne doit pas dépasser 50 caractères" }),
        description: z.string()
            .nonempty({ message: "La description ne doit pas être vide" })
            .min(10, { message: "La description doit contenir au moins 10 caractères" })
            .max(255, { message: "La description ne doit pas dépasser 255 caractères" }),
        technologie: z.string()
            .nonempty({ message: "La technologie ne doit pas être vide" })
            .min(10, { message: "La technologie doit contenir au moins 10 caractères" })
            .max(50, { message: "La technologie ne doit pas dépasser 50 caractères" }),
    });

    const {register,handleSubmit,formState : {errors,isSubmitting},setError,reset} = useForm({
        mode : "onSubmit",
        resolver : zodResolver(createValidationSchema),
    });

    const onSubmit = async (data) => {
        const nome_de_etudiant = user.name;
        const encadrant_pedagogique = "sans encadrant";
        try {
            const result = await axiosClient.post("/student/stages", {...data,nome_de_etudiant,encadrant_pedagogique});
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
                // The request was made but no response was received
                console.log('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error message:', error.message);
            }
        }
    }



    return (
        <>
        <div className="mt-[25px] pb-[100px] relative">
            <h2 className=" font-bold text-[30px] mb-[30px] title-style">Ajouter un Stage</h2>
            <form action="" className="w-[800px] border-[1px] border-gray-300 mx-auto p-[20px]"
            onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Nom De L&#39;entreprise</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("nome_de_entreprise")}/>
                    {errors.nome_de_entreprise && <span className="text-red-500">{errors.nome_de_entreprise.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Adresse De L&#39;entreprise</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("adress_de_entreprise")}/>
                    {errors.adress_de_entreprise && <span className="text-red-500">{errors.adress_de_entreprise.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Téléphone De L&#39;entreprise</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("phone")}/>
                    {errors.phone && <span className="text-red-500">{errors.phone.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Encadrant Dans L&#39;entreprise</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("encadrant")}/>
                    {errors.encadrant && <span className="text-red-500">{errors.encadrant.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Institulé De Sujet</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("institulé_de_sujet")}/>
                    {errors.institulé_de_sujet && <span className="text-red-500">{errors.institulé_de_sujet.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Technologie Utilisées</label>
                    <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("technologie")}/>
                    {errors.technologie && <span className="text-red-500">{errors.technologie.message}</span> }
                </div>
                <div className="mb-[25px]">
                    <label className="block mb-[10px] font-bold">Description Du Sujet</label>
                    <textarea className="w-full h-[100px] border-[1px] border-gray-400 outline-none resize-none p-[10px] focus:border-secondary focus:border-[2px]"
                    {...register("description")}></textarea>
                    {errors.description && <span className="text-red-500">{errors.description.message}</span> }
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
                <p>Stage créé avec succès !!</p>
            </div>
            }
        </div>
        </>
    )
}
export default CreateStage
