export default class User {
  constructor(
    user_email,
    user_password,
    first_name,
    last_name,
    user_hobbies,
    user_bio
  ) {
    this.user_email = user_email;
    this.user_password = user_password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_hobbies = user_hobbies;
    this.user_bio = user_bio;
  }
}
