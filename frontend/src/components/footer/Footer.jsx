import { Link as ScrollLink } from 'react-scroll';
function Footer() {
    return (
        <div className="bg-secondary mt-[150px]">
            <div className="container py-[50px] px-[20px]">
                <div className="flex gap-[100px] text-white">
                    <div className="flex-[2]">
                        <h3 className="font-bold">ENSA-OUJDA</h3>
                        <p>Ecole Nationale des Sciences Appliquées oujda</p>
                    </div>
                    <div className="flex-1 ">
                        <h3 className="font-bold mb-[10px]">liens utiles</h3>
                        <ul className="text-gray-300 ml-[5px] flex flex-col gap-[10px]">
                            <li className="cursor-pointer flex gap-[6px] items-center text-[15px]  " >
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="hover:underline hover:text-white">Home</span>
                            </li>
                            <li className="cursor-pointer flex gap-[6px] items-center text-[15px]" >
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="hover:underline hover:text-white">
                                <ScrollLink
                                activeClass="active"
                                to="a propos"
                                spy={true}
                                smooth={true}
                                duration={400}>
                                A propos
                                </ScrollLink>

                                </span>
                            </li>
                            <li className="cursor-pointer flex gap-[6px] items-center text-[15px]" >
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="hover:underline hover:text-white">
                                <ScrollLink
                            activeClass="active"
                            to="vous etes"
                            spy={true}
                            smooth={true}
                            duration={400}>
                            Vous êtes
                        </ScrollLink>
                                </span>
                            </li>
                            <li className="cursor-pointer flex gap-[6px] items-center text-[15px]" >
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="hover:underline hover:text-white">
                                <ScrollLink
                            activeClass="active"
                            to="contact"
                            spy={true}
                            smooth={true}
                            duration={400}>
                            Contact
                            </ScrollLink>

                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-[50px] text-center text-[22px] text-white font-semibold">&copy; Tous droits réservés 2024</div>
            </div>
        </div>
    )
}

export default Footer
