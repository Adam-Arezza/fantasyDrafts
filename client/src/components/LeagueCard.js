import React from 'react'
import styled from 'styled-components'

const CardStyled = styled.div`
background: lightgrey;
border-radius: 10px;
margin: 15px;
color: black;
padding: 15px;
display: flex;
flex-direction: row;
`
const InnerCard = styled.div`
display: flex;
flex-direction: column;
`
const Detail = styled.div`
font-size: 1.2em;
padding: 5px;
margin: 5px;
`
const Team = styled.div`
background: black;
color: white;
`

class LeagueCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetails: false
        }
    }

    showDetails = () => {
        this.setState({ showDetails: !this.state.showDetails })
    }

    render() {
        let detailKeys = Object.keys(this.props.details)
        detailKeys = detailKeys.filter(d => {
            return d !== "Members" && d !== "Teams" && d !== "Creator" && d !== "_id" && d !== "__v"
        })
        let details = detailKeys.map((detail, index) => <Detail key={index}><span>{detail}: {this.props.details[detail]}</span></Detail>)

        return (
            <CardStyled>
                {this.props.details.Name}
                <button onClick={this.showDetails}>Details</button>
                {this.state.showDetails ? <InnerCard>{details}</InnerCard> : null}
                {this.state.showDetails ? <InnerCard><Team>Teams</Team></InnerCard> : null}
            </CardStyled>
        )
    }
}

export default LeagueCard;