import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:3200/api/auth/";


class UserModifyFunction{
    getUsers(){
        return axios.get(API_URL+"users",{headers:authHeader()});
    }

    getSingleUser(id){
        return axios.get(API_URL+`users/${id}`,{headers:authHeader()});
    }

    updateUser(id,data){
        return axios.patch(API_URL+`users/${id}`,data,{headers:authHeader()});

    }

    deleteUser(id)
    {  return axios.delete(API_URL+`users/${id}`,{headers:authHeader()});}
}

export default new UserModifyFunction();