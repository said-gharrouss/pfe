import { useState } from "react";
import StagiaresList from "./StagiaresList";
import AjouterStagiare from "./AjouterStagiare";

function Stagiaires() {
    const [selectStages,setSelectStages] = useState(1);

    return (
    <div className="mt-[30px] container">
        <div className="hidden sm:block">
            <div className="border-b border-gray-200">
            <nav className="-mb-px flex justify-center gap-6" aria-label="Tabs">
                <span className={`shrink-0 cursor-pointer  px-1 pb-4 text-sm font-medium text-gray-500  hover:text-gray-700
                ${selectStages === 1 ? "stage-type-style" : ""}`}
                onClick={() => setSelectStages(1)}>Liste des stagiaires</span>
                <span className={`shrink-0 cursor-pointer  px-1 pb-4 text-sm font-medium text-gray-500  hover:text-gray-700
                ${selectStages === 2 ? "stage-type-style" : ""}`}
                onClick={() => setSelectStages(2)}>Ajouter un stagiaire</span>
            </nav>
            </div>
        </div>
        {
            selectStages === 1 && <StagiaresList/>
        }
        {
            selectStages === 2 && <AjouterStagiare/>
        }
    </div>
    )
}

export default Stagiaires
