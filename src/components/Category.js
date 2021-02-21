import React, { useState } from 'react';
import axios from 'axios';
import FetchImages from './FetchImages';

import Header from './Header';
import Card from './Card';
import CustomModal from './CustomModal';
import CustomAlert from './CustomAlert';

import "../css/Category.css";
import { Button } from '@material-ui/core';

function Category() {

    const [modal, setModal] = useState({
        modalIsOpen: false,
        modalTitle: "",
        modalBody: "",
    });
    const [createCategoryName,setCreateCategoryName] = useState("");
    const [deleteCategoryName,setDeleteCategoryName] = useState("");
    const [showAllCategories,setShowAllCategories] = useState(true);
    const [createCategory,setCreateCategory] = useState(true);
    const [deleteCategory,setDeleteCategory] = useState(true);
    const [categories,setCategories] = useState(JSON.parse(localStorage.getItem("categories")));
    const [showImages,setShowImages] = useState("");
    const [imagesByCategory, setImagesByCategory] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [visitedNum,setVisitedNum] = useState(1);

    console.log(categories);
    localStorage.setItem("categories",JSON.stringify(categories));
    FetchImages(localStorage.getItem("allImages") ,"/category");

    const createCategoryHandler = () => {
        const createFD = new FormData();
        createFD.append("email",localStorage.getItem("email"));
        createFD.append("category",createCategoryName);
        const response = axios({
            url: "http://localhost/categories/create.php",
            method: "post",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
            },
            data: createFD,
        });
        console.log(response);
        categories ?
            setCategories([
                ...categories,
                createCategoryName
            ])
            :
            setCategories([
                createCategoryName
            ])
        document.getElementById("createinput").value="";
        setModal({
            modalIsOpen: true,
            modalTitle: "Category is created successfully",
            modalBody: "You can now keep the images in this category...",
          });
        setCreateCategoryName("");
        
    }

    const deleteCategoryHandler = () => {
        const deleteFD = new FormData();
        deleteFD.append("email",localStorage.getItem("email"));
        deleteFD.append("category",deleteCategoryName);
        const response = axios({
            url: "http://localhost/categories/delete.php",
            method: "post",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
            },
            data: deleteFD,
        });
        console.log(response);
        const array = [...categories];
        var index = array.indexOf(deleteCategoryName);
        if(index !== -1) {
            array.splice(index,1);
            setCategories(array);
        }
        setDeleteCategoryName("");
        setModal({
            modalIsOpen: true,
            modalTitle: "Category is deleted successfully",
            modalBody: "All the images under this category were deleted successfully",
          });
        //window.location.reload();
    }

    const getImagesHandler = (e) => {
        const ImagesData = new FormData();
        ImagesData.append("email",localStorage.getItem("email"));
        ImagesData.append("category",e.target.id);
        console.log(e.target.id);
        axios({
            url: "http://localhost:8091/getCategoryImages",
            method: "post",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
            },
            data: ImagesData,
        }).then((res)=>{
            console.log(res.data);
            setImagesByCategory(res.data);
        })
        
    }


    return (
        <div className="category">
            <Header />
            <div className="setVisited">
                <p className="category__subdiv__Header" onClick={()=>setVisitedNum(1)}>Display all Categories</p>
                <p className="category__subdiv__Header" onClick={()=>setVisitedNum(2)}>Create Categories</p>
                <p className="category__subdiv__Header" onClick={()=>setVisitedNum(3)}>Delete Categories</p>
            </div>
            
            {
                visitedNum === 1 ?
            <div className="category__subdiv">
                <p className="category__subdiv__text" >Display all Categories</p>
                {
                    showAllCategories ?
                    <>
                        <div className="category__display__list">
                            {
                                categories.length ?
                                    categories.map((category,index)=>(
                                        <div key={index} className="category__display__list__item"><p id={category}  onClick={getImagesHandler} className="category__display__list__text">#{category}</p></div>
                                    ))
                                :
                                    <p>No categories right now! Click Create categories for adding</p>
                            }
                        </div>
                        <div className="category__images__list">
                            {
                                imagesByCategory ?
                                    imagesByCategory.length ?
                                    <>
                                        {
                                            imagesByCategory.map((Image,index)=>(
                                                <Card key={index} caption={Image.caption} setSelectedImg={setSelectedImg} imageUrl={`assets/${Image.imageUrl}`} />
                                            ))
                                        }
                                    </>
                                    : null
                                : <p>There are no Images in this Category</p>
                            }
                            {selectedImg && <CustomModal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
                        </div>
                    </>
                    :
                        null
                }
            </div>
            :null
            }
            {
                visitedNum === 2 ?
            <div className="category__subdiv">
                <p className="category__subdiv__text">Create a new Category</p>
                {
                    createCategory ?
                    <div className="category__create">
                        Enter the category Name<br />
                        <input type="text" id="createinput" name="createCategoryName" value={createCategoryName} onChange={(e)=>setCreateCategoryName(e.target.value)}/><br/>
                        <Button variant="contained" id="category__create__button" onClick={createCategoryHandler}>Create</Button>
                    </div>
                    : null
                }
            </div>
            :
            null
            }
            {
                visitedNum === 3 ?
            <div className="category__subdiv">
                <p className="category__subdiv__text" >Delete a Category</p>
                {
                    deleteCategory ?
                    <div className="category__create">
                    { 
                        categories.length ?
                            <>
                                Select the category Name<br />
                                <select className="selectCategory" onChange={(e)=>setDeleteCategoryName(e.target.value)}>
                                    <option>None</option>
                                    {
                                        categories.map((category,index)=>(
                                            <option key={index} value={category}>#{category}</option>
                                        ))
                                    }
                                </select><br /><br />
                                <Button variant="contained" id="category__create__button" onClick={deleteCategoryHandler}>Delete</Button>
                            </>
                        :
                        <p>No categories right now!</p>
                    }
                    </div>
                    : null
                }
            </div>
            :
            null
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

export default Category
