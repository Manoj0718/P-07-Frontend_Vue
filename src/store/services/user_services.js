//? now we have auth header , auth services,
//? data services

import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:3200/api/";

class UserService {
  getFeed() {
    return axios.get(API_URL + "posts", {
      headers: authHeader()
    });
  }
  getPost(id) {
    //? not quatation mark 
    return axios.get(API_URL + `posts/${id}`, {
      headers: authHeader()
    });
  }
  createPost(data) {
    return axios.post(API_URL + "posts", data, {
      headers: authHeader()
    })
  }
  // -- //! used patch backend , then frontend also need to be same.
  update(id, data) {
    return axios.put(API_URL + `posts/${id}`, data, {
      headers: authHeader()
    });
  }
  delete(id) {
    return axios.delete(API_URL + `posts/${id}`, {
      headers: authHeader()
    });
  }
  markPost(data) {
    return axios.post(API_URL + "posts/post_has_seen", data, {
      headers: authHeader()
    })
  }

}

export default new UserService();