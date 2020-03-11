import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage';
import TopNavbar from './components/TopNavbar';
import LoginPage from './components/LoginPage';
import ChatStartPage from './components/ChatStartPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <TopNavbar user='' />
        <Switch>
          <Route exact path="/">
          <Homepage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/homepage">
            <ChatStartPage user='sdf' />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
