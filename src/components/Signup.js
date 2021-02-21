import React,{useState} from 'react';
import {useHistory,withRouter,Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import axios from 'axios';

import "../css/Login.css"
import "../App.css"
import CustomAlert from './CustomAlert';


function Signup() {
    const history = useHistory();
    const initialState = {
        name:"",
        email: "",
        password: "",
    };
    const [modal, setModal] = useState({
        modalIsOpen: false,
        modalTitle: "",
        modalBody: "",
    });
    const [user,setUser] = useState(initialState);
    const [confirm,setConfirm] = useState("");

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setUser({ ...user, [name]: value });
    }
    const onConfirmChange = (e) => {
        setConfirm(e.target.value);
    }
    const onFormSubmit = async(e) => {
        e.preventDefault();
        if(user.password === "") {
            alert("Password filed cannot be empty");
            return;
        }
        if(confirm !== user.password){
            alert("Password and confirm password are not same!");
            return;
        }
        var fd=new FormData();
        fd.append("email", user.email);
        fd.append("password", user.password);
        console.log();
        const response = await axios({
            url:"http://localhost/signup.php",
            method:"post",
            data: fd,
        });
        console.log(response);
        if(response.data.message==="Success"){
            //alert("Registered Successfully! Please sign in");
            
            history.push("/login");
        }
        else{
            setModal({
                modalIsOpen: true,
                modalTitle: "User Already Exist",
                modalBody: "Please sign in to proceed...",
              });
        }
            
    }

    const onClickSignIn = () => {
        history.push("/login");
    }

    const onClickSignup = () => {
        history.push("/signup");
    }
    return (
        <div>
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
                <h3>Sign up to get access to Images</h3>
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
                <div className="form-group">
                    <label htmlFor="confirm">
                        Confirm Password
                    </label>
                    <input type="password" className="form-control"
                        name="confirm" value={user.confirm} onChange={onConfirmChange}
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit" name="signin" >Register</Button>
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

export default withRouter(Signup)
