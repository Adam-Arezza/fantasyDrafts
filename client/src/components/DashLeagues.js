import React from 'react'

class DashLeagues extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.leagues.length === 0) {
            return <h1>No leagues</h1>
        }
        return (
            <div>this.props.leagues</div>
        )
    }
}

export default DashLeagues;