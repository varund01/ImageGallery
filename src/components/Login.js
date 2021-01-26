import React,{useState} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {withRouter, Link, useHistory} from 'react-router-dom'; 
import {Button} from "@material-ui/core" ;

import  "../css/Post.css";
import "../App.css"
import '../css/Home.css'
import '../css/Login.css'

function Login() {

    const initialState = {
        email: "",
        password: "",
    };

    const history = useHistory();

    const [user,setUser] = useState(initialState);

    const onChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setUser({ ...user, [name]: value });
        console.log(value);
    };


    const onFormSubmit = async (e) => {
        e.preventDefault();
        
        var fd = new FormData();
        fd.append("email", user.email);
        fd.append("password", user.password);
        console.log();
        const response = await axios({
            url:"http://localhost/login.php",
            method:"post",
            data: fd,
        });
        console.log(response.data.message);
        if(response.data.message === "Success") {
            localStorage.setItem("email",user.email);
            console.log(response.data);
            const formData = new FormData();
            formData.append("email",user.email);
            const allImages = await axios({
                url:"http://localhost:8080/allImages",
                method:"post",
                headers: {
                    "Content-type":"application/x-www-form-urlencoded",
                },
                data: formData,
            });
            console.log(allImages.data);
            localStorage.setItem("allImages",JSON.stringify(allImages.data));
            history.push({
                pathname: "/home",
            });
            
        }
        else {
            alert(response.data.message);
            setUser(initialState);
            console.log(response.data.message);
        }

    };


    const onClickSignIn = () => {
        history.push("/login");
    }

    const onClickSignup = () => {
        history.push("/signup");
    }


    return (
        <div className="login"> 

            <div className="app__header">
                ImageGallery
                {
                    localStorage.getItem("email") ?
                        <div><Link to="/home">Images</Link></div>
                    :
                    <div>
                        <Button onClick={onClickSignIn}>SignIn</Button>
                        <Button onClick={onClickSignup}>Signup</Button>
                    </div>

                }
            </div>
            {
                localStorage.getItem("email") ?
                    <div> Already logged in.. Please click Images to see your images</div>
                : 
                <>
                    <form className="login__form" onSubmit={onFormSubmit}>
                        <h3>Sign in to get access to Images</h3>
                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" className="form-control"
                                name="email" value={user.email} onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input type="password" className="form-control"
                                name="password" value={user.password} onChange={onChange}
                            />
                        </div>
                        <div>
                            <Button type="submit" name="signin">Sign In</Button>
                        </div>
                        <hr />
                    </form>
                </>
            }

        </div>
    )
}

export default withRouter(Login)
