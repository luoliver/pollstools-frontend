//Dependencias
import React from 'react';
import axios from 'axios';


class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }


    componentDidMount() {
        axios.get('http://localhost:7002/Usuarios')
            .then(res => res)
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                });
            },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.primerNombre} {item.primerApellido}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default MyComponent;