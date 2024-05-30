import Navbar from "../components/navbar/Navbar"
import landingImg from '../assets/images/landingImg.jfif';
import VousEtes from "../components/vousEtes/VousEtes";
import Contact from "../components/contact/Contact";
import { Link,} from "react-scroll";
import Footer from "../components/footer/Footer";
import Apropos from "../components/Apropos/Apropos";
import { useRef } from "react";


function Home() {
    const arrow = useRef();

    window.onscroll = () => {
        if (window.scrollY >= 100) {
            arrow.current.classList.remove("hidden");
            arrow.current.classList.add("flex");
        } else {
            arrow.current.classList.remove("flex");
            arrow.current.classList.add("hidden");
        }
    }
    const handleArrow = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
        <div className="bg-secondary w-[40px] h-[40px] fixed z-[400] bottom-[10px] right-[10px] text-white
        rounded-[50px] flex justify-center items-center cursor-pointer shadow-xl hover:text-secondary
        hover:bg-white transition-[all_0.3s]" ref={arrow}
        onClick={() => handleArrow()}>
            <i className="fa-solid fa-arrow-up"></i>
        </div>
        <Navbar/>
        <div>
            <div className="relative hero">
                <img className="w-full h-[100vh] bg-cover" src={landingImg} alt="" />
                <div className="absolute text-white bottom-[110px] left-[150px] z-[5]">
                    <h2 className="text-[50px] font-bold ">Welcome !</h2>
                    <p className="text-[25px] font-semibold">platforme pur la gestion des stages</p>
                    <button className="h-[40px] w-[150px] border-[2px] border-white rounded-[30px] mt-[20px]
                    hover:bg-white hover:text-secondary transition-[all_0.3s]">
                        <Link
                            activeClass="active"
                            to="vous etes"
                            spy={true}
                            smooth={true}
                            duration={400}>
                            commencer
                        </Link>
                    </button>
                </div>
            </div>
        </div>
        <div>
        </div>
        <div id="a propos">
            <Apropos/>
        </div>
        <div id="vous etes">
            <VousEtes/>
        </div>
        <div id="contact">
            <Contact />
        </div>
        <div>
            <Footer/>
        </div>
        </>
    )
}

export default Home
