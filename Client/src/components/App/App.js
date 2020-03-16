import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from '../Homepage';
import TopNavbar from '../TopNavbar';
import LoginPage from '../LoginPage';
import ChatStartPage from '../ChatStartPage';
import ChatScreen from '../ChatScreen';
import './styles.scss';

const App = () => {
  const user = useSelector(({ usersReducer: { user } }) => user);
  const userName = useSelector(({ usersReducer: { userName } }) => userName);
  
  return (
    <Router>
      <div className='app-container'>
        <TopNavbar />
        <div className='app-content-container'>
          <Switch>
            <Route exact path="/">
              {userName ? <Redirect to="/homepage" /> : <Homepage />}
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/homepage">
              <ChatStartPage user={user} />
            </Route>
            <Route path="/room/:id">
              <ChatScreen user={user} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
