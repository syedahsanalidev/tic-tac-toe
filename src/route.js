import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Game from './components/Game'
import GamePlayer from './components/Game/player'

const createRoutes = () => (
    <Switch>
        <Route exact path="/" component={Game}/>
        <Route exact path="/:id" component={GamePlayer}/>
    </Switch>
);
export default createRoutes;
