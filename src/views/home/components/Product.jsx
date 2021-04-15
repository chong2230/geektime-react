import React from 'react'
import '../styles/base.scss'
import './Product.scss'

function Product(props) {

    // console.log(props.productInfos, props.productArticles)

    function getSaleLabel(price) {
        let type = '';
        switch(price.sale_type) {
            case 1:
                break;
            case 2:
                type = '限时';
                break;    
            case 3:
                type = '拼团';
                break; 
            default:
                break;

        }
        return type + ' ¥' + price.sale/100;
    }

    let list = [];
    props.productInfos.forEach(item=>{
        let articles = [];
        for (let i in props.productArticles[item.id]) {
            let sitem = props.productArticles[item.id][i];
            articles.push(
                <li key={sitem.id}>
                    <a className={sitem.could_preview ? "free" : ""} href="#!" onClick={()=>{goArticle(sitem)}}>
                        { sitem.could_preview ? <span>免费</span> : null }
                        {sitem.title}
                    </a>
                </li>
            )
        }
        list.push(
            <div className="product row" key={item.id} onClick={()=>{goColumn(item)}}>
                <div className="p-left">
                    <a>
                        <img src={item.cover.rectangle} />
                    </a>
                </div>
                <div className="p-right">
                    <div className="p-info">
                        <div className="title-sec row">
                            <h2 className="p-title">{item.title}</h2>
                            <p className="unit-sub">{item.unit} <em></em>| {item.extra.sub.count} </p>
                        </div>
                        <div className="intro">{item.author.name + ' ' + item.author.intro}</div>
                    </div>
                    <div className="p-article">
                        <ul className="p-ul">
                            { articles }
                        </ul>
                    </div>
                    <div className="p-price row">
                        <p className="price-sec">
                            <span>{getSaleLabel(item.price)}</span>
                            <s>原价 ¥{item.price.market/100}</s>
                        </p>
                        <div className="handle-box">
                            <button className="handle-btn">立即订阅</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="list">
            { list }
        </div>
    )
}

function goArticle(sitem) {

}

export default Product;