//Dependencias
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//Routes
import AppRoutes from './components/routes';

//Assets
import '../src/assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById('root')
);
