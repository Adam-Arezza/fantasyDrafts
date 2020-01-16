import React from 'react'
import styled from 'styled-components'

const TeamContainer = styled.div`
display: flex;
background: lightblue;
color: black;
`

const PlayerTable = styled.div`
display: flex;
flex-direction: column;
`

const PlayerRow = styled.div`
display: flex;
flex-direction: row;
`

const BackBtn = styled.button`
:hover {
    cursor: pointer;
    background: darkgrey;
}
margin: 10px;
padding: 15px;
color: white;
font-size: 1.5em;
border: none;
background: black;
border-radius: 30px;
`

function Team(props) {

    let players = props.team.Players.map((p, index) => <PlayerRow key={index}>{p}</PlayerRow>)

    return (
        <TeamContainer>
            <BackBtn onClick={this.selectTeam("")}>Back to League</BackBtn>
            <h2>{props.team.Name}</h2>
            <PlayerTable>
                {players}
            </PlayerTable>
        </TeamContainer>
    )
}

export default Team;
