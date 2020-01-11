import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'

const LoginStyled = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
justify-content: center;
align-items: center;
`
const InputStyled = styled.input`
width: 40%;
display: block;
font-size: 2.0em;
margin: 10px;
padding: 10px;
border: solid black 2px;
border-radius: 20px;
:focus {
    outline:none;
}
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
padding: 15px;
color: white;
font-size: 1.5em;
border: none;
background: black;
border-radius: 30px;
:hover {
    cursor: pointer;
    background: darkgrey;
}
`
const BackBtn = styled.button`
:hover {
    cursor: pointer;
    background: darkgrey;
}
margin: 10px;
padding: 15px;
color: white;
font-size: 1.5em;
border: none;
background: black;
border-radius: 30px;

`

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            error: "",
            back: false
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
    //https://e31e6cc6.ngrok.io/login

    submitCredentials() {
        if (this.state.username !== "" && this.state.password !== "") {
            axios.post("https://e31e6cc6.ngrok.io/login", {
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

    goBack() {
        this.setState({back:true})
    }

    render() {
        return (
            <LoginStyled>
                <h1>Login</h1>
                <InputStyled placeholder="username" onChange={this.handleUsername}></InputStyled>
                <InputStyled type="password" placeholder="password" onChange={this.handlePassword}></InputStyled>
                <SubmitStyled onClick={this.submitCredentials} >Submit</SubmitStyled>
                {this.state.error !== "" ? <Warning>{this.state.error} <button onClick={this.closeWarning}>X</button></Warning> : null}
                <BackBtn onClick={()=> this.goBack()}>Go Back</BackBtn>
                {this.state.back === true? <Redirect to="/"></Redirect> : null}
            </LoginStyled>
        )
    }
}

export default Login;
