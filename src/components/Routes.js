import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import {BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";
import CarouselFormat from './CarouselFormat';


import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Category from "./Category";


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
                <Route exact path="/images">
                    <CarouselFormat />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/category">
                    <Category />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
