import React from 'react'
import styled from 'styled-components'

const PlayStyled = styled.div`
background: rgb(${props => props.primary ? props.primary : '255,255,255'});
padding: 15px;
border: solid black 2px;
border-radius: 10px;
color: black;
margin: 10px;
box-shadow: 5px 5px grey;
min-width: 25%;
@media only screen and (max-width: 600px){
    min-width: 45%;
}
`
const TeamBorder = styled.div`
background: rgb(${props => props.secondary ? props.secondary : '255,255,255'});
padding: 25px;
border-radius: 10px;
`
const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background: rgb(${props => props.tertiary ? props.tertiary : '255, 255, 255'});
border-radius: 10px;
color: black;
`

function PlayerCard(props) {
    let primary
    let secondary
    let tertiary
    try {
        primary = props.colors.colors[0].join(',')
        secondary = props.colors.colors[1].join(',')
        tertiary = props.colors.colors[2].join(',')
    } catch (err) {
        return null
    }


    return (
        <PlayStyled primary={primary}>
            <TeamBorder secondary={secondary}>
                <Content tertiary={tertiary}>
                    <p><strong>Team:</strong> {props.playerData.team}</p>
                    <p><strong>Name:</strong> {props.playerData.name}</p>
                    <p><strong>Points:</strong> {props.playerData.goals + props.playerData.assists}</p>
                    <p><strong>Goals: </strong>{props.playerData.goals}</p>
                    <p><strong>Assists: </strong>{props.playerData.assists}</p>
                </Content>
            </TeamBorder>
        </PlayStyled>
    )
}

export default PlayerCard;
