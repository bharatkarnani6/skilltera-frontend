import react, { useEffect, useState } from "react";
import { Switch, Route, Router } from "react-router-dom";
import Home from "../Pages/Home/home";
import Login from "../Pages/Login/login";
import Dashboard from "../Pages/Dashboard/dashboard";
import SecuredRoutes from "./securedroutes";
import About from "../Pages/About/about";
import Blog from "../Pages/Blog/blog";
import Contact from "../Pages/Contact/contact";
import CompanyLogin from "../Pages/Company Login/companyLogin";
import CompanyDashboard from "../Pages/Company Dashboard/companyDashboard";
import Admin from "../Pages/Admin/admin";
import AdminDashboard from "../Pages/Admin Dashboard/adminDashboard";
import Signup from "../Pages/Signup/signup";
import ForgetPassword from "../Pages/Forget Password/forgetpassword";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgotPassword">
          <ForgetPassword />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/blog">
          <Blog />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/company_login">
          <CompanyLogin />
        </Route>

        <Route exact path="/admin">
          <Admin />
        </Route>

        <SecuredRoutes
          exact
          path="/adminDashboard"
          component={AdminDashboard}
        />

        <SecuredRoutes
          exact
          path="/companyDashboard"
          component={CompanyDashboard}
        />

        <SecuredRoutes exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}
