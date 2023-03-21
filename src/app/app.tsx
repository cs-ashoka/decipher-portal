// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Computer from './computerTerminal';

export function App() {
  return (
    // authentication system
    <div className='page'>
        {/* <h1>Login</h1> */}
        {/* <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            <br />
            <label style={{marginLeft: 10}} htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <br />
            <button type="submit">Login</button>
        </form> */}
        <Computer />
    </div>
  );
}

export default App;
