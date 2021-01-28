import React from 'react';
import {Button,Avatar} from "@material-ui/core";
import '../css/Home.css';
import { Link, useHistory, useLocation } from "react-router-dom";

function header() {

    const history = new useHistory();

    const categoryHandler = () => {
        history.push("/category");
    }
    const logoutHandler = () => {
        localStorage.clear();
        history.push("/login");
    };
    const toggleShowImageUpload = () => {
        history.push("/home");
    }
    return (
        <div className="home__header">
            <div className="home__subheader">
                <p className="home__subheader__text">ImageGallery</p>

                <p className="image_upload_button" onClick={toggleShowImageUpload}>Upload</p>

                <p className="category_button" onClick={categoryHandler}>Categories</p>
                {/* <p className="home__subheader__text"><Link to="/images">CarouselView</Link></p> */}
            </div>
            <div>
                <div className="home__subheader">
                    <Avatar
                        className="home__avatar"
                        alt={localStorage.getItem("email")}
                        src="/static/images/avatar/1.jpg"    
                    />

                    <h4 className="home__subheader__text">{localStorage.getItem("email")}</h4>
                    <Button variant="contained" color="secondary" onClick={logoutHandler}>Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default header
