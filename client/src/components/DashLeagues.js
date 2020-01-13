import React from 'react'
import axios from 'axios'
import LeagueCard from './LeagueCard'
import styled from 'styled-components'

const LeagueCardsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

class DashLeagues extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            leagues: [],
            loading: false
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('nhlDraftToken')
        axios.defaults.headers.Authorization = token

        this.setState({loading: true}, () => {
            axios.get('https://dbf851a3.ngrok.io/leagues')
            .then(res => {
                let leagues = res.data
                console.log(leagues)
                this.setState({ leagues: [...this.state.leagues, ...leagues], loading: false })
            })
            .catch(err => console.log(err))
        }) 
    }

    render(){
        let leagues = this.state.leagues.map((league, index) => <LeagueCard key={index} details={league}></LeagueCard>)

        if(this.state.leagues.length === 0 && this.state.loading === false) {
            return <h1>No leagues</h1>
        }

        if(this.state.loading === true) {
            return <h1>Loading leagues...</h1>
        }

        return (
            <LeagueCardsContainer>
                {leagues}
            </LeagueCardsContainer>
        )
    }
}

export default DashLeagues;