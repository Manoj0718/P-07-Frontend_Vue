import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:3200/api/";

class CommentServices {
    getCommentsAll() {
        return axios.get(API_URL + 'comments', {
            headers: authHeader()
        });
    }
    postComment(data) {
        return axios.post(API_URL + 'comments', data, {
            headers: authHeader()
        });
    }
    deleteComment(id) {
        return axios.delete(API_URL + `comments/${id}`, {
            headers: authHeader()
        });
    }
}

export default new CommentServices();