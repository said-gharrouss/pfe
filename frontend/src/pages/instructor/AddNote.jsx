import { axiosClient } from "../../api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PropTypes from 'prop-types';

function AddNote({id,onAddNote}) {
    const createValidationSchema = z.object({
        note: z.string()
            .nonempty({ message: "Le note ne doit pas être vide" })
    });


    const {register,handleSubmit,formState : {errors,isSubmitting},setError} = useForm({
        mode : "onSubmit",
        resolver : zodResolver(createValidationSchema),
    });

    const onSubmit = async (data) => {
        let stages = JSON.parse(localStorage.getItem("stages_unvalidated"));
        let stage = stages.filter(stage => stage.id == id);
        stage[0].note = parseFloat(data.note);
        console.log(stage[0]);
        try {
            const result = await axiosClient.put(`/instructor/stages/${id}`, stage[0]);
            const {status} = result;
            console.log(result);
            if(status === 200){
                onAddNote(null);
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
        <div className=" pb-[100px]  absolute w-[100vw] h-[100vh] bg-[#7e656d70] top-0 left-0">
            <form className="w-[800px] border-[1px] border-gray-300 bg-white shadow-lg  p-[20px] absolute top-[10%] left-[20%]"
            onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[25px]">
                        <label className="block mb-[10px] font-bold">Note</label>
                        <input type="text" className="w-full border-[1px] border-gray-400 outline-none h-[35px] px-[10px] focus:border-secondary focus:border-[2px]"
                        {...register("note")}/>
                        {errors.note && <span className="text-red-500">{errors.note.message}</span> }
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
                            Valider
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}


AddNote.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onAddNote: PropTypes.func.isRequired,
};

export default AddNote
