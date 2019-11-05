import React from 'react'
// import styled from 'styled-components'

function GameCard(props) {
    if (!props.gameData) {
        return (
            <div>
                NO DATA
            </div>
        )
    }
    return (
        <div>
            <p>{props.gameData}</p>
        </div>
    )
}

export default GameCard;
