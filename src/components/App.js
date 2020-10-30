//Dependencias
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

//components
import Header from './global/Header';
import Content from './global/Content';
import Footer from './global/Footer';

//services
import AuthService from "../servicios/usuarios/auth.service";

class App extends React.Component {

  constructor(props) {
    super(props);

    const user = AuthService.getCurrentUser();
    if (user) {
      this.state = {
        currentUser: user,
        menus: user.urls
      };
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }

  }

  componentDidMount() {
  }

  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props;
    const { menus } = this.state;
    return (
      <div className="App">
        <Header title="Codejobs" items={menus} />
        <Content body={children} />
        <Footer copyright="&copy; Codeobs 2020" />
      </div>
    );
  }
}

export default withRouter(App);
