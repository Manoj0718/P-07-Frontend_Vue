//!all authentication services handle from here //
//*login(): POST {username, password} & save JWT to Local Storage
//*logout(): remove JWT from Local Storage
//*register(): POST {username, email, password}

import axios from "axios";
const Api_URL = "http://localhost:3200/api/auth/";

class AuthServices {
  login(user) {
    //console.log(" insie AuthServices");
    return axios
      .post(
        Api_URL + "login", {
          user_email: user.user_email,
          user_password: user.user_password,
        },
      )
      .then((responce) => {
        console.log("auth services responce", responce);
        if (responce.data.token) {
          localStorage.setItem("user", JSON.stringify(responce.data));
          console.log("here id", responce.data.user.id);
        }
        return responce.data;
      });
  }
  logout() {
    localStorage.removeItem("user");

  }
  register(user) {
    return axios.post(Api_URL + "signup", {
      user_email: user.user_email,
      user_password: user.user_password,
      first_name: user.first_name,
      last_name: user.last_name,
      user_hobbies: user.user_hobbies,
      user_bio: user.user_bio,
    });
  }

}
export default new AuthServices();