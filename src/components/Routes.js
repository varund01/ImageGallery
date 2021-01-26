import React from 'react'
import {BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";


import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
