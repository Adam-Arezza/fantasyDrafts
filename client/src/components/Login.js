import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const LoginStyled = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
justify-content: center;
align-items: center;
`
const InputStyled = styled.input`
width: 50%;
display: block;
font-size: 1.2em;
margin: 5px;
`
const Warning = styled.p`
color: red;
font-size: 1.2em;
margin: 10px;
padding: 10px;
border-radius: 20px;
background: pink;
`

const SubmitStyled = styled.button`
margin: 10px;
padding: 5px;
color: white;
font-size: 1.2em;
border: none;
background: black;
border-radius: 5px;
:hover {
    cursor: pointer;
    background: darkgrey;
}
`

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            error: ""
        }
        this.handlePassword = this.handlePassword.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.submitCredentials = this.submitCredentials.bind(this)
        this.handleCredentialsError = this.handleCredentialsError.bind(this)
        this.closeWarning = this.closeWarning.bind(this)
    }

    handleUsername(e) {
        this.setState({ username: e.target.value })
    }

    handlePassword(e) {
        this.setState({ password: e.target.value })
    }

    submitCredentials() {
        if (this.state.username !== "" && this.state.password !== "") {
            axios.post("http://192.168.0.17:5000/login", {
                email: this.state.username,
                password: this.state.password
            })
                .then(res => {
                    console.log(res.data)
                    let success = res.data.success
                    let message = res.data.message
                    if (!success) {
                        console.log(message)
                        return this.handleCredentialsError(message)
                    }
                    localStorage.setItem('nhlDraftToken', res.data.token)
                    this.setState({ email: "" })
                    this.setState({ password: "" })
                    this.props.loggedIn(success)
                })
                .catch(err => console.log(err))
        }
        if (this.state.username !== "" && this.state.password === "") {
            this.handleCredentialsError("Invalid password")
        }
        if (this.state.username === "" && this.state.password !== "") {
            this.handleCredentialsError("Invalid username")
        }
        if (this.state.username === "" && this.state.password === "") {
            this.handleCredentialsError("Must input username and password")
        }

    }

    handleCredentialsError(error) {
        this.setState({ error: error })
    }

    closeWarning() {
        this.setState({ error: "" })
    }

    render() {
        return (
            <LoginStyled>
                <InputStyled placeholder="username" onChange={this.handleUsername}></InputStyled>
                <InputStyled type="password" placeholder="password" onChange={this.handlePassword}></InputStyled>
                <SubmitStyled onClick={this.submitCredentials} >Submit</SubmitStyled>
                {this.state.error !== "" ? <Warning>{this.state.error} <button onClick={this.closeWarning}>X</button></Warning> : null}
            </LoginStyled>
        )
    }
}

export default Login;
