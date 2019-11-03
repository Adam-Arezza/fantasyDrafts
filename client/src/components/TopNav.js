import React from 'react'
import styled from 'styled-components'

const TopNavStyled = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
const Buttons = styled.button`
margin: 10px;
padding: 5px;
font-size: 1.2em;
border: none;
background: black;
color: white;
border-radius: 5px;
:hover {
    cursor: pointer;
    background: darkgrey;
}
`

const Title = styled.h1`
justify-self: flex-start;
`

function TopNav() {

    return (
        <TopNavStyled>
            <Title>NHL Fantasy</Title>
            <Buttons>Login</Buttons>
            <Buttons>Register</Buttons>
        </TopNavStyled>
    )
}

export default TopNav;
