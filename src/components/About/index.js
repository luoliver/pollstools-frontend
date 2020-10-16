//Dependencias
import React, { Component } from 'react';

class About extends Component {
    constructor() {
        super();
        this.state = {
          count: 0
        };
        this.handleCountClick = this.handleCountClick.bind(this);
        this.handleresultClick = this.handleresultClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
      componentDidMount() {
        //Comprueba si el componente ya cambio
        this.setState({
          count: 1,
          number1: 0,
          number2: 0,
          result:0
        });
      }
    
      handleCountClick(e) {
        if (e.target.id === 'add') {
          this.setState({
            count: this.state.count + 1
          });
        } else if (e.target.id === 'substract' && this.state.count > 0) {
          this.setState({
            count: this.state.count - 1
          });
        } else {
          this.setState({
            count: 0
          });
        }
      }
    
      handleresultClick() {
    
        this.setState({
          result: this.state.number1 + this.state.number2
        });
      }
    
      handleInputChange(e) {
        if (e.target.id === 'number1') {
          this.setState({
            number1: Number(e.target.value)
          });
        } else {
          this.setState({
            number2: Number(e.target.value)
          });
        }
      }
    
      render() {
        return (
          <div className="About">
            <h3>Counter: {this.state.count}</h3>
            <p>
              <button id="add" onClick={this.handleCountClick}>+</button>
              <button id="substract" onClick={this.handleCountClick}>-</button>
              <button id="reset" onClick={this.handleCountClick}>reset</button>
            </p>
    
            <h2>Calculadora</h2>
    
            <p>
              <input id="number1" type="number" value={this.state.number1} onChange={this.handleInputChange} />
              <input id="number2" type="number" value={this.state.number2} onChange={this.handleInputChange} />
              <button id="result" onClick={this.handleresultClick}>=</button>
              {this.state.result}
            </p>
          </div>
        );
      }
}
export default About;