import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
const history = createHistory();

import Home from '../views/home/Home.jsx'
import Horde from '../views/Horde.jsx'
import University from '../views/University.jsx'
import Enterprise from '../views/Enterprise.jsx'
import Mall from '../views/Mall.jsx'
import Exchange from '../views/Exchange.jsx'
import Download from '../views/Download.jsx'
import About from '../views/About.jsx'
import Intro from '../views/home/Intro.jsx'
import Login from '../views/account/Login.jsx'