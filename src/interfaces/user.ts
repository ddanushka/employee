export interface User {
  username: string;
  password: string;
}

export interface SetUser {
  isAuth: boolean;
  role: "admin" | "standard";
}
