import React from 'react'
import styled from 'styled-components'

const Navigator = styled.div`
background: black;
min-height: 100vh;
display: flex;
flex-direction: column;
width: 20%;
color: white;
`

const NavTab = styled.div`
background: grey;
color: white;
padding: 10px;
font-size 1.25em;
margin: 5px;
:hover{
    cursor: pointer;
    background: rgb(150, 150, 150);
}
`

class DashNav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Navigator>
                <NavTab onClick={this.props.newLeague}>New League</NavTab>
                <NavTab>Account info</NavTab>
                <NavTab>Standings</NavTab>
                <NavTab onClick={this.props.logout}>Logout</NavTab>
                <p>{this.props.user}</p>
            </Navigator>
        )
    }
}

export default DashNav;