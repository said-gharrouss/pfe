import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { Link } from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from "../../router/Index";
import { useUserContext } from "../../context/UserContext";

function StagesList() {
    const [stages,setStages] = useState(window.localStorage.getItem("stages") ? JSON.parse(window.localStorage.getItem("stages")) : []) ;
    const [isStageDeleted,setisStageDeleted] = useState(false);
    const [stageId,setStageId] = useState(localStorage.getItem("id"));
    const {user} = useUserContext();

    useEffect(()=>{
        axiosClient.get("/student/stages")
        .then(({data}) => {
            data = data.filter((item) => item.nome_de_etudiant == user.name);
            setStages(data);
            window.localStorage.setItem("stages", JSON.stringify(stages));
            setTimeout(() => {
                setStageId(null);
                localStorage.setItem("id",null);
            }, 2000);
        }).catch((error) => {
            console.log(error);
        })
    },[stages]);

    const handleDeleteStage = (id) => {
        axiosClient.delete(`/student/stages/${id}`)
        .then(({status}) => {
            if(status === 200){
                setisStageDeleted(true);
                setTimeout(() => {
                    setisStageDeleted(false);
                }, 2000);
            }
        }).catch((error) => console.log(error));
    }


    return (
        <div className="mt-[50px] pb-[100px]">
            <h2 className=" font-bold text-[30px] mb-[30px] title-style">Les Informations De Votre Stage PFE</h2>
            {
            stages?.length > 0 ?
            <div className="overflow-x-scroll scroll-bar pb-5">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-[50px]">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Nome De Etudiant</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Nome De Entreprise</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Adress De Entreprise</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Télephone</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Encadrant</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Encadrant Pedagogique</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Institulé De Sujet</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Technologie</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Description</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Actions</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {
                    stages?.map((stage,key) => (
                        <tr className={`text-center py-[10px] ${stageId == stage.id ? "tr-background" : ""} `} key={key}>
                            <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-900">{stage.nome_de_etudiant}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.nome_de_entreprise}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.adress_de_entreprise}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.phone}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.encadrant}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.encadrant_pedagogique}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.institulé_de_sujet}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.technologie}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.description}</td>
                            <th className="whitespace-nowrap px-4 py-4 text-gray-700">
                                <Link to={`${STUDENT_DASHBOARD_ROUTE}/updatestage/${stage.id}`}>
                                    <button className="text-white bg-green-500 mr-[5px] px-[5px] py-[2px] rounded-[4px]">Update</button>
                                </Link>
                                <button className="text-white bg-red-500 px-[5px] py-[2px] rounded-[4px]"
                                onClick={() => handleDeleteStage(stage.id)}>Delete</button>
                            </th>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            </div>
            :
            <div className="text-[30px] text-gray-400 text-center mt-[50px]">Vous n&#39;avez pas de stage, ajoutez un nouveau stage</div>
            }
            {isStageDeleted &&
                <div className="w-[250px] bg-green-100 p-[20px] absolute left-[500px] bottom-[200px]">
                    <h2 className="font-bold">Succès</h2>
                    <p>Stage supprimé avec succès !!</p>
                </div>
            }
        </div>
    )
}

export default StagesList
