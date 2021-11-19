import react from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Home from '../Pages/Home/home';
import Login from '../Pages/Login/login'
import Dashboard from '../Pages/Dashboard/dashboard';
import SecuredRoutes from './securedroutes';


export default function Routes() {
    return (
        <div>

            <Switch>
                <Route exact path="/" ><Home /></Route>
                <Route exact path="/login" ><Login /></Route>
                <SecuredRoutes exact path="/dashboard" component={Dashboard} />
            </Switch>

        </div>
    );
}