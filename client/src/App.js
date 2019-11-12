import React from 'react';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  render() {
    //need to add navigation for logged in user or user dashboard
    //need better solution for active pages
    return(
      <div>
      <Router>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route exact path="/">
        {this.state.loggedIn === true ? <Redirect to="/dashboard"></Redirect> : <Home></Home>}
      </Route>
      </Router>
    </div>
    )
  }
}

export default App;
