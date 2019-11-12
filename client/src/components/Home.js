import React from 'react'
import styled from 'styled-components'
import DailyContainer from './DailyContainer'
import HomeHeader from './HomeHeader'

const HomeStyle = styled.div`
background: white;
`

function Home() {
    return (
        <HomeStyle>
            <HomeHeader></HomeHeader>
            <DailyContainer></DailyContainer>
        </HomeStyle>
    )
}

export default Home;
