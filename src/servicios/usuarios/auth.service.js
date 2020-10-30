import axios from 'axios';

const API_URL = "http://localhost:7002/api/auth";
const API_USER_URL = "http://localhost:7002/api/users";

class AuthService {

    login(usuario, contrasena) {
        return axios
            .post(API_URL + "/login", {
                usuario,
                contrasena
            })
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(usuario) {
        console.log(usuario);
        return fetch(API_USER_URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(usuario) // body data type must match "Content-Type" header
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();