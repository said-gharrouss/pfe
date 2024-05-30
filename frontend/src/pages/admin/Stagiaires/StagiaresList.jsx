import { useEffect, useState } from "react"
import { axiosClient } from "../../../api/axios"
import UpdateStagiaire from "./UpdateStagiaire";

function StagiaresList() {
    const [stagiaires,setStagiaires] = useState(window.localStorage.getItem("stagiaires") ? JSON.parse(window.localStorage.getItem("stagiaires")) : []);
    const [isStagiaireDeleted,setIsStagiaireDeleted] = useState(false);
    const [id,setId] = useState(null);
    useEffect(() => {
        axiosClient.get("/admin/stagiaires")
        .then(({status,data}) => {
            if(status === 200){
                setStagiaires(data);
                window.localStorage.setItem("stagiaires",JSON.stringify(data));
            }
        }).catch((error) => {
            console.log(error)
        })
    },[stagiaires])

    const handleDelete = (id) => {
        axiosClient.delete(`/admin/stagiaires/${id}`)
        .then(({status}) => {
            if(status === 200){
                setIsStagiaireDeleted(true);
                setTimeout(() => {
                    setIsStagiaireDeleted(false);
                }, 2000);
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    const handleUpdate = (id) => {
        setId(id);
    }


    return (
        <div className="mt-[50px] pb-[100px]">
            <div className=" scroll-bar pb-5">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-[50px]">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Nom Et Prénom</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Email</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Mot de passe</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Créé à</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Mis à jour à</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Actions</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        stagiaires?.map((stagiaire,key) => (
                            <tr className={`text-center py-[10px] `} key={key}>
                                <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-900">{stagiaire.name}</td>
                                <td className="whitespace-nowrap px-4 py-4 text-gray-700">{stagiaire.email}</td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">{stagiaire.text}</td>
                                <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-700">
                                    {new Date(stagiaire.created_at).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                        hour12: false
                                                    }).replace(',', ' :')}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-700">
                                    {new Date(stagiaire.updated_at).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false
                                    }).replace(',', ' :')}
                                    </td>
                                <td className="whitespace-nowrap px-4 py-4 font-bold text-gray-700">
                                    <button className="text-white bg-green-500 mr-[5px] px-[5px] py-[2px] rounded-[4px]"
                                    onClick={() => handleUpdate(stagiaire.id)}>Update</button>
                                    <button className="text-white bg-red-500 px-[5px] py-[2px] rounded-[4px]"
                                    onClick={() => handleDelete(stagiaire.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {isStagiaireDeleted &&
                    <div className="w-[250px] bg-green-100 p-[20px] absolute left-[500px] bottom-[200px]">
                        <h2 className="font-bold">Succès</h2>
                        <p>Stagiare supprimé avec succès !!</p>
                    </div>
                }
            </div>
            {
                id !== null && <UpdateStagiaire id={id} onUpdateStagiaire={handleUpdate}/>
            }
        </div>
    )

}

export default StagiaresList
