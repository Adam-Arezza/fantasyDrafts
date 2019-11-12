import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const RegisterStyled = styled.div`
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

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleError = this.handleError.bind(this)
        this.closeWarning = this.closeWarning.bind(this)
    }
    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleError(e) {
        this.setState({error: e})
    }

    handleSubmit() {
        if(this.state.email !== "" && this.state.password !== ""){
            axios.post("localhost:5000/register", {
                email: this.state.email,
                password: this.state.password
            })
            .then( res => {
                console.log(res.data)
                // if email or password is invalid
                //this.handleError(error)
            })
            .catch(err => console.log(err))
        }
        if(!this.state.email || !this.state.password) {
            this.handleError("Must input email and password to register")
        }
    }

    closeWarning() {
        this.setState({error: ""})
    }

    render() {
        return (
            <RegisterStyled>
                <InputStyled onChange={this.handleEmail} placeholder="email"></InputStyled>
                <InputStyled onChange={this.handlePassword} placeholder="password" type="password"></InputStyled>
                <SubmitStyled onClick={this.handleSubmit}>Register</SubmitStyled>
                {this.state.error !== "" ? <Warning>{this.state.error} <button onClick={this.closeWarning}>X</button></Warning> : null}
            </RegisterStyled>
        )
    }
}

export default Register;
