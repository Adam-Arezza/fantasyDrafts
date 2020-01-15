import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const HomeHeaderStyled = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
position: sticky;
top: 0;
background: lightgrey;
a{
    text-decoration: none;
    color: white;
}
`
const Buttons = styled.button`
margin: 10px;
padding: 5px;
font-size: 1.2em;
border: none;
background: black;
border-radius: 5px;
:hover {
    cursor: pointer;
    background: darkgrey;
}
`

const Title = styled.h1`
justify-self: flex-start;
`

function TopNav(props) {

    return (
        <HomeHeaderStyled>
            <Title>NHL Fantasy</Title>
            <Buttons><Link to="/login">Login</Link></Buttons>
            <Buttons><Link to="/register">Register</Link></Buttons>
        </HomeHeaderStyled>
    )
}

export default TopNav;
