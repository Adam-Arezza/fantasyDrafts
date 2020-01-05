import React from 'react'

class DashTeams extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.teams.length === 0) {
            return <h1>No teams</h1>
        }
        return (
            <div>Teams</div>
        )
    }
}

export default DashTeams;