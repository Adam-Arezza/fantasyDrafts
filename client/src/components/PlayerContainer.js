import React from 'react'
import styled from 'styled-components'
import PlayerCard from './PlayerCard'

const PlayersStyled = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`

const MoreBtn = styled.button`
background: black;
color: white;
border-radius: 5px;
border:none;
font-size: 1.1em;
padding:5px;
:hover {
    cursor:pointer;
    background: darkgrey;
}
`

class PlayerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playerData: []
        }
    }

    render() {
        return (
            <div>
                <PlayersStyled>
                </PlayersStyled>
                <MoreBtn>More</MoreBtn>
            </div>

        )
    }
}

export default PlayerContainer;
