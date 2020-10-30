//Dependences
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Assets
import '../../assets/css/Content.css';
import { Container } from 'react-bootstrap';

class Content extends Component {
  static propTypes = {
    body: PropTypes.object.isRequired
  }

  render() {
    const { body } = this.props;

    return(
      <Container className="Content">
        {body}
      </Container>
    )
  }  
}

export default Content;
