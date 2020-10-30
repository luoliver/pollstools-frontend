import React, { Component } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";

// Servicios
import RespuestaService from "../../servicios/encuesta/respuesta.service";
import PreguntaService from "../../servicios/encuesta/pregunta.service";
import EncuestaService from "../../servicios/encuesta/encuesta.service";

export default class Encuesta extends Component {
    constructor(props) {
        super(props);
        this.handleCrear = this.handleCrear.bind(this);
        this.onChangeCampo = this.onChangeCampo.bind(this);
        this.state = {
            preguntas: null,
            respuestas: null,
            nombre: "",
            codigo: "",
            descripcion: "",
            message: "",
            show: false,
            setShow: false
        }
    }

    handleClose = (e) => this.setState({ show: false });


    handleCrear(e) {
        const categoria = {
            nombre: this.state.nombre,
            codigo: this.state.codigo,
            descripcion: this.state.descripcion
        };
        EncuestaService.crearCategoria(categoria);
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

    handleShow = (e) => this.setState({ show: true });

    consultarCategoria() {
        EncuestaService.consultarTodos().then(respuesta => {
            this.setState({
                categorias: respuesta
            });
        });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.consultarPorEncuesta(params.codigo);
    }

    consultarPorEncuesta(codigo) {
        EncuestaService.consultarPorCodigo(codigo).then(respuesta => {
            console.log(respuesta)
            PreguntaService.consultarPorEncuesta(respuesta).then(response => {
                this.setState({
                    preguntas: response
                });
            });
        });
    }

    mostrarRespuestas(pregunta, e) {
        RespuestaService.consultarPorPregunta(pregunta).then(resultado => {
            this.setState({ respuestas: resultado, show: true });
        });
    }

    render() {
        const { preguntas, respuestas, nombre, codigo, descripcion } = this.state;

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Descripción</th>
                            <th>Puntaje</th>
                            <th>Accion</th>
                            <th>Respuestas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preguntas && preguntas.map((Pregunta, key) =>
                            <tr key={key}>
                                <td>{Pregunta.pregunta}</td>
                                <td>{Pregunta.descripcion}</td>
                                <td>{Pregunta.puntaje}</td>
                                <td>
                                    <Button variant="primary" onClick={this.handleShow}>
                                        Launch demo modal
          </Button>
                                </td>
                                <td>
                                    <Button variant="primary" key={codigo} value={codigo} onClick={(e) => this.mostrarRespuestas(Pregunta, e)}>
                                        Launch demo modal
          </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Button variant="primary" onLoad={this.consultarCategoria} onClick={this.handleShow}>
                    Crear categoria
          </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mostrar respuestas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Respuesta</th>
                                    <th>Opción correcta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {respuestas && respuestas.map((respuesta, key) =>
                                    <tr key={key}>
                                        <td>{respuesta.respuesta}</td>
                                        <td><Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Check this switch"
                                            checked={respuesta.opcionCorrecta}
                                        /></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
              </Button>
                        <Button variant="primary" onClick={this.handleCrear}>
                            Save Changes
              </Button>
                    </Modal.Footer>
                </Modal>

                {/* <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear categoria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="nombre" value={nombre} onChange={this.onChangeCampo} placeholder="Nombre de la categoria" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
    </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicCodigo">
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control type="codigo" value={codigo} onChange={this.onChangeCampo} placeholder="Codigo de la categoria" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
    </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicDescripcion">
                                <Form.Label>Descripcion de la categoria</Form.Label>
                                <Form.Control as="textarea" value={descripcion} onChange={this.onChangeCampo} rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
              </Button>
                        <Button variant="primary" onClick={this.handleCrear}>
                            Save Changes
              </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        )
    }
}