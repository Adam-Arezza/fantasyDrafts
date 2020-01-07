import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DashNav from './DashNav'
import DashLeagues from './DashLeagues'
import DailyContainer from './DailyContainer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Standings from './Standings'
import Account from './Account'

const DashStyled = styled.div`
min-height: 100vh;
display:flex;
flex-direction: row;
`

const MainContainer = styled.div`
display: flex;
flex-direction: column;
width: 80%;
`

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            leagues: [],
            teams: [],
            players: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('nhlDraftToken')

        axios.defaults.headers.Authorization = token

        if (!token) {
            this.setState({ user: "" })
        }

        axios.get('https://e31e6cc6.ngrok.io/user')
            .then(res => {
                let user = res.data.user
                this.setState({ user: user })
            })
            .catch(err => console.log(err))

        axios.get('https://e31e6cc6.ngrok.io/leagues')
            .then(res => {
                let leagues = res.data
                this.setState({ leagues: leagues })
            })
            .catch(err => console.log(err))

        axios.get('https://e31e6cc6.ngrok.io/teams')
            .then(res => {
                let teams = res.data
                this.setState({ teams: teams })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <DashStyled>
                <Router>
                    <DashNav user={this.state.user} logout={this.props.logout}></DashNav>
                    <MainContainer>
                        <Switch>
                            <Route path='/dashboard' exact><DailyContainer></DailyContainer></Route>
                            <Route path='/dashboard/leagues'><DashLeagues leagues={this.state.leagues}></DashLeagues></Route>
                            <Route path='/dashboard/account'><Account></Account></Route>
                            <Route path='/dashboard/standings'><Standings></Standings></Route>
                            <Route path='/dashboard/new-league'></Route>
                        </Switch>
                    </MainContainer>
                </Router>
            </DashStyled>
        )
    }
}
export default Dashboard;
