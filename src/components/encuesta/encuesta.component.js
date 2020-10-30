import React, { Component } from "react";
import { Button, Table, Form } from "react-bootstrap";

// Servicios
import EncuestaService from "../../servicios/encuesta/encuesta.service";
import PreguntaService from "../../servicios/encuesta/pregunta.service";
import RespuestaService from "../../servicios/encuesta/respuesta.service";

export default class Encuesta extends Component {
    constructor(props) {
        super(props);
        this.onChangeCampo = this.onChangeCampo.bind(this);
        this.cargarSiguientePregunta = this.cargarSiguientePregunta.bind(this);
        this.state = {
            visible: false,
            preguntas: null,
            pregunta: [],
            respuestas: null,
            siguientePregunta: 0,
            encuestas: null,
            message: ""
        }
    }

    onChangeCampo(e) {
        if (e.target.id === "formBasicNombre") {
            this.setState({
                nombre: e.target.value
            })
        } else if (e.target.id === "formBasicCodigo") {
            this.setState({
                codigo: e.target.value
            })
        } else if (e.target.id === "formBasicDescripcion") {
            this.setState({
                descripcion: e.target.value
            })
        }
    }

    componentDidMount() {
        this.consultarEncuestas();
    }

    consultarEncuestas() {
        EncuestaService.consultarEncuestas().then(response => {
            this.setState({
                encuestas: response
            });
        });
    }

    cargarSiguientePregunta(e) {
        if (this.state.preguntas && this.state.siguientePregunta < this.state.preguntas.length) {
            this.setState({
                pregunta: this.state.preguntas[this.state.siguientePregunta],
                siguientePregunta: this.state.siguientePregunta + 1
            });
            RespuestaService.consultarPorPregunta(this.state.pregunta).then(resultado => {
                this.setState({ respuestas: resultado, show: true });
            });
        } else {
            this.setState({
                message: "Finalizo la encuesta, Muchas gracias"
            });
        }
    }

    resolverPreguntas(codigo, e) {
        EncuestaService.consultarPorCodigo(codigo).then(respuesta => {
            PreguntaService.consultarPorEncuesta(respuesta).then(response => {
                this.setState({
                    preguntas: response,
                    visible: true
                });
                this.cargarSiguientePregunta();
            });
        });
    }

    render() {
        const { respuestas, pregunta, encuestas, visible, message } = this.state;

        return (
            <div>
                <Table hidden={visible}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Categoria</th>
                            <th>Responder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encuestas && encuestas.map((encuesta, key) =>
                            <tr key={key}>
                                <td>{encuesta.nombre}</td>
                                <td>{encuesta.descripcion}</td>
                                <td>{encuesta.categoria.nombre}</td>
                                <td>
                                    <Button variant="primary" onClick={(e) => this.resolverPreguntas(encuesta.codigo, e)}>
                                        Launch demo modal
          </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className="ResolverPreguntas" hidden={!visible}>
                    {/* {preguntas && preguntas.map((pregunta, key) => */}
                    <div>
                        <div>{pregunta.pregunta}</div>
                        <div>
                            <ul>
                                {respuestas && respuestas.map((respuesta, key) =>
                                    <Form.Check key={key}
                                    custom
                                    type="radio"
                                    label={respuesta.respuesta}
                                    id={respuesta.id}
                                  />
                                )}
                            </ul>
                        </div>
                        <Button variant="primary" onClick={this.cargarSiguientePregunta}>
                                        Launch demo modal
          </Button>
          {message && (
                            <div className="form-group">
                                <div className="alert alert-proccess" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* )} */}
                </div>
            </div>
        )
    }
}