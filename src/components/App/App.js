import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../Homepage';
import TopNavbar from '../TopNavbar';
import LoginPage from '../LoginPage';
import ChatStartPage from '../ChatStartPage';
import ChatScreen from '../ChatScreen';
import './styles.scss';

class App extends Component {
  render() {
    const { user, userName } = this.props;
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
};

const mapStateToProps = ({ usersReducer: { user, userName }}) => {
  return {
    user: user,
    userName: userName
  }
}

export default connect(mapStateToProps, null)(App);
