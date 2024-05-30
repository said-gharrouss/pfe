import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { useUserContext } from "../../context/UserContext";

function StagesSansEncadrant() {
    const [stages,setStages] = useState(window.localStorage.getItem("stages_sans") ? JSON.parse(window.localStorage.getItem("stages_sans")) : []) ;
    const {user} = useUserContext();

    useEffect(()=>{
        axiosClient.get("/instructor/stages")
        .then(({data}) => {
            data = data.filter(stage => stage.encadrant_pedagogique === "sans encadrant");
            setStages(data);
            window.localStorage.setItem("stages_sans", JSON.stringify(stages));
        }).catch((error) => {
            console.log(error);
        })
    },[stages]);


    const handleChoix = async (stage) => {
        stage.encadrant_pedagogique = user.name;
        await axiosClient.put(`/instructor/stages/${stage.id}`, stage)
        .then(({status}) => {
            if(status === 200){
                console.log("yes");
            }
        })
        .catch((error) => console.log(error));

    }



    return (
        <div className="mt-[50px] pb-[100px]">
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
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Choix</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {
                    stages?.map((stage,key) => (
                        <tr className={`text-center py-[10px] `} key={key}>
                            <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-900">{stage.nome_de_etudiant}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.nome_de_entreprise}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.adress_de_entreprise}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.phone}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.encadrant}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.encadrant_pedagogique}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.institulé_de_sujet}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.technologie}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stage.description}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-gray-700 font-bold">
                                <button className="bg-green-500 text-white px-[5px] py-[2px] rounded-[4px]"
                                onClick={() => handleChoix(stage)}>Choisir</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            </div>
            :
            <div className="text-[30px] text-gray-400 text-center mt-[50px]">Il n&#39;y a pas de stages sans encadrant pédagogique</div>
            }
        </div>
    )
}

export default StagesSansEncadrant
