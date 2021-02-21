import React,{useState} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {withRouter, Link, useHistory} from 'react-router-dom'; 
import {Button} from "@material-ui/core" ;
import CustomAlert from "./CustomAlert";

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

    const [modal, setModal] = useState({
        modalIsOpen: false,
        modalTitle: "",
        modalBody: "",
    });
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
            url:"http://localhost:7800/login",
            method:"post",
            data: fd,
        });
        console.log(response.data);
        if(response.data.message === "Success") {
            localStorage.setItem("email",user.email);
            localStorage.setItem("Token",response.data.Token)
            console.log(response.data);
            const formData = new FormData();
            formData.append("email",user.email);
            const allImages = await axios({
                url:"http://localhost:8070/allImages",
                // url:"http://localhost/allImages.php",
                method:"post",
                headers: {
                    "Content-type":"application/x-www-form-urlencoded",
                },
                data: formData,
            });
            console.log("all",allImages.data);
            localStorage.setItem("allImages",JSON.stringify(allImages.data));
            localStorage.setItem("showImageUpload",false);
            
            const categories = await axios({
                url:"http://localhost/categories/read.php",
                method:"post",
                headers: {
                    "Content-type":"application/x-www-form-urlencoded",
                },
                data: formData,
            });
            localStorage.setItem("categories",JSON.stringify(categories.data));

            history.push({
                pathname: "/category",
            });
        }
        else {
            setUser(initialState);
            console.log(response.data.message);
            setModal({
                modalIsOpen: true,
                modalTitle: "Login error",
                modalBody: response.data.message,
              });
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
                <p className="login__subheader__text">ImageGallery</p>
                {
                    localStorage.getItem("email") ?
                        <div><Link to="/home">Images</Link></div>
                    :
                    <div>
                        <Button variant="contained" color="primary" id="signinbutton" onClick={onClickSignIn}>SignIn</Button>
                        <Button variant="contained" color="primary" onClick={onClickSignup}>Signup</Button>
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
                            <Button variant="contained" color="primary" type="submit" name="signin">Sign In</Button>
                        </div>
                        <hr />
                    </form>
                </>
            }
            <CustomAlert
                isShown={modal.modalIsOpen}
                setIsShown={setModal}
                ModalTitle={modal.modalTitle}
                ModalBody={modal.modalBody}
            />
        </div>
    )
}

export default withRouter(Login)
