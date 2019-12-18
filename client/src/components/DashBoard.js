import React from 'react'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            leagues: [],
            teams: [],
            players: []
        }
    }

    render() {
        return (
            <div>
                <h1>User Dashboard</h1>
                <h2>Welcome back {this.state.user}</h2>
            </div>
        )
    }
}
export default Dashboard;
