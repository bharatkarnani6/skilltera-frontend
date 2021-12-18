import react from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Home from '../Pages/Home/home';
import Login from '../Pages/Login/login'
import Dashboard from '../Pages/Dashboard/dashboard';
import SecuredRoutes from './securedroutes';
import About from '../Pages/About/about';
import Blog from '../Pages/Blog/blog'
import Contact from '../Pages/Contact/contact';
import CompanyLogin from '../Pages/Company Login/companyLogin';
import CompanyDashboard from '../Pages/Company Dashboard/companyDashboard';



export default function Routes() {

 const companyLogin = localStorage.getItem('companyLogin')
 console.log("companyLogin" ,companyLogin)

 const candidateLogin = localStorage.getItem('candidateLogin')
 
 console.log("canditateLogin" ,candidateLogin) 

    return (
        <div>
            <Switch>
                <Route exact path="/" ><Home /></Route>
                <Route exact path="/login" ><Login /></Route>
                <Route exact path="/about" ><About /></Route>
                <Route exact path="/blog" ><Blog /></Route>
                <Route exact path="/contact" ><Contact /></Route>
                <Route exact path="/company_login" ><CompanyLogin /></Route>
                
 {companyLogin ?<SecuredRoutes exact path="/companyDashboard" component={CompanyDashboard}/> :   <Route exact path="/" ><Home /></Route>}
 
 { candidateLogin != null? <SecuredRoutes exact path="/dashboard" component={Dashboard}/> : <Route exact path="/" ><Home /></Route>}

            </Switch>
        </div>
    );
}