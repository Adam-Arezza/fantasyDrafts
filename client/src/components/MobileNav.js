import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


const Navigator = styled.div`
background: black;
display: flex;
flex-direction: column;
color: white;
width: 100%;
min-height: 50px;
justify-content: center;
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

const Toggler = styled.button`
background: grey;
font-size: 1.25em;
width:50%;
align-self: center;
`

class MobileNav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            toggled: false
        }
    }

    toggleMenu = () => {
        this.setState({toggled: !this.state.toggled})
    }

    render() {
        if(this.state.toggled) {
            return (
                <Navigator>
                    <Toggler onClick={this.toggleMenu}>Menu</Toggler>
                    <NavTab to='/dashboard' exact>Latest games</NavTab>
                    <NavTab onClick={this.props.newLeague} to='/dashboard/new-league' exact>New League</NavTab>
                    <NavTab to='/dashboard/account' exact>Account info</NavTab>
                    <NavTab to='/dashboard/leagues' exact>Leagues</NavTab>
                    <LogoutDiv onClick={this.props.logout}>Logout</LogoutDiv>
                    <p>{this.props.user}</p>
                </Navigator>
            )
        }
        return (
            <Navigator>
                <Toggler onClick={this.toggleMenu}>Menu</Toggler>
            </Navigator>
        )
        
    }
}

export default MobileNav;