import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Login from './Component/Login/Login';
import Registration from './Component/Registration/Registration';
import Events from './Component/Events/Events';
function App() {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/login'), [history]);
  const EventsClick = useCallback(() => history.push('/events'), [history]);
  if ( localStorage.getItem('userId') == "undefined") {
    handleOnClick()
  }
  else{
    EventsClick()
  }
 
  return (
    <div className="App">
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <Route path='/registration' render={() => <Registration />} />
        <Route path='/events' render={() => <Events />} />
      </Switch>
    </div>
  );
}

export default App;
