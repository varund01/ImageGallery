import { Button } from '@material-ui/core'
import React, {useState} from 'react';
import { useHistory , useLocation} from 'react-router-dom';
import axios,{post} from 'axios';
import '../css/ImageUpload.css'

function ImageUpload() {
    const history = useHistory();
    const location = useLocation();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    } 


    const fileUpload = (file) => {
        const url = 'http://localhost:8080/upload';
        const formData = new FormData();
        formData.append('file',file)
        formData.append('email',location.state.email)
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
        fileUpload(image).then((response)=>{
            console.log(response);
            const formData = new FormData();
            formData.append("email",location.state.email);
            const allImages = axios({
                url:"http://localhost:8080/allImages",
                method:"post",
                headers: {
                    "Content-type":"application/x-www-form-urlencoded",
                },
                data: formData,
            });
            console.log(allImages);
            
        })
        cancelCourse()
    }

    const cancelCourse = () => { 
        setCaption("");
        setImage(null);
    }

    return (
        <div className="imageupload">
            <input type="text" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} />
            <input type="file" onChange={e=>handleChange(e)} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
