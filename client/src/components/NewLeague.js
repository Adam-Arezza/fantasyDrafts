import React from 'react'
import styled from 'styled-components'
import Selector from './Selector'
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
font-size: 1.5em;
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
            ppGoal: 0,
            ppAssist: 0,
            forwards: 0,
            defense: 0,
            ir: 0,
            ppgGoalie: 0,
            ppaGoalie: 0,
            shutout: 0,
            win: 0,
            draftType: ""
            ,
            ranges: {
                ppGoal: [1, 2],
                ppAssist: [1, 2],
                forwards: [5, 10, 15, 20],
                defense: [5, 10, 15],
                ir: [1, 2, 3],
                ppgGoalie: [3, 5, 10],
                ppaGoalie: [2, 3, 5],
                shutout: [3, 5],
                win: [1, 2]
            }
        }
    }

    handleInput = (e) => {
        this.setState({ draftType: e.target.value })
    }

    handleSelect = (option, selection) => {
        this.setState({[`${option}`]: selection})
    }

    getName = (e) => {
        this.setState({name: e.target.value})
    }

    createLeague = () => {
        let stateKeys = Object.keys(this.state)
        if(this.state.name === undefined) {
            return alert('please enter a name for the league')
        }
        stateKeys.forEach(k => {
            console.log(k)
            console.log(this.state[k])
            // if(this.state[k] === 0) {
            //     return alert('All fields are required to create a league')
            // }
        })
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