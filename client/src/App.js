import React from 'react';
import Home from './components/Home'
import HomeHeader from './components/HomeHeader'
import Register from './components/Register'
import Login from './components/Login'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activePage: "home"
    }
    this.changePage = this.changePage.bind(this)
  }

  changePage(page){
    this.setState({activePage: page})
  }

  render() {
    //need to add navigation for logged in user or user dashboard
    //need better solution for active pages
    return(
      <div>
      <Router>
      {this.state.activePage === "home" ? <HomeHeader changePage={this.changePage}></HomeHeader> : null}
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route exact path="/" component={Home}></Route>
      </Router>
    </div>
    )
  }
}

export default App;
