import img from "../../assets/images/pexels-seven11nash-380769 (1).jpg";

function Apropos() {
    return (
        <div className="pt-[150px] container px-[20px]">
            <h2 className="title-style uppercase text-[30px] font-bold text-secondary">A propos de stage</h2>
            <div className=" flex mt-[50px] gap-[50px]  ">
                <div className="flex-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ex dolore cum tempore rem porro magnam deleniti nisi. Minus commodi doloremque repellat vero natus quidem? Ea itaque cupiditate animi consequatur odit saepe dolore, alias natus harum nostrum cumque eaque error, ipsum inventore iusto. Nam amet possimus tenetur et recusandae aspernatur?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ex dolore cum tempore rem porro magnam deleniti nisi. Minus commodi doloremque repellat vero natus quidem? Ea itaque cupiditate animi consequatur odit saepe dolore, alias natus harum nostrum cumque eaque error, ipsum inventore iusto. Nam amet possimus tenetur et recusandae aspernatur?
                </div>
                <div className="flex-1">
                    <img src={img} alt="" className="w-full"/>
                </div>
            </div>
        </div>
    )
}

export default Apropos
