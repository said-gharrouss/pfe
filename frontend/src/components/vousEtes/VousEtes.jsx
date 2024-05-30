import { Link } from "react-router-dom"

function VousEtes() {
    return (
        <div className="container px-[20px] pt-[150px]">
            <h2 className="title-style uppercase text-[30px] font-bold text-secondary ">Vous êtes</h2>
            <div className="flex mt-[50px] gap-[50px]">
                <Link to={"/adminlogin"} className="flex-1">
                <div className="flex-1 bg-secondary text-white py-[30px] px-[40px] rounded-[6px] shadow-md
                hover:bg-gray-200 hover:text-secondary transition-[all_0.4s]">
                        <div className="text-[40px]">
                            <i className="fa-solid fa-user-tie"></i>
                        </div>
                        <h3 className="my-[10px]">Admin</h3>
                        <p>Espace Administrateur</p>
                </div>
                </Link>
                <Link to={"/instructorlogin"} className="flex-1">
                <div className="flex-1 bg-secondary text-white py-[30px] px-[40px] rounded-[6px] shadow-md
                hover:bg-gray-200 hover:text-secondary transition-[all_0.4s]">
                        <div className="text-[40px]">
                            <i className="fa-solid fa-user-check"></i>
                        </div>
                        <h3 className="my-[10px]">Enseignant</h3>
                        <p>Espace Enseignant</p>
                </div>
                </Link>
                <Link to={"/studentlogin"} className="flex-1">
                <div className="flex-1 bg-secondary text-white py-[30px] px-[40px] rounded-[6px] shadow-md
                hover:bg-gray-200 hover:text-secondary transition-[all_0.4s]">
                    <div className="text-[40px]">
                        <i className="fa-solid fa-user-graduate"></i>
                    </div>
                    <h3 className="my-[10px]">Etudiant</h3>
                    <p>Espace Etudiant</p>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default VousEtes
