import React, { useState } from 'react';
import { Button, TextField, Icon } from '@material-ui/core';
import './styles.scss';

function UsernameForm({ handleUserSubmitted }) {
  const [username, setUsername] = useState('');

  return (
    <div className="login-form">
      <form action="submit" onSubmit={(e) => handleUserSubmitted(e, username)}>
        <TextField
          className="login-form__text-field"
          required
          id="standard-required"
          placeholder="Please enter your name"
          onChange={(e) => setUsername(e.target.value)} />
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

export default UsernameForm;

