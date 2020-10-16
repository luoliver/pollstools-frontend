//Dependecias
import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

//Assets
import logo from './images/logo.svg';
import './css/Header.css';

class Header extends React.Component {
    static propTypes = {
        title: Proptypes.string.isRequired,
        items: Proptypes.array.isRequired
    }
    render() {
        const { title, items } = this.props;
        return (
            <div className="Header">
                <header className="Logo">
                    <img src={logo} alt="logo" />
                </header>
                <h2>{title}</h2>
                <ul className="Menu">
                    {items && items.map((item, key) => 
                        <li key={key}><Link to={item.url}>{item.title}</Link></li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Header;
