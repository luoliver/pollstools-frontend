import authHeader from '../usuarios/auth-header';
import axios from 'axios';

const API_URL = "http://localhost:7002/api/categorias";

class CategoriaService {

    crearCategoria(categoria) {
        let headers = authHeader();

        headers["Content-Type"] = 'application/json;charset=UTF-8';
        headers["Access-Control-Allow-Origin"] = '*';
        let axiosConfig = {
            headers
          };
        return axios
            .post(API_URL, categoria , axiosConfig)
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            });
    }

    consultarTodos() {
        return fetch(API_URL, {
            method: 'GET',
            mode: 'cors',
            headers: authHeader()
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Peticion tuvo succes pero devolvio respuesta mal")
            }
        }, error => {
            console.log(error);
        }).then(respuesta => {
            return respuesta;
        });
    }

    consultarPorCodigo(codigo) {
        return fetch(API_URL + "/byCodigo/" +codigo, {
            method: 'GET',
            mode: 'cors',
            headers: authHeader()
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Peticion tuvo succes pero devolvio respuesta mal")
            }
        }, error => {
            console.log(error);
        }).then(respuesta => {
            return respuesta;
        }).catch( error => {
            console.log(error);
        });
    }
}

export default new CategoriaService();