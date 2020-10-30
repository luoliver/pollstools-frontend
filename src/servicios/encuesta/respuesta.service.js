import authHeader from '../usuarios/auth-header';

const API_URL = "http://localhost:7002/api/respuestas";

class RespuestaService {

    consultarPorPregunta(pregunta) {
        let headers = authHeader();
        headers["Content-Type"] = 'application/json;charset=UTF-8';
        headers["Access-Control-Allow-Origin"] = '*';
        var myHeaders = new Headers(headers);
        var myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(pregunta)
        };
        return fetch(API_URL+"/byPregunta", myInit).then(function (response) {
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
}

export default new RespuestaService();