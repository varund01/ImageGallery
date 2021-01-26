import React,{useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import {Button,Avatar} from "@material-ui/core"
import axios,{post} from 'axios';
 
import Post from './Post';
import ImageUpload from './ImageUpload';
import CustomModal from './CustomModal';

import '../css/Home.css'


function Home() {
    const history = useHistory();
    const location = useLocation();
    
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("allImages")));
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [selectedImg, setSelectedImg] = useState(null); 

    const logoutHandler = () => {
        localStorage.clear();
        history.push("/login");
    };
    console.log(posts);


    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    } 

    const fileUpload = (file) => {
        const url = 'http://localhost:8080/upload';
        const formData = new FormData();
        formData.append('file',file)
        formData.append('email',localStorage.getItem("email"))
        formData.append('caption',caption)
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        return post(url, formData,config)
    }


    const handleUpload = (e) => {
        e.preventDefault();
        if(image==null) {
            alert("Please select a file to upload");
            return;
        }
        fileUpload(image).then((response)=>{
            console.log(response.data);
            posts ?
            setPosts([
                ...posts,
                response.data
            ])
            :
            setPosts([
                response.data
            ])
        });
        cancelCourse();
    }

    const cancelCourse = () => { 
        document.getElementById("cap").value="";
        document.getElementById('cap1').value = null;
        setImage(null);
        setCaption("");
    }

    if (!(localStorage.getItem("email"))) {
        history.push("/login");
    }
    console.log("fdf ",localStorage.getItem("email"),JSON.parse(localStorage.getItem("allImages")));
    return (
        <div className="home">
            <div className="home__header">
                <div className="home__subheader">
                    <p className="home__subheader__text">ImageGallery</p>
                </div>
                <div>
                    <div className="home__subheader">
                        <Avatar
                            className="home__avatar"
                            alt={localStorage.getItem("email")}
                            src="/static/images/avatar/1.jpg"    
                        />

                        <h4>{localStorage.getItem("email")}</h4>
                    <Button onClick={logoutHandler}>Logout</Button>
                    </div>
                </div>
            </div>
            

            <div className="imageupload">
                    <input type="text" id="cap" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} />
                    <input type="file"  id="cap1" onChange={e=>handleChange(e)} required/>
                    <Button onClick={handleUpload}>Upload</Button>
            </div>


            <div className="home__posts">
                {
                    posts ?
                        posts.map(post => (
                            <Post key={Math.random()} setSelectedImg={setSelectedImg} username={post.username} caption={post.caption} imageUrl={`assets/${post.imageUrl}`}/>
                        )).reverse()

                    : 
                        <p>There are no posts right now</p>
                }
            </div>
            {selectedImg && <CustomModal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
        </div>
    )
}

export default Home