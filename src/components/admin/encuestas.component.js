import React, { Component } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";

// Servicios
import EncuestaService from "../../servicios/encuesta/encuesta.service";
import CategoriaService from "../../servicios/encuesta/categoria.service";

export default class Encuesta extends Component {
    constructor(props) {
        super(props);
        this.handleCrear = this.handleCrear.bind(this);
        this.onChangeCampo = this.onChangeCampo.bind(this);
        this.state = {
            categorias: null,
            encuestas: null,
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
        CategoriaService.crearCategoria(categoria);
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
        CategoriaService.consultarTodos().then(respuesta => {
            this.setState({
                categorias: respuesta
            });
        });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.consultarPorCategoria(params.codigo);
    }
    
    consultarPorCategoria(codigo) {
        CategoriaService.consultarPorCodigo(codigo).then(respuesta => {
            EncuestaService.consultarPorCategoria(respuesta).then(response => {
                this.setState({
                    encuestas: response
                });
            });
        });
    }

    redirigirPreguntas(codigo,e) {
        this.props.history.push("/pregunta/"+codigo);
        window.location.reload();
    }

    render() {
        const { categorias, encuestas, nombre, codigo, descripcion } = this.state;

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Accion</th>
                            <th>Preguntas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encuestas && encuestas.map((encuesta, key) =>
                            <tr key={key}>
                                <td>{encuesta.codigo}</td>
                                <td>{encuesta.nombre}</td>
                                <td>{encuesta.descripcion}</td>
                                <td>
                                    <Button variant="primary" onClick={this.handleShow}>
                                        Launch demo modal
          </Button>
                                </td>
                                <td>
                                    <Button variant="primary" onClick={(e) => this.redirigirPreguntas(encuesta.codigo, e)}>
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
                </Modal>
            </div>
        )
    }
}