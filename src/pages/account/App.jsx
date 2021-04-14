import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Login from '@/views/account/Login'
import '@/assets/css/common.css';
// import 'at.alicdn.com/t/font_2462358_paqs5o9ov2.css'
// import './App.css'

function App() {  
//   const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Header /> */}
      
      <Router>
      <div>
        <Switch>
          <Route path="/">
            <Login />
          </Route> 
          <Route path="/login">
            <Login />
          </Route>        
        </Switch>
      </div>
    </Router>

    </div>
  )
}

function Users() {
  return <h2>Users</h2>;
}

export default App
