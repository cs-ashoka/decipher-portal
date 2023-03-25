import React, { useMemo } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { AuthProvider, useAuth } from "./app";

const LoginPage = ({...props}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');;

    const auth = useAuth();

    async function loginHandler() {
        axios.post('https://decipher-backend.vercel.app/auth', {
            username: username,
            password: password
        }).then((res) => {
            console.log('login')
            auth.login(res.data.id)
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="page">
            <div style={{display: "flex", flexDirection: "column", justifyContent: 'space-evenly', alignItems: "center"}}>

            <h1>Decipher</h1>
            <p>A Banjaara 2023 Event</p>
            <input className="text-box" value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Team Username" />
            <br />
            <input className="text-box" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"/>
            <br />
            <button onClick={() => loginHandler()} style={{backgroundColor: '#FF6612', border: 'none', padding: '5px', borderRadius: '5px', width: '100%', marginTop: '20px'}}>Log In</button>
            <p style={{textAlign: "center"}}>Powered by the CS Society</p>
            </div>
        </div>
    );
};

export default LoginPage;