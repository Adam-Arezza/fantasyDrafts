import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DashNav from './DashNav'
import DashLeagues from './DashLeagues'
import DashTeams from './DashTeams'
import DailyContainer from './DailyContainer'

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

        if(!token){
            this.setState({user: ""})
        }

        axios.get('https://e31e6cc6.ngrok.io/user')
        .then(res => {
            let user = res.data.user
            this.setState({user: user})
        })
        .catch(err => console.log(err))

        axios.get('https://e31e6cc6.ngrok.io/leagues')
        .then(res => {
            let leagues = res.data
            this.setState({leagues: leagues})
        })
        .catch(err => console.log(err))

        axios.get('https://e31e6cc6.ngrok.io/teams')
        .then(res => {
            let teams = res.data
            this.setState({teams: teams})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <DashStyled>
                <DashNav user={this.state.user} logout={this.props.logout}></DashNav>
                <MainContainer>
                <DailyContainer></DailyContainer>
                <DashLeagues leagues={this.state.leagues}></DashLeagues>
                <DashTeams teams={this.state.teams}></DashTeams>
                </MainContainer>
            </DashStyled>
        )
    }
}
export default Dashboard;
