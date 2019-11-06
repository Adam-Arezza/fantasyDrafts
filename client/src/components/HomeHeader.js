import React from 'react'
import styled from 'styled-components'

const HomeHeaderStyled = styled.div`
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

    // function login() {

    // }
    // function register() {

    // }
    return (
        <HomeHeaderStyled>
            <Title>NHL Fantasy</Title>
            <Buttons>Login</Buttons>
            <Buttons>Register</Buttons>
        </HomeHeaderStyled>
    )
}

export default TopNav;
