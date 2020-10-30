//Dependencias
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './user/login.component';
import Registrar from './user/register.component';
import InternalRoutes from './internalRoutes';

const AppRoutes = () =>
    <Switch>
        <Route path="/registrar" component={Registrar} />
        <Route path="/login" component={Login} />
        <Route component={InternalRoutes} />
    </Switch>

export default AppRoutes;