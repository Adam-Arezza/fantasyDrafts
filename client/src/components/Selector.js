import React from 'react'
import styled from 'styled-components'

const SelectorStyled = styled.select`
font-size: 1.2em;
margin: 10px;
`

class Selector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selection: ""
        }
    }

    getValue = (e) => {
        this.setState({ selection: e.target.value })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.selection !== prevState.selection) {
            this.props.handleSelect(this.props.label, this.state.selection)
        }
    }

    render() {
        let options = this.props.values.map((num, index) => <option key={index} value={num}>{num}</option>)
        return (
            <div>
                <label htmlFor={this.props.label}><strong>{this.props.label}:</strong></label>
                <SelectorStyled id={this.props.label} value={this.state.selection} onChange={this.getValue}>
                    <option></option>
                    {options}
                </SelectorStyled>
            </div>

        )
    }

}

export default Selector;