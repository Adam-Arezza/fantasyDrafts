import React from 'react'
import styled from 'styled-components'
import MobileNav from './MobileNav'
import { NavLink } from 'react-router-dom'


const Navigator = styled.div`
background: black;
min-height: 100vh;
display: flex;
flex-direction: column;
width: 20%;
color: white;
@media only screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    min-height: 50px;
}
`

const NavTab = styled(NavLink)`
background: grey;
color: white;
padding: 10px;
font-size 1.25em;
margin: 5px;
text-decoration: none;
:hover{
    cursor: pointer;
    background: rgb(150, 150, 150);
}
&.active {
    background:rgb(55, 185, 255);
    color: black;
}
`
const LogoutDiv = styled.div`
background: grey;
color: white;
padding: 10px;
font-size 1.25em;
margin: 5px;
text-decoration: none;
:hover{
    cursor: pointer;
    background: rgb(150, 150, 150);
}
`

function DashNav(props) {
    if(window.innerWidth < 600) {
        return(
            <MobileNav props={props}></MobileNav>
        )
    }

    return (
        <Navigator>
            <NavTab to='/dashboard' exact>Latest games</NavTab>
            <NavTab onClick={props.newLeague} to='/dashboard/new-league' exact>New League</NavTab>
            <NavTab to='/dashboard/account' exact>Account info</NavTab>
            <NavTab to='/dashboard/leagues' exact>Leagues</NavTab>
            <LogoutDiv onClick={props.logout}>Logout</LogoutDiv>
            <p>{props.user}</p>
        </Navigator>
    )
}

export default DashNav;