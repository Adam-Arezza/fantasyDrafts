import React from 'react'
import styled from 'styled-components'
import Selector from './Selector'
import axios from 'axios'
// league name
// live draft or players unlimited
// # of forwards/defense/goalies
// points per goal/assist
// points per win/shutout/goal/assist for goalies
// # of IR

const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
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

const CheckInput = styled.button`
border-radius: 50%;
background: ${props => (props.value === props.draftType ? 'rgb(55, 185, 255)' : 'lightgrey')};
padding: 10px;
margin: 10px 25px 10px 10px;
border: solid black 1px;
:hover {
    cursor: pointer;
}
:focus {
    outline: none;
}
`

const ButtonGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

const SelectionGroup = styled.div`
display: flex;
flex-direction: column;
`

const SubmitStyled = styled.button`
margin: 10px;
padding: 15px;
color: white;
font-size: 1.25em;
border: none;
background: black;
border-radius: 30px;
width:25%;
:hover {
    cursor: pointer;
    background: darkgrey;
}
`

class NewLeague extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            goals: 0,
            assists: 0,
            forwards: 0,
            defense: 0,
            iR: 0,
            goalieGoals: 0,
            goalieAssists: 0,
            shutout: 0,
            win: 0,
            draftType: "",
            goalies: 0
            ,
            ranges: {
                goals: [1, 2],
                assists: [1, 2],
                forwards: [5, 10, 15, 20],
                defense: [5, 10, 15],
                iR: [1, 2, 3],
                goalieGoals: [3, 5, 10],
                goalieAssists: [2, 3, 5],
                shutout: [3, 5],
                win: [1, 2],
                goalies: [1, 2, 3, 4, 5]
            }
        }
    }

    handleInput = (e) => {
        this.setState({ draftType: e.target.value })
    }

    handleSelect = (option, selection) => {
        this.setState({ [`${option}`]: selection })
    }

    getName = (e) => {
        this.setState({ name: e.target.value })
    }

    createLeague = () => {
        let stateKeys = Object.keys(this.state)
        if (!this.state.name) {
            return alert('please enter a name for the league')
        }
        let unSelected = stateKeys.find(k => {
            return this.state[k] === 0
        })
        if (unSelected) {
            return alert("All fields are required to create a league")
        }
        console.log(`Creating league: ${this.state.name}`)

        //get token
        //post request to /leagues/create
        let token = localStorage.getItem('nhlDraftToken')
        let options = Object.keys(this.state)
        options = options.filter(key => key !== 'ranges')
        let filteredOptions = options.map(option => this.state[option])
        let payload = {
            token: token,
            options: {}
        }
        for (let i = 0; i < options.length; i++) {
            let option = options[i]
            option = option.charAt(0).toUpperCase() + option.slice(1)
            let value = filteredOptions[i]
            let valueCopy = value
            valueCopy = Number(valueCopy)
            if(Number.isNaN(valueCopy)){
                payload.options[option] = value
            }
            else{
                payload.options[option] = valueCopy
            } 
        }
        // console.log(payload)
        axios.post("https://e31e6cc6.ngrok.io/leagues/create", payload)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    render() {
        let keys = Object.keys(this.state.ranges)
        let selectors = keys.map((k, index) => <Selector key={index} values={this.state.ranges[k]} label={k} handleSelect={this.handleSelect}></Selector>)

        return (
            <MainContainer>
                <InputStyled placeholder="League Name" onChange={this.getName}></InputStyled>
                <ButtonGroup>
                    <label htmlFor="live">Live Draft</label>
                    <CheckInput id="live" onClick={this.handleInput} value="live" draftType={this.state.draftType}></CheckInput>
                    <label htmlFor="unlimited">Players unlimited</label>
                    <CheckInput id="unlimited" onClick={this.handleInput} value="unlimited" draftType={this.state.draftType}></CheckInput>
                </ButtonGroup>
                <SelectionGroup>
                    {selectors}
                </SelectionGroup>
                <SubmitStyled onClick={this.createLeague}>Create League</SubmitStyled>
            </MainContainer>
        )
    }
}

export default NewLeague;
