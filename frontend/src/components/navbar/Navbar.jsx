import { useState } from "react"
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
function Navbar() {
    const [isLoginClicked,setIsLoginClicked] = useState(false);

    return (
        <nav className={`fixed w-full bg-white transition-[all_0.3s] top-0 left-0 shadow-md z-[200]
        `}>
            <div className={`container px-[20px] mx-auto h-[150px] sm:h-[70px] pb-[15px] sm:pb-[0px] flex flex-col sm:flex-row justify-between items-center
            relative`}>
                <div className="text-secondary text-[22px] font-bold uppercase tracking-[1px]">gestion des stages</div>
                <div className="flex items-center gap-[20px]">
                    <ul className="flex gap-[20px]">
                        <li className="hover:text-secondary cursor-pointer transition-all[all_0.3s]">Home</li>
                        <li className="hover:text-secondary cursor-pointer transition-all[all_0.3s]">
                        <ScrollLink
                            activeClass="active"
                            to="a propos"
                            spy={true}
                            smooth={true}
                            duration={400}>
                            A propos
                        </ScrollLink>
                        </li>
                        <li className="hover:text-secondary cursor-pointer transition-all[all_0.3s]">
                        <ScrollLink
                            activeClass="active"
                            to="vous etes"
                            spy={true}
                            smooth={true}
                            duration={400}>
                            Vous êtes
                        </ScrollLink>
                        </li>
                        <li className="hover:text-secondary cursor-pointer transition-all[all_0.3s]">
                            <ScrollLink
                            activeClass="active"
                            to="contact"
                            spy={true}
                            smooth={true}
                            duration={400}>
                            Contact
                            </ScrollLink>
                        </li>
                    </ul>
                <div className="relative">
                    <button className="bg-secondary w-[120px] h-[40px] text-white rounded-[6px]
                    flex items-center justify-between px-[10px]"
                    onClick={() => setIsLoginClicked(prevState => !prevState)}>
                        <span>Login</span>
                        <span className={`${isLoginClicked ? "rotate" : ""} transition-[all_0.3s] `}><i className="fa-solid fa-angle-down"></i></span>
                    </button>
                    {
                        isLoginClicked &&
                        <ul className="absolute bg-white w-full rounded-[6px] border-[1px] border-gray-500 overflow-hidden mt-[3px]">
                            <Link to={"/adminLogin"}><li className="h-[40px] flex items-center px-[10px] hover:bg-lightgray transition-[all_0.3s] cursor-pointer">Admin</li></Link>
                            <Link to={"/instructorLogin"}><li className="h-[40px] flex items-center px-[10px] hover:bg-lightgray transition-[all_0.3s] cursor-pointer">Enseignant</li></Link>
                            <Link to={"/studentLogin"}> <li className="h-[40px] flex items-center px-[10px] hover:bg-lightgray transition-[all_0.3s] cursor-pointer">Etudiant</li></Link>
                        </ul>
                    }
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
