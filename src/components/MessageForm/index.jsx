import React, { Component } from 'react';
import { TextField, Icon } from '@material-ui/core';
import './styles.scss';

class MessageForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
  }

  handleChange = (e) => {
    this.props.onChange();
    this.setState({ name: e.target.value });
  }

  handleSubmit = (e) => {
    this.props.sendMessage(e, this.state.name);
    this.setState({ name: '' });
  }

  render(){
    return (
      <div>
        <form className="message-form" action="submit" onSubmit={this.handleSubmit}>
          <TextField
            className="message-form__text-field"
            value={this.state.name}
            required
            id="standard-required"
            placeholder="Please enter your name"
            onChange={this.handleChange}
          />
          <button type="submit"><Icon>send</Icon></button>
        </form>
      </div>
    )
  }
}

export default MessageForm;

