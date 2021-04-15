import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import '../styles/base.scss'

function Banner(props) {
    let data = props.data;
    console.log(data);
    let list = [];
    data.list.forEach(item=>{
        let url = item.cover_web || item.banner_cover;
        console.log(data.block_title + ' ' + url)
        list.push(
            <div className="link-box" key={item.id}>
                <img src={url} />
            </div>
        )
    })

    let showIndicators = data.block_name === 'explore_banner';
    return (
        <div className="explore-banner">
            <div className="title">{data.block_title}</div>
            <div className="banner-box">
                <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={showIndicators}>
                    { list }
                </Carousel>
            </div>
        </div>
    )
}

export default Banner;