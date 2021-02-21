import React, { useState } from 'react';
import {Button} from '@material-ui/core';
import axios from 'axios';

import Post from './Post';
import CustomModal from './CustomModal';


function PaginationImages() {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalNumberOfPages,setTotalNumberOfPages] = useState(0)
    const [imagesByPage,setImagesByPage] = useState()
    const [flag,setFlag] = useState(1)
    const [selectedImg, setSelectedImg] = useState(null); 

    
    const previousHandler = () => {
        setCurrentPage(currentPage-1);
        console.log("page is ",currentPage);
        getImagesByPage(currentPage-1);
    }

    const nextHandler = () => {
        setCurrentPage(currentPage+1);
        console.log("page is ",currentPage);
        getImagesByPage(currentPage+1);
    }
    console.log("page is ",currentPage);
    const callFunc = () => {
        getImagesByPage()
    }

    const getTotalNumberOfPages = () => {
        const fd = new FormData();
        fd.append("email",localStorage.getItem("email"));
        axios({
            url : "http://localhost:7800/getSizeOfVisible",
            method : "post",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
                "Token":localStorage.getItem("Token"),
            },
            data: fd,
        }).then((res)=>{
            console.log(res.data,"ddddddddd");
            console.log(Number(res.data));
            setTotalNumberOfPages(Math.ceil(Number(res.data)/5));
            console.log(totalNumberOfPages,"d");
        })
    }
    getTotalNumberOfPages();

    const getImagesByPage = (curr) => {
        console.log("curr is",curr)
        const fd = new FormData();
        fd.append("email",localStorage.getItem("email"));
        fd.append("limit","5");
        fd.append("offset",''+((curr-1)*5));
        axios({
            url : "http://localhost:7800/getAllVisibleImages",
            method : "post",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
                "Token":localStorage.getItem("Token"),
            },
            data: fd,
        }).then((res)=>{
            console.log(res.data);
            setImagesByPage(res.data);
        })
    }
    
    if(flag === 1){
        getImagesByPage();
        setFlag(2);
    }

    return (
        <div>
            <div>
                {
                    totalNumberOfPages != 0 ?
                    <>Page {currentPage} of {totalNumberOfPages}</>
                    :null
                }
                {
                    currentPage != 1 ?
                    <Button onClick={previousHandler}>Previous</Button>
                    :null
                }
                {
                    currentPage < totalNumberOfPages ?
                    <Button onClick={nextHandler}>Next</Button>
                    :null
                }
            </div>
            <div>
                {
                    imagesByPage ?
                    imagesByPage.map((post,index) => (
                            <Post key={index} posts={imagesByPage} setPosts={setImagesByPage} setSelectedImg={setSelectedImg} username={post.username} caption={post.caption} category={post.category} imageUrl={`assets/${post.imageUrl}`}/>
                        ))

                    : 
                        <p>There are no posts right now</p>
                }
            </div>
            {selectedImg && <CustomModal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
        </div>
    )
}

export default PaginationImages
