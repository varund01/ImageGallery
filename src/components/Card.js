import React from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './../css/Post.css'
import FetchImages from './FetchImages';
import DeleteIcon from '@material-ui/icons/Delete';


function Card({caption, setSelectedImg ,imageUrl}) {

    
    return (
        
        <div className = "post" > 
            <img className="post__image" src={imageUrl} onClick={()=>setSelectedImg(imageUrl)} alt="image is not available"/>
            <div className="post__text__button">
                <div>
                    <h4 className="post__text">{caption}</h4>
                </div>
            </div>

        </div>
    )
}

export default Card
