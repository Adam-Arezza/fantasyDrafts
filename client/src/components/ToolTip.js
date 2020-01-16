import React from 'react'

function ToolTip(props) {
    return (
        <div>
            <strong>Live draft</strong>
            <br></br>
            <p>For live drafts players can only be selected by one user.
            The draft will take place at the specified date and time chosen by the league admin.</p>
            <strong>Players unlimited</strong>
            <br></br>
            <p>For players unlimited players can be chosen by any number of users and can be drafted at any time.
            The league will start once all users have their teams picked.</p>
        </div>
    )
}

export default ToolTip