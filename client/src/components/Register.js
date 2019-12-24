import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const RegisterStyled = styled.div`
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

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: "",
            back: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleError = this.handleError.bind(this)
        this.closeWarning = this.closeWarning.bind(this)
    }
    handleEmail(e) {
        this.setState({ email: e.target.value })
    }

    handlePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleError(e) {
        this.setState({ error: e })
    }

    handleSubmit() {
        if (this.state.email !== "" && this.state.password !== "") {
            axios.post("http://192.168.0.17:5000/register", {
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    console.log(res.data)
                    let success = res.data.success
                    if (!success) {
                        return this.handleError(res.data.message)
                    }
                    localStorage.setItem('nhlDraftToken', res.data.token)
                    this.setState({ email: "" })
                    this.setState({ password: "" })
                    this.props.loggedIn(success)
                })
                .catch(err => console.log(err))
        }
        if (!this.state.email || !this.state.password) {
            this.handleError("Must input email and password to register")
        }
    }

    closeWarning() {
        this.setState({ error: "" })
    }

    goBack() {
        this.setState({back:true})
    }

    render() {
        return (
            <RegisterStyled>
                <h1>Register</h1>
                <InputStyled onChange={this.handleEmail} placeholder="email"></InputStyled>
                <InputStyled onChange={this.handlePassword} placeholder="password" type="password"></InputStyled>
                <SubmitStyled onClick={this.handleSubmit}>Register</SubmitStyled>
                {this.state.error !== "" ? <Warning>{this.state.error} <button onClick={this.closeWarning}>X</button></Warning> : null}
                <BackBtn onClick={()=> this.goBack()}>Go Back</BackBtn>
                {this.state.back === true? <Redirect to="/"></Redirect> : null}
            </RegisterStyled>
        )
    }
}

export default Register;
