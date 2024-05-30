
function Contact() {
    return (
        <div className="container px-[20px] pt-[150px]">
            <h2 className="title-style uppercase text-[30px] font-bold text-secondary">contactez-nous</h2>
            <div className="flex mt-[40px] gap-[50px] items-center">
                <div className="flex-1 flex flex-col gap-[40px]">
                    <div className="bg-gray-200 p-[20px] text-center shadow-md rounded-[4px]">
                        <div className="text-[25px] text-secondary">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <h3 className="font-semibold my-[10px]">Notre adresse</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="bg-gray-200 p-[20px] text-center flex-1 shadow-md rounded-[4px]">
                            <div className="text-[25px] text-secondary">
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <h3 className="font-semibold my-[10px]">Envoyez-nous un e-mail</h3>
                            <p>test@gmail.com</p>
                        </div>
                        <div className="bg-gray-200 p-[20px] text-center flex-1 shadow-md rounded-[4px]">
                            <div className="text-[25px] text-secondary">
                                <i className="fa-solid fa-phone-volume"></i>
                            </div>
                            <h3 className="font-semibold my-[10px]">Appelez-nous</h3>
                            <p>(+212) 0606060606</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 flex-1 p-[20px] shadow-md rounded-[4px]">
                    <form action="">
                        <div className="flex w-full gap-[10px]">
                            <input type="text"  className="border-[1px] border-secondary flex-1 h-[35px] outline-none px-[10px] rounded-[4px] focus"
                            placeholder="Entrer le nom"/>
                            <input type="email" className="border-[1px] border-secondary flex-1 outline-none px-[10px] rounded-[4px] focus"
                            placeholder="Entrer l'email"/>
                        </div>
                        <div className="my-[20px]">
                            <input type="text" className="w-full border-[1px] h-[35px] border-secondary outline-none px-[10px] rounded-[4px] focus"
                            placeholder="Sujet"/>
                        </div>
                        <textarea className="w-full outline-none resize-none p-[10px] h-[160px] rounded-[4px]
                        border-[1px] border-secondary focus" placeholder="Message"></textarea>
                        <div className="flex justify-end mt-[10px]">
                            <input type="submit" value={"Envoyer le message"} className="h-[40px] w-[150px] block bg-secondary text-white rounded-[4px] cursor-pointer "/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
