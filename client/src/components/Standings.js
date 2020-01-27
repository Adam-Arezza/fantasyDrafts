import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.table`
background: white;
border: solid black 1px;
`

const TableHeadings = styled.th`
font-size: 1.2em;
padding: 5px 15px;
background: white;
`

const TableRow = styled.tr`
background: rgb(230,230,230);
`
const TableCell = styled.td`
text-align: center;
padding: 5px 15px;
`

//show a table of users
//sorted by total points
//fields are Rank, User, Points
//click on user to view their team

function Standings(props) {

    let teams = props.teams

    // let teams = [{
    //     Owner: 'adam',
    //     League: "thisLeague",
    //     Name: 'Myteam',
    //     Players: [
    //         {
    //             Name: "player1",
    //             Points: 40
    //         },
    //         {
    //             Name: "player2",
    //             Points: 35
    //         }
    //     ]
    // }, {
    //     Owner: 'Dude',
    //     League: 'thisLeague',
    //     Name: 'DudesTeam',
    //     Players: [
    //         {
    //             Name: 'player3',
    //             Points: 20
    //         },
    //         {
    //             Name: 'player4',
    //             Points: 25
    //         }
    //     ]
    // }]

    const headings = ['Rank', 'User', 'Points']
    const tableHeaders = headings.map((heading, index) => <TableHeadings key={index}>{heading}</TableHeadings>)
    let points = []
    teams.forEach(team => {
        let total = 0
        team.Players.forEach(player => {
            console.log(player.Points)
            total = total + player.Points
        })
        points.push(total)
    })
    let rows = teams.map((team, index) => {
        return <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell onClick={props.selectTeam(team.Name)}>{team.Owner}</TableCell>
            <TableCell>{points[index]}</TableCell>
        </TableRow>
    })

    return (
        <TableContainer>
            <tbody>
                <TableRow>{tableHeaders}</TableRow>
                {rows}
            </tbody>
        </TableContainer>
    )
}

export default Standings;