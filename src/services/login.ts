import { User, SetUser } from "../interfaces/user";

const UserLogin = {

    getUser: (): SetUser => {
        const user = localStorage.getItem("loggedUser");
        return user ? JSON.parse(user) : {};
    },
    loginUser: (user: User): void => {
        const users = UserLogin.getUser();

        // Here you would normally make an API call to validate the user credentials and get the role information.
        if (user.username.toLowerCase() == 'user' && user.password.toLowerCase() == 'user') {
            users.isAuth = true;
            users.role = "standard";
        }
        if (user.username.toLowerCase() == 'admin' && user.password.toLowerCase() == 'admin') {
            users.isAuth = true;
            users.role = "admin";
        }

        localStorage.setItem("loggedUser", JSON.stringify(users));
    },

    checkAuth: () => {
        const user = UserLogin.getUser();
        if (user.isAuth && user.role) {
            return user
        }
    },

    logoutUser: () => {
        const user = UserLogin.getUser();
        localStorage.setItem("loggedUser", JSON.stringify({}));
    },

};

export default UserLogin;
