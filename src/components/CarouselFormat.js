import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Post from './Post';
import "../css/carousel.css";


function CarouselFormat() {
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("allImages")));
    const [selectedImg, setSelectedImg] = useState(null); 
    console.log(posts);
    const onChange = () => {

    }
    const onClickItem = () => {

    }
    const onClickThumb = () => {

    }
    return (
        <div className="carousel__block"> 
            <Carousel class="carousel__style" showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
                {
                posts ?
                    posts.map((post,index) => (
                        <div className="carousel__slider">
                        <img class="carousel__img" src={`assets/${post.imageUrl}`} />
                        </div>
                    )).reverse()
                : 
                    <p>There are no posts right now</p>
                }
            </Carousel>
        </div>
    )
}

export default CarouselFormat
