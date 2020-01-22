import React from 'react'
import Standings from './Standings'
import styled from 'styled-components'

const CardStyled = styled.div`
background: lightgrey;
border-radius: 10px;
border: solid 3px black;
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
font-size: 0.90em;
margin: 5px;
`

function LeagueCard(props) {
    let detailKeys = Object.keys(props.details)
    detailKeys = detailKeys.filter(d => {
        return d !== "Members" && d !== "Teams" && d !== "Creator" && d !== "_id" && d !== "__v" && d !== "Name"
    })
    let details = detailKeys.map((detail, index) => <Detail key={index}><strong>{detail}:</strong> {props.details[detail]}</Detail>)

    return (
        <CardStyled>
            <h3>{props.details.Name.toUpperCase()}</h3>
            <InnerCard>
                <Details>
                    <strong>Details</strong>
                    {details}
                </Details>
                <Details>
                    <Standings selectTeam={props.selectTeam} teams={props.details.Teams}></Standings>
                </Details>
            </InnerCard>
            <h2>Top Players this week</h2>
        </CardStyled>
    )
}

export default LeagueCard;