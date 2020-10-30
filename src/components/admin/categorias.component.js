import React, { Component } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";

// Servicios
import CategoriaService from "../../servicios/encuesta/categoria.service";

export default class Categorias extends Component {
    constructor(props) {
        super(props);
        this.handleCrear = this.handleCrear.bind(this);
        this.onChangeCampo = this.onChangeCampo.bind(this);
        this.redirigirEncuestas = this.redirigirEncuestas.bind(this);
        this.state = {
            categorias: null,
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

    redirigirEncuestas(codigo,e) {
        this.props.history.push("/encuesta/"+codigo);
        window.location.reload();
    }

    handleShow = (e) => this.setState({ show: true });

    componentDidMount() {
        this.consultarCategoria();
    }

    consultarCategoria() {
        CategoriaService.consultarTodos().then(respuesta => {
            this.setState({
                categorias: respuesta
            });
        });
    }

    
    render() {
        const { categorias, nombre, codigo, descripcion } = this.state;
       
        return (
            <div>
                <Table >
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Accion</th>
                            <th>Encuestas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias && categorias.map((categoria, key) =>
                            <tr key={key}>
                                <td>{categoria.codigo}</td>
                                <td>{categoria.nombre}</td>
                                <td>{categoria.descripcion}</td>
                                <td>
                                    <Button variant="primary" onClick={this.handleShow}>
                                        Launch demo modal
          </Button>
                                </td>
                                <td>
                                    <Button variant="primary" key={codigo} value={codigo} onClick={(e) => this.redirigirEncuestas(categoria.codigo, e)}>
                                        Launch demo modal
          </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Button variant="primary" onClick={this.handleShow}>
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