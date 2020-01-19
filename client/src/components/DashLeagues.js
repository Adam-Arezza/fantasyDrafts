import React from 'react'
import axios from 'axios'
import LeagueCard from './LeagueCard'
import Team from './Team'
import styled from 'styled-components'

const LeagueCardsContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`

const LeaguesHeader = styled.h1`
border-bottom: solid black 2px;
padding: 15px;
margin: 10px;
`

class DashLeagues extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leagues: [],
            loading: false,
            selectedTeam:""
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('nhlDraftToken')
        axios.defaults.headers.Authorization = token

        this.setState({ loading: true }, () => {
            axios.get('https://dbf851a3.ngrok.io/leagues')
                .then(res => {
                    let leagues = res.data
                    // console.log(leagues)
                    this.setState({ leagues: [...this.state.leagues, ...leagues], loading: false })
                })
                .catch(err => console.log(err))
        })
    }

    selectTeam = (team) => {
        this.setState({selectedTeam: team})
    }

    render() {
        let leagues = this.state.leagues.map((league, index) => <LeagueCard key={index} details={league} selectTeam={this.selectTeam} user={this.props.user}></LeagueCard>)
        if (this.state.leagues.length === 0 && this.state.loading === false) {
            return <h1>No leagues</h1>
        }

        if (this.state.loading === true) {
            return <h1>Loading leagues...</h1>
        }

        return (
            <div>
                <LeaguesHeader>My Leagues</LeaguesHeader>
                <LeagueCardsContainer>
                    {this.state.selectedTeam ? <Team team={this.state.selectedTeam} selectTeam={this.selectTeam}></Team> : leagues}
                </LeagueCardsContainer>
            </div>

        )
    }
}

export default DashLeagues;