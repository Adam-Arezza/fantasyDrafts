import React from 'react'
import styled from 'styled-components'

const AccountHeader = styled.h1`
border-bottom: solid black 2px;
padding: 15px;
margin: 10px;
`

const StyledButton = styled.button`
margin: 10px;
padding: 10px;
color: white;
font-size: 1.2em;
border: none;
background: black;
border-radius: 10px;
width:20%;
:hover {
    cursor: pointer;
    background: darkgrey;
}
@media only screen and (max-width: 600px) {
    width: 75%;
}
`

const MainContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`

function Account(props) {

    const changeEmail = () => {
        console.log("changing email")
    }

    const changePassword = () => {
        console.log("changing password")
    }

    return (
        <div>
            <AccountHeader>My Account</AccountHeader>
            <MainContainer>
            <h3>Email: {props.user}</h3>
            <StyledButton onClick={changeEmail}>Change Email</StyledButton>
            <StyledButton onClick={changePassword}>Change Password</StyledButton>
            </MainContainer>
        </div>
    )
}

export default Account;