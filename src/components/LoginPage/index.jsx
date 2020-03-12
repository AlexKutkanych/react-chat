import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserName } from '../../actions';
import UsernameForm from '../UsernameForm';

class LoginPage extends Component {
  
  handleUserSubmitted = (e, user) => {
    e.preventDefault();

    const body = JSON.stringify({
      name: user
    });

    this.props.setUserName(user);

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
  setUserName: name => dispatch(setUserName(name))
})


const mapStateToProps = (state) => {
  return {
    userName: state.userName
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));

