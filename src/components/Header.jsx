import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Mock from '../mock';
import './Header.scss';

function Header(props) {
    let menus = Mock['/static/time/menu/data.json'];
    let links = menus.map((menu, index) => {
        return <a className={index == 0 ? 'menu-item on' : 'menu-item'} href={menu.path} key={index+1}>{menu.name}</a>
        // return <div className={index == 0 ? 'menu-item on' : 'menu-item'} key={index+1}>
        //     <Link to={menu.path || '/about'}>{ menu.name }</Link>
        // </div>
    })
    return (
      <div className="common-header-container">
          <div className="common-header white fixed">
            <div className="common-header-wrapper">
                {/* <Router>
                    <div>
                    <Link className="common-logo" to="/"></Link>
                    </div>
                </Router> */}
                <a className="common-logo" href="/"></a>
                <div className="info">
                    <div className="menu">  
                    <Router>
                        { links }                      
                    </Router>                      
                    
                    </div>
                </div>
            </div>
            <div className="fixed-rect"></div>
        </div>
      </div>  
    );
}

export default Header;