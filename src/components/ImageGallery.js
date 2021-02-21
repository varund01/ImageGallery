import React,{useState} from 'react'

import Header from './Header';
import PaginationImages from './PaginationImages';
import CustomModal from './CustomModal';

import "../css/ImageUpload.css"

function ImageGallery() {

    //const [images,setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null); 

    return (
        <div>
            <Header />
            <div className="imageupload">
                <PaginationImages />
                {selectedImg && <CustomModal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
    )
}

export default ImageGallery
