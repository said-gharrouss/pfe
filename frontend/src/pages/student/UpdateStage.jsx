import { zodResolver } from "@hookform/resolvers/zod";
import { axiosClient } from "../../api/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from "../../router/Index";

function UpdateStage() {
    const {id} = useParams();
    const navigate = useNavigate();

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


    const {register,handleSubmit,formState : {errors,isSubmitting},setValue,setError} = useForm({
        mode : "onSubmit",
        resolver : zodResolver(createValidationSchema),
    });

    useEffect(() => {
        let stages = JSON.parse(localStorage.getItem("stages"));
        let stage = stages.filter(stage => stage.id == id);
        if (stage) {
            setValue('nome_de_entreprise', stage[0].nome_de_entreprise);
            setValue('adress_de_entreprise', stage[0].adress_de_entreprise);
            setValue('phone', stage[0].phone);
            setValue('encadrant', stage[0].encadrant);
            setValue('institulé_de_sujet', stage[0].institulé_de_sujet);
            setValue('description', stage[0].description);
            setValue('technologie', stage[0].technologie);
        }
    },[id,setValue])

    const onSubmit = async (data) => {
        console.log(data);
        const nome_de_etudiant = "said";
        const encadrant_pedagogique = "haku";
        try {
            const result = await axiosClient.put(`/student/stages/${id}`, {...data,nome_de_etudiant,encadrant_pedagogique});
            const {status} = result;
            if(status === 200){
                navigate(STUDENT_DASHBOARD_ROUTE);
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
            <div className="mt-[25px] pb-[100px] container relative">
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
                                Modifier
                            </button>
                        }
                    </div>
                </form>
            </div>
            </>
    )
}

export default UpdateStage
