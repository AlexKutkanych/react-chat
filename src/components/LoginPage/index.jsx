import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions';
import UsernameForm from '../UsernameForm';

class LoginPage extends Component {
  
  handleUserSubmitted = (e, user) => {
    e.preventDefault();

    const body = JSON.stringify({
      name: user
    });

    this.props.setUser(user);

    fetch('http://localhost:3001/user', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => this.props.history.push('/homepage'));
  }
  

  render(){
    return (
      <UsernameForm handleUserSubmitted={this.handleUserSubmitted} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
})


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));

