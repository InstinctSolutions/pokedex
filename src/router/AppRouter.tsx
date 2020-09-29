import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../pages/Main';
import Test from '../pages/Test';

const AppRouter:React.FC = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/test'} component={Test}/>
                <Route path={'/'} component={Main}/>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;