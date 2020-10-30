import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from 'react-router-dom';
import { Row, Container, Col } from 'react-bootstrap';
// import { isEmail } from "validator";

import AuthService from "../../servicios/usuarios/auth.service";

//Assets
import './../../assets/css/Registro.css';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// const email = value => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  const regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
  if (value.length < 8 || value.length > 40 || !regex.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFechaNacimiento = this.onChangeFechaNacimiento.bind(this);

    this.state = {
      username: "",
      password: "",
      successful: false,
      message: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      genero: "",
      fechaNacimiento: new Date()
    };
  }

  onChangeUsername(e) {
    if (e.target.name === 'username') {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.name === 'primerNombre') {
      this.setState({
        primerNombre: e.target.value
      });
    } else if (e.target.name === 'segundoNombre') {
      this.setState({
        segundoNombre: e.target.value
      });
    } else if (e.target.name === 'primerApellido') {
      this.setState({
        primerApellido: e.target.value
      });
    } else if (e.target.name === 'segundoApellido') {
      this.setState({
        segundoApellido: e.target.value
      });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeFechaNacimiento(e) {
    this.setState({
      fechaNacimiento: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register({
        usuario: this.state.username,
        contrasena: this.state.password,
        primerNombre: this.state.primerNombre,
        segundoNombre: this.state.segundoNombre,
        primerApellido: this.state.primerApellido,
        segundoApellido: this.state.segundoApellido,
        genero: this.state.genero,
        fechaNacimiento: this.state.fechaNacimiento,
        rolUsuario: {
          "idRol": 2,
          "nombre": "ROLE_USUARIO",
          "usuario": null
        }
      }).then(function (response) {
        if (response.ok) {
          console.log('Usuario creado');
        } else {
          console.log('Respuesta de red OK pero respuesta HTTP no OK');
        };
      },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });

        }
      );
      // .then(
      //   response => {
      //     console.log(response);
      //     this.setState({
      //       message: response.data.message,
      //       successful: true
      //     });
      //   },
      //   error => {
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();

      //     this.setState({
      //       successful: false,
      //       message: resMessage
      //     });

      //   }
      // );
    }
  }

  render() {
    return (
      <Container className="Registrar">
        <Row className="justify-content-md-center">
          <Col md="8">
            <Row className="titulo">
              <Col xs="10">
                <span>Registrate</span>
              </Col>
              <Col xs="2">
                <img
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  alt="profile-img"
                  className="img-registro"
                />
              </Col>
            </Row>

            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  {/* <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div> */}

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="primerNombre">Primer Nombre:</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="primerNombre"
                      value={this.state.primerNombre}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="segundoNombre">Segundo Nombre:</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="segundoNombre"
                      value={this.state.segundoNombre}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="primerApellido">Primer Apellido:</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="primerApellido"
                      value={this.state.primerApellido}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="segundoApellido">Segundo Apellido:</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="segundoApellido"
                      value={this.state.segundoApellido}
                      onChange={this.onChangeUsername}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                    <Input
                      type="date"
                      className="form-control"
                      name="fechaNacimiento"
                      value={this.state.fechaNacimiento}
                      onChange={this.onChangeFechaNacimiento}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
            <Link to="/Login">Regresar</Link>
          </Col>
        </Row>
      </Container >
    );
  }
}