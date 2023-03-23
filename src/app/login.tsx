import React from "react";

const LoginPage = () => {
    return (
        <div className="page">
            <h1>Decipher</h1>
            <p>A Banjaara 2023 Event</p>
            <form action="POST">
                <input className="text-box" type="text" name="username" placeholder="Team Username" />
                <br />
                <input className="text-box" type="password" name="password" placeholder="Password"/>
                <br />
                <button style={{backgroundColor: '#FF6612', border: 'none', padding: '5px', borderRadius: '5px', width: '100%', marginTop: '20px'}}>Log In</button>
                <p style={{textAlign: "center"}}>Powered by the CS Society</p>
            </form>
        </div>
    );
};

export default LoginPage;