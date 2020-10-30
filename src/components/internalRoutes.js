//Dependencias
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import App from './App';
import Login from './user/login.component';
import Profile from './user/profile.component';
import Server from './admin/usuarios.component';
import Categoria from './admin/categorias.component';
import Encuesta from './admin/encuestas.component';
import Pregunta from './admin/preguntas.component';
import ResolverEncuesta from './encuesta/encuesta.component';
import Page404 from './page404';

const AppInternalRoutes = () => 
    <App>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/server" component={Server} />
            <Route path="/profile" component={Profile} />
            <Route path="/categoria" component={Categoria} />
            <Route path="/encuesta/:codigo" component={Encuesta} /> 
            <Route path="/pregunta/:codigo" component={Pregunta} /> 
            <Route path="/resolverEncuesta" component={ResolverEncuesta} /> 
            <Route component={Page404} />
        </Switch>
    </App>

export default AppInternalRoutes;