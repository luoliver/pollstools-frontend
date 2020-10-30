//Dependecias
import React from 'react';
import Proptypes from 'prop-types';

//Assets
import logo from '../../assets/images/logo.svg';
import '../../assets/css/Header.css';

//Services
import AuthService from "../../servicios/usuarios/auth.service";
import { Row, Nav, Col } from 'react-bootstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    static propTypes = {
        title: Proptypes.string.isRequired,
        items: Proptypes.array.isRequired
    }

    logOut() {
        AuthService.logout();
    }
    render() {
        const { title, items } = this.props;
        return (
            <div className="Header">
                <Row>
                    <Col sm={3}>
                        <Nav defaultActiveKey="/home" className="flex-column">
                            {items && items.map((item, key) =>
                                <Nav.Link key={key} href={item.url}>{item.titulo}</Nav.Link>
                            )}
                        </Nav>
                    </Col>
                    <Col sm={{ span: 4, offset: 5 }}>
                        <h2>{title}</h2>
                        <header className="Logo">
                            <img src={logo} alt="logo" />
                        </header>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;
