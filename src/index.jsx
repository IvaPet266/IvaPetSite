import React                            from "react";
import ReactDOM                         from "react-dom/client";
import store                            from './app/store';
import { Provider }                     from 'react-redux';
import ErrorBoundary                    from "./Components/ErrorBoundry";
import { BrowserRouter, Route, Routes } from "react-router";

import ScreenContests   from "./Screens/ScreenContests";
import ScreenDiscussion from "./Screens/ScreenDiscussion";
import ScreenMain       from "./Screens/ScreenMain";
import ScreenProfile    from "./Screens/ScreenProfile";
import ScreenNewPost    from "./Screens/ScreenNewPost";
import ScreenSearch     from "./Screens/ScreenSearch";
import CardScreen       from "./Components/Card/CardScreen";


ReactDOM.createRoot( document.getElementById( "app" ) ).render( 
    <ErrorBoundary>
        <Provider store={ store }>
                <BrowserRouter> 
                    <Routes>
                        {/* <Route path="/" element={ <App/> }> */}
                        <Route index element={ <ScreenMain/> }/>
                        <Route path="contests" element={ <ScreenContests/> }/>
                        <Route path="discussion" element={ <ScreenDiscussion/> }/>
                        <Route path="newpost" element={ <ScreenNewPost/> }/>
                        <Route path="search" element={ <ScreenSearch/> }/>
                        <Route path="profile" element={ <ScreenProfile/> }>
                            <Route path="collections"/>
                            <Route path="saved"/>
                            <Route path="liked"/>
                            <Route path="reposted"/>
                            <Route path="settings"/>
                            <Route path="support"/>
                        </Route>
                        <Route path="cards?cardId=:cardId" element={ <CardScreen/> }>
                        </Route>
                    </Routes>
                </BrowserRouter>
        </Provider>
    </ErrorBoundary>
);
