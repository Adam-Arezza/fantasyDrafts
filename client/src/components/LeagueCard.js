import React from 'react'
import styled from 'styled-components'

const CardStyled = styled.div`
background: lightgrey;
border-radius: 10px;
border: solid 1px black;
margin: 15px;
color: black;
padding: 15px;
`
const InnerCard = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
`
const Details = styled.div`
display: flex;
flex-direction: column;
`

const Detail = styled.div`
font-size: 0.80em;
margin: 5px;
`

const TeamList = styled.ul`
margin: 0px;
list-style: none;
background: rgb(150,150,150);
`

class LeagueCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTeam: ""
        }
    }

    render() {
        let detailKeys = Object.keys(this.props.details)
        detailKeys = detailKeys.filter(d => {
            return d !== "Members" && d !== "Teams" && d !== "Creator" && d !== "_id" && d !== "__v" && d !== "Name"
        })
        let details = detailKeys.map((detail, index) => <Detail key={index}><span>{detail}: {this.props.details[detail]}</span></Detail>)
        let teams
        try {
            teams = this.props.details.teams.map((team, index) => <li key={index}>{team}</li>)
        }
        catch (err) {
            console.log(err)
        }
        return (
            <CardStyled>
                <h3>{this.props.details.Name.toUpperCase()}</h3>
                <InnerCard>
                    <Details>
                        {details}
                    </Details>
                    <Details>
                        Teams:
                        <TeamList>
                            {teams}
                        </TeamList>
                    </Details>
                </InnerCard>
            </CardStyled>
        )
    }
}

export default LeagueCard;