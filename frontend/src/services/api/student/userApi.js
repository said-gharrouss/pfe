import { axiosClient } from "../../../api/axios";

const userApi = {
    login : async (email,password) => {
        return await axiosClient.post("/login",{email,password})
    },
    logout : async () => {
        return await axiosClient.post("/logout")
    },
    getUser : async (value) => {
        return await axiosClient.get(`/${value}`)
    }
}

export default userApi;
