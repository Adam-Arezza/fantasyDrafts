import React from 'react'
import styled from 'styled-components'
import DailyContainer from './DailyContainer'

const HomeStyle = styled.div`
background: white;
`

function Home() {
    return (
        <HomeStyle>
            <DailyContainer></DailyContainer>
        </HomeStyle>
    )
}

export default Home;
