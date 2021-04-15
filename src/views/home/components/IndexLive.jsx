import React from 'react'
import { formatLiveTime } from '@/common/util';
import './IndexLive.scss'

function IndexLive(props) {
    const data = props.data;

    function getLiveTime(time) {
        return formatLiveTime(time);
    }

    return (
        <div className="explore-banner">
            <div className="title">极客Live</div>
            <div className="banner-box live-box">
                <a className="link-box" target="_blank">
                    <img src={data.web_cover} />
                </a>
                <div className="stitle">{data.title}</div>
                <div className="time">时间：{getLiveTime(data.live_time)}</div>                            
            </div>
        </div>
    );
}

export default IndexLive;