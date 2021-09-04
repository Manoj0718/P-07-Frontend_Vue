//*createing auth header
//*It checks Local Storage for user item.
//*If there is a logged in user with accessToken (JWT),
//* return HTTP Authorization header. Otherwise, return an empty object.

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token !== '') {
    //!generally you can use follwing syntax//
    return {
      Authorization: "Bearer " + user.token
    };

    //* But in our case, we useing node for our backend. NODE js use like this:

    //return { "x-access-token": user.token };
  } else {
    this.$toaster.success("Check Your Passcodes ");
    return {};

  }
}