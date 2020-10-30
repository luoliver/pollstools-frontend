import authHeader from '../usuarios/auth-header';

const API_URL = "http://localhost:7002/api/encuestas";

class EncuestaService {

    consultarPorCategoria(categoria) {
        let headers = authHeader();
        headers["Content-Type"] = 'application/json;charset=UTF-8';
        headers["Access-Control-Allow-Origin"] = '*';
        var myHeaders = new Headers(headers);
        var myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(categoria)
        };
        return fetch(API_URL + "/byCategoria", myInit).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response);
                console.log("Peticion tuvo succes pero devolvio respuesta mal")
            }
        }, error => {
            console.log(error);
        }).catch(error => {
            console.log(error);
        }).then(respuesta => {
            return respuesta;
        });
    }

    consultarPorCodigo(codigo) {
        return fetch(API_URL + "/byCodigo/" + codigo, {
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
        }).catch(error => {
            console.log(error);
        });
    }

    consultarEncuestas(){
        let headers = authHeader();
        headers["Content-Type"] = 'application/json;charset=UTF-8';
        headers["Access-Control-Allow-Origin"] = '*';
        var myHeaders = new Headers(headers);
        var myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        return fetch(API_URL, myInit).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response);
                console.log("Peticion tuvo succes pero devolvio respuesta mal")
            }
        }, error => {
            console.log(error);
        }).catch(error => {
            console.log(error);
        }).then(respuesta => {
            return respuesta;
        });
    }
}

export default new EncuestaService();