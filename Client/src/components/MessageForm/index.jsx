import React, { useState } from 'react';
import { TextField, Icon } from '@material-ui/core';
import './styles.scss';

const MessageForm = ({ sendMessage, onChange }) => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    onChange();
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    sendMessage(e, name);
    setName('');
  }

  return (
    <div>
      <form className="message-form" action="submit" onSubmit={handleSubmit}>
        <TextField
          className="message-form__text-field"
          value={name}
          required
          id="standard-required"
          placeholder="Please enter your name"
          onChange={handleChange}
        />
        <button type="submit"><Icon>send</Icon></button>
      </form>
    </div>
  )
}


export default MessageForm;

