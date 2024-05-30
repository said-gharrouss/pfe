import { useState } from "react"
import StagesAvecEncadrant from "./StagesAvecEncadrant";
import StagesSansEncadrant from "./StagesSansEncadrant";

function TousLesStages() {
    const [selectStages,setSelectStages] = useState(1);

    return (
    <div className="mt-[30px] container">
        <div className="hidden sm:block">
            <div className="border-b border-gray-200">
            <nav className="-mb-px flex justify-center gap-6" aria-label="Tabs">
                <span className={`shrink-0 cursor-pointer  px-1 pb-4 text-sm font-medium text-gray-500  hover:text-gray-700
                ${selectStages === 1 ? "stage-type-style" : ""}`}
                onClick={() => setSelectStages(1)}>Les Stages avec Encadrant Pédagogique</span>
                <span className={`shrink-0 cursor-pointer  px-1 pb-4 text-sm font-medium text-gray-500  hover:text-gray-700
                ${selectStages === 2 ? "stage-type-style" : ""}`}
                onClick={() => setSelectStages(2)}>Les Stages Sans Encadrant Pédagogique</span>
            </nav>
            </div>
        </div>
        {
            selectStages === 1 && <StagesAvecEncadrant/>
        }
        {
        selectStages === 2 && <StagesSansEncadrant/>
        }
    </div>
    )
}

export default TousLesStages
