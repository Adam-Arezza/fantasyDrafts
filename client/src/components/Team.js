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

function Team(props) {

    let players = props.team.Players.map((p, index) => <PlayerRow key={index}>{p}</PlayerRow>)

    return (
        <TeamContainer>
            <h2>{props.team.Name}</h2>
            <PlayerTable>
                {players}
            </PlayerTable>
        </TeamContainer>
    )
}

export default Team;
