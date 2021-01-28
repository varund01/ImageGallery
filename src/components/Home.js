import React,{useState} from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import {Button,Avatar} from "@material-ui/core"
import axios,{post} from 'axios';
 
import Post from './Post';
import ImageUpload from './ImageUpload';
import CustomModal from './CustomModal';
import Header from './Header';

import '../css/Home.css'


function Home() {
    const history = useHistory();
    const location = useLocation();
    
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("allImages")));
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [uploadCategory, setUploadCategory] = useState('');
    const [selectedImg, setSelectedImg] = useState(null); 
    const [categories] = useState(JSON.parse(localStorage.getItem("categories")));
    const [showImageUpload,setShowImageUpload] = useState(false);
    const [showCategoryImages,setShowCategoryImages] = useState("All");
    const [imagesByCategory,setImagesByCategory] = useState(null);
    
    
    console.log(posts);
    localStorage.setItem("allImages",JSON.stringify(posts));

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
        if(uploadCategory!="No Category") {
            formData.append('category',uploadCategory)
        }
        else {
            formData.append('category',"")
        }
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        return post(url, formData,config)
    }


    const handleUpload = (e) => {
        e.preventDefault();
        if(image===null) {
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
        setShowImageUpload(!showImageUpload);
        cancelCourse();
    }

    
    const showImagesHandler = (e) => {
        setShowCategoryImages(e.target.value);
        if(e.target.value == "All"){
            setImagesByCategory(posts);
            return;
        }
        const ImagesData = new FormData();
        ImagesData.append("email",localStorage.getItem("email"));
        ImagesData.append("category",e.target.value);
        console.log(e.target.id);
        axios({
            url: "http://localhost:8080/getCategoryImages",
            method: "post",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
            },
            data: ImagesData,
        }).then((res)=>{
            console.log("here is category ",res.data);
            setImagesByCategory(res.data);
        })
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
            <Header />
            
            {
                <div className="imageupload">
                        <h2 onClick={()=>setShowImageUpload(!showImageUpload)}>Upload a image</h2><br />

                        {
                            showImageUpload ?
                            categories.length ?
                                <>
                                    Select the category Name<br />
                                    <select className="selectCategory" onChange={(e)=>setUploadCategory(e.target.value)}>
                                        <option value="No Category">No Category</option>
                                        {
                                            categories.map((category,index)=>(
                                                <option key={index} value={category}>#{category}</option>
                                            ))
                                        }
                                    </select><br />
                                    <input type="text" id="cap" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} />
                                    <input type="file"  id="cap1" onChange={e=>handleChange(e)} required/><br />
                                    <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
                                </>
                            : null
                            : null
                        }
                </div>
            }

            <div className="home__posts">
                <h3>Images</h3>
                {/* { 
                    categories.length ?
                        <>
                            Select the category Name<br />
                            <select className="selectCategory" onChange={showImagesHandler}>
                                <option value="All">All</option>
                                {
                                    categories.map((category,index)=>(
                                        <option key={index} value={category}>#{category}</option>
                                    ))
                                }
                            </select><br />
                        </>
                    :
                    null
                } */}
                {
                        posts ?
                            posts.map((post,index) => (
                                <Post key={index} posts={posts} setPosts={setPosts} setSelectedImg={setSelectedImg} username={post.username} caption={post.caption} category={post.category} imageUrl={`assets/${post.imageUrl}`}/>
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