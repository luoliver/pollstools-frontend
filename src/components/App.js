//Dependencias
import React from 'react';
import PropTypes from 'prop-types';

//components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';

//Data
import items from '../data/menu';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    const {children} = this.props;
    return (
      <div className="App">
        <Header title="Codejobs" items={items} />
        <Content body={children}/>
        <Footer copyright="&copy; Codeobs 2020" />
      </div>
    );
  }
}

export default App;
