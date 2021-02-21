import React from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './../css/Post.css'
import FetchImages from './FetchImages';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button,Avatar} from "@material-ui/core";


function Post({posts, setPosts, setSelectedImg ,username, caption, category, imageUrl}) {
    const history = new useHistory();
    const handleDelete = async() => {
        var fd=new FormData();
        fd.append("email",username);
        fd.append("imageUrl",imageUrl);
        const repsonse = await axios({
            url: "http://localhost/deleteImage.php",
            method:"post",
            data: fd,
        });
        FetchImages(posts,"/home");
        window.location.reload();
    }

    return (
        
        <div className = "post" > 
            {console.log(posts[0])}
            {
                username ?
                <div className="post__text__username">
                    <Avatar
                        className="home__avatar"
                        alt={username}
                        src="/static/images/avatar/1.jpg"    
                    />
                    <p className="username">{username}</p>
                </div>
                :null
            }
            <img className="post__image" src={imageUrl} onClick={()=>setSelectedImg(imageUrl)} alt="image is not available"/>
            <div className="post__text__button">
                <div>
                <h4 className="post__text">{caption}</h4>
                {
                    category ?
                        <p className="post__category">#{category}</p>
                    :
                    null
                }
                </div>
                <div className="post__delete">
                    <DeleteIcon id="post__delete__button" onClick={handleDelete} />
                </div>
            </div>

        </div>
    )
}

export default Post
