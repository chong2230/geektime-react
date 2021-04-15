import React, { useState, useEffect } from 'react'
import api from '@/common/api'
import Mock from '@/mock/index'
import Header from '../../components/Header'
import Product from './components/Product'
import Banner from './components/Banner'
import IndexLive from './components/IndexLive'
import AttentionUs from './components/AttentionUs'
import { getSkuIds, getSkusByOrder } from './skus'
import './styles/base.scss'
import './styles/Home.scss'

function Home() {
    const [lecturePath, setLecturePath] = useState({});
    const [lectureTag, setLectureTag] = useState({});
    const [exploreBanner, setExploreBanner] = useState({});
    const [lectureAd, setLectureAd] = useState({});
    const [hotLive, setHotLive] = useState({})
    const [indexLive, setIndexLive] = useState({})
    const [mall, setMall] = useState({})
    const [adBottom, setAdBottom] = useState({})
    const [lecture, setLecture] = useState({})
    const [productInfos, setProductInfos] = useState([])
    const [productArticles, setProductArticles] = useState({})
    const [skusData, setSkusData] = useState({})
    const [order, setOrder] = useState(1)
    const [asc, setAsc] = useState(1)
    const [ad, setAd] = useState({})
    const [labels, setLabels] = useState([])
    const [isHover, setIsHover] = useState(false)
    const [curType, setCurType] = useState(0)
    const [curDirection, setCurDirection] = useState(0)
    const [curCategory, setCurCategory] = useState(0)
    const [types, setTypes] = useState(['专栏', '视频课程', '微课', '每日一练', '大厂案例'])
    
    const conditions = ['综合', '最新上架', '订阅数', '价格', '活动'];
    // const types = ['专栏', '视频课程', '微课', '每日一练', '大厂案例']
    let skusObj = {};
    let skus = [];
    let page = 1, pageSize = 10;

    useEffect(() => {
        loadData();
        return () => {
            
        }
    }, [])

    function loadData() {
        getExploreAll();
        getLabels();       
        getLabelSkus();
        getIndexLive(); 
        getPcInterstitial();
    }

    async function getExploreAll() {
        let res = await api.getExploreAll({page: "lecturev2_web"});
        if (res.data && res.data.length == 0) {
            res = Mock['/serv/v2/explore/all'];
        }
        if (res.code == 0) {
            let explores = res.data;
            for (let item of explores) {
                if (item.block_name == 'lecture_path') {
                    item.list = item.list.slice(0, 4);
                    setLecturePath(item);
                } else if(item.block_name == 'cm_lecture_tag') setLectureTag(item);
                else if(item.block_name == 'explore_banner') setExploreBanner(item);
                else if(item.block_name == 'cm_web_lecture_ad001') setLectureAd(item);
                else if(item.block_name == 'hot_live') setHotLive(item);
                else if(item.block_name == 'cm_web_lecture_ad002') setMall(item);
                else if(item.block_name == 'ad_bottom') {
                    setAdBottom(item.list[0]);
                }
            }

        }
    }

    async function getLabels() {
        const res = await api.getLabels({type: curType});
        if (res.code == 0) {
            setTypes(res.data.nav);
            setLabels(res.data.labels);
        }
    }

    async function getLabelSkus(params) {
        const res = await api.getLabelSkus(params || {label_id: 0, type: curType});
        if (res.code == 0) {
            console.log('getLabelSkus', res.data);
            const data = res.data;
            setSkusData(res.data);
            if (!skusObj[order]) skusObj[order] = getSkusByOrder(data, order, asc);
            skus = skusObj[order];                
            getProductInfos();
        }
    }

    async function getIndexLive() {
        const res = await api.getIndexLive({});
        if (res.code == 0) {
            setIndexLive(res.data)
        }
    }

    async function getProductInfos() {
        let ids = getSkuIds(skus, page, pageSize);
        const params = {
            ids: ids,//[100015201, 100052401, 100073301, 100073201, 100003101, 100002201, 100001901, 100007001, 100003901, 100006201],
            with_first_articles: true

        }
        const res = await api.getProductInfos(params);
        if (res.code == 0) {
            let data = res.data;
            let articles = {};
            for (let article of res.data.articles) {
                articles[article.pid] = articles[article.pid] || [];
                articles[article.pid].push(article);
            }
            setProductInfos(productInfos.concat(data.infos));
            setProductArticles(Object.assign({}, productArticles, articles));
        }
    }

    async function getPcInterstitial() {
        const res = await api.getPcInterstitial({v: 26939623});
        const ads = res.default || [];
        let time = parseInt(new Date().getTime()/1000);
        let ad = {};
        for (let item of ads) {
            if (time >= item.start_time_timestamp && time <= item.end_time_timestamp) {
                ad = item;
                break;
            }
        }
        // 根据v获取json文件，v还不知道如何获取，取v=26939623的最后一条数据
        if (JSON.stringify(ad) == '{}') ad = ads[ads.length - 1] || {};
        setAd(ad);
    }

    function enter() {
        setIsHover(true);
    }
    
    function leave() {
        setIsHover(false)
    }
    
    function chooseType(val) {
        setCurType(val)
        getLabels()
        skusObj[order] = null;
        getLabelSkus()
    }
    
    function chooseDirection(val) {
        setCurDirection(val)
        skusObj[order] = null
        getLabelSkus({label_id: curDirection, type: curType})
    }
    
    function chooseCategory(val) {
        setCurCategory(val)
        skusObj[order] = null
        getLabelSkus({label_id: curCategory, type: curDirection})
    }

    function goMyCourse() {
        console.log('go my course')
        window.location.href = '/account/'
    }

    let pathList = [];
    if (lecturePath.list) {
        lecturePath.list.forEach(item=>{
            pathList.push(
                <li className="row" key={item.id}>
                    <div className="lecture-info">
                        <div className="name">{item.name}</div>
                        <div className="desc">{item.product_count}门课程</div>
                    </div>
                    <img className="lecture-img" src={item.icon} />
                </li>
            )
        })
    }

    let typeLabels = [];
    types.forEach(item=>{
        typeLabels.push(
            <a className={curType == item.id ? "label choose" : "label"} v-for="item in types" key={item.id}
                href="#!" onClick={()=>{chooseType(item.id)}}>{item.name}</a>  
        )
    })
    
    let directionLabels = [];
    labels.filter((val)=> val.pid==0).forEach(item=>{
        directionLabels.push(
            <a className={curDirection == item.lid ? "label choose" : "label"} key={item.lid}
                href="#!" onClick={()=>{chooseDirection(item.lid)}}>{item.name}</a>
        )
    })

    let categoryLabels = [];
    labels.filter((val)=>{return val.pid!=0}).forEach(item=>{
        categoryLabels.push(
            <a className={curCategory == item.lid ? 'label choose' : 'label'} key={item.lid} 
                href="#!" onClick={()=>{chooseCategory(item.lid)}}>{item.name}</a>
        )
    })

    let conditionLabels = [];
    conditions.forEach((item, index) => {
        conditionLabels.push(
            <a className={index == order - 1 ? "row active" : "row"} href="#!" 
                key={index} onClick={()=>{changeSku(index)}}>
                {item}
                {
                    index == 3 ?
                    <span className="column">
                        <i className={order==4 && asc==1 ? "up active" : "up"}></i>
                        <i className={order==4 && asc==0 ? "down active" : "down"}></i>
                    </span>
                    : null
                }
                
            </a>
        )
    })

    return (
        <div className="page">
            <Header />
            <div className="row main">
            <div className="left column">
                <div className="explore">
                    <div className="top row">
                        <div className="title">{lecturePath.block_title}</div>
                        <div className="view-all">查看全部</div>
                    </div>
                    <ul className="row">
                        { pathList }
                    </ul>
                </div>
                {
                    labels.length > 0 ?
                    <div className={isHover ? "types-sec column hover" : "types-sec column"} onMouseOver={(event)=>{enter(event)}} onMouseOut={(event)=>{leave(event)}}>
                        <div className="type-item">
                            <span>形式：</span>
                            <div className="type-labels row">
                                <a className={"all label " + (curType == 0 ? "choose" : "")} href="#!" onClick={()=>{chooseType(0)}}>全部</a>
                                { typeLabels }                          
                            </div>
                        </div>
                        <div className="type-item row">
                            <span>方向：</span>
                            <div className="type-labels row">
                                <a className={curDirection == 0 ? "all label choose" : "all label"} href="#!" onClick={()=>{chooseDirection(0)}}>全部</a>
                                { directionLabels }
                            </div>
                        </div>
                        <div className="type-item row">
                            <span>分类：</span>
                            <div className="type-labels row">
                                <a className={curCategory == 0 ? "all label choose": "all label"} href="#!" onClick={()=>{chooseCategory(0)}}>全部</a>
                                { categoryLabels }
                            </div>
                        </div>
                    </div>
                    : null
                }
                
                <div className="products">
                    <div className="products-info row">
                        <div className="conditions row">
                            { conditionLabels }
                        </div>
                        {
                            skusData.page ?
                            <span className="count" v-if="skusData.page">{skusData.page.count}个课程</span>
                            : null
                        }
                        
                    </div>
                    <Product productInfos={productInfos} productArticles={productArticles}></Product>
                </div>
            </div>
            <div className="right">
                <div className="content">
                    <div className="my-course">
                        {/* <button className="course-btn btn" onClick={()=>{goMyCourse()}}>我的课程</button> */}
                        <button className="course-btn btn" onClick={goMyCourse}>我的课程</button>
                    </div>
                    { exploreBanner.block_name ? <Banner data={exploreBanner}></Banner> : null }
                    { lectureAd.block_name ? <Banner data={lectureAd}></Banner> : null }
                    { indexLive.title ? <IndexLive data={indexLive}></IndexLive> : null }
                    { mall.block_name ? <Banner data={mall}></Banner> : null }
                    <AttentionUs></AttentionUs>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home;