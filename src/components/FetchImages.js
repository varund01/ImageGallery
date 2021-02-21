import React from 'react';
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';
import Home from './Home';

function FetchImages({posts, URL}) {
    const getImages = async() => {
        const formData = new FormData();
        formData.append("email",localStorage.getItem("email"));
        const allImages = await axios({
            url:"http://localhost:8070/allImages",
            method:"post",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
            },
            data: formData,
        });
        console.log("fetching",posts);
        localStorage.setItem("allImages",JSON.stringify(allImages.data));
        // history.push("/home");
    }
    getImages()
    return (
        <div>
            <Redirect to={URL} />
        </div>
    )
}

export default FetchImages
