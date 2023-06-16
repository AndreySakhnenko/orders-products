export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
  }
export interface DataSignUp {
    oldUser: User[];
    users: User[];
    fullname: string;
    email: string;
    password: string;
    fullnameError: boolean;
    emailError: boolean;
    passwordError: boolean;
    isActive: boolean;
    newUserError: boolean;
}
export interface DataSignIn {
    oldUser: User[];
    email: string;
    password: string;
    emailError: boolean;
    passwordError: boolean;
    errorLogIn: boolean,
}
