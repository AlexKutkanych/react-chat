import React, { Component } from 'react';
import { Button, TextField, Icon } from '@material-ui/core';
import './styles.scss';

class UsernameForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  render(){
    return (
      <div className="login-form">
        <form action="submit" onSubmit={() => this.props.handleUserSubmitted(this.state.name)}>
          <TextField className="login-form__text-field" required id="standard-required" placeholder="Please enter your name" onChange={this.handleChange} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
          Login
        </Button>
        </form>
      </div>
    )
  }
}

export default UsernameForm;

