import React,{useState} from 'react'
import './../css/Post.css'


function Post({setSelectedImg ,username, caption ,imageUrl}) {
    
    

    return (
        
        <div className = "post" > 

            <img className="post__image" src={imageUrl} onClick={()=>setSelectedImg(imageUrl)} alt="image is not available"/>
            <div class="post__text__button">
                <h4 className="post__text">{caption}</h4>

                <div class="post__delete">
                    <button onClick={}>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default Post
