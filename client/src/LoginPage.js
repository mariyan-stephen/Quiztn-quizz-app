import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <TextField label="Username" />
        <TextField label="Password" type="password" />
        <Button variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
