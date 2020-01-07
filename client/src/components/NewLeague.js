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
width: 80%;
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

class NewLeague extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                ppgoal: 0,
                ppAssist: 0,
                forwards: 0,
                defense: 0,
                ir: 0,
                ppgGoalie: 0,
                ppaGoalie: 0,
                shutout: 0,
                win: 0,
                draftType: ""
            },
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
        let prevState = this.state.options

        prevState[option] = selection

        this.setState({})
    }

    render() {
        let keys = Object.keys(this.state.ranges)
        let selectors = keys.map((k, index) => <Selector key={index} values={this.state.ranges[k]} label={k} selection={this.handleSelect}></Selector>)

        return (
            <MainContainer>
                <InputStyled placeholder="League Name" ></InputStyled>
                <ButtonGroup>
                    <label for="live">Live Draft</label>
                    <CheckInput id="live" onClick={this.handleInput} value="live" draftType={this.state.draftType}></CheckInput>
                    <label for="unlimited">Players unlimited</label>
                    <CheckInput id="unlimited" onClick={this.handleInput} value="unlimited" draftType={this.state.draftType}></CheckInput>
                </ButtonGroup>
                <SelectionGroup>
                    {selectors}
                </SelectionGroup>
            </MainContainer>
        )
    }
}

export default NewLeague;