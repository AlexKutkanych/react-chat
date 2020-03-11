import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from './components/Homepage';
import TopNavbar from './components/TopNavbar';
import LoginPage from './components/LoginPage';
import ChatStartPage from './components/ChatStartPage';

class App extends Component {
  render() {
    const { user } = this.props;
    return (
      <Router>
        <div className="app-container">
          <TopNavbar user={user} />
          <Switch>
            <Route exact path="/">
              {user ? <Homepage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/homepage">
              <ChatStartPage user={user} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(App);
