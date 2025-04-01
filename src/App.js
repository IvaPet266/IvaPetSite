import React, { useEffect, useState } from 'react'
import ScreenContests from './Screens/ScreenContests'
import ScreenMain from './Screens/ScreenMain'
import ScreenDiscussion from './Screens/ScreenDiscussion'
import ScreenNewPost from './Screens/ScreenNewPost'
import ScreenProfile from './Screens/ScreenProfile'
import ScreenSearch from './Screens/ScreenSearch'
import { useScreen } from './Components/ProviderScreen'
import Menu from './Components/Menu'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'


export default function App() {
    const { screen, setScreen } = useScreen();

    // const routes = useSelector( ( state ) => state.routes.routes );
    // const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(screen);
    //     navigate( `/${ routes[ screen ] }` )
    // }, [ screen ])

    switch ( screen ) {
        case "contests":   return <ScreenContests><Menu setScreen={ setScreen }/></ScreenContests>
        case "discussion": return <ScreenDiscussion><Menu setScreen={ setScreen }/></ScreenDiscussion>
        case "newPost":    return <ScreenNewPost><Menu setScreen={ setScreen }/></ScreenNewPost>
        case "profile":    return <ScreenProfile><Menu setScreen={ setScreen }/></ScreenProfile>
        case "search":     return <ScreenSearch><Menu setScreen={ setScreen }/></ScreenSearch>
        default:           return <ScreenMain><Menu setScreen={ setScreen }/></ScreenMain>
    }
}



