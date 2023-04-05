interface User {
  id: string;
  user_name: string;
  email: string;
  password?: string;
  token?: string;
}

interface UserIdWithToken {
  id: string;
  token: string;
}

export {User, UserIdWithToken};
