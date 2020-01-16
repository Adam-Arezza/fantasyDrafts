import React from 'react';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
    this.checkLogin = this.checkLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  checkLogin(loginStatus) {
    if (!loginStatus) {
      return
    }
    this.setState({ loggedIn: loginStatus })
  }

  logout() {
    this.setState({ loggedIn: false })
    localStorage.clear()
  }

  render() {
    //need to add navigation for logged in user or user dashboard
    //need better solution for active pages
    return (
      <div>
        <Router>
            <Route path="/login">
              {this.state.loggedIn === true ? <Redirect to="/dashboard"></Redirect> : <Login loggedIn={this.checkLogin}></Login>}
            </Route>
            <Route path="/register">
              {this.state.loggedIn === true ? <Redirect to="/dashboard"></Redirect> : <Register loggedIn={this.checkLogin}></Register>}
            </Route>
            <Route exact path="/">
              {this.state.loggedIn === true ? <Redirect to="/dashboard"></Redirect> : <Home></Home>}
            </Route>
            <Route path="/dashboard">
              {this.state.loggedIn === false ? <Redirect to="/"></Redirect> : <Dashboard logout={this.logout}></Dashboard>}
            </Route>
        </Router>
      </div>
    )
  }
}

export default App;
