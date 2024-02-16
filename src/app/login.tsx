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
            <div className="login-page">
                <div className="login-container">
                    <h1 style={{fontWeight: 'bold'}}>Just In Case</h1>
                    <p className="event-info">An Equilibrium 2024 Event</p>
                    <input className="text-box" value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Team Username"/>
                    <input className="text-box" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"/>
                    <button className="login-button" onClick={loginHandler}> Log In </button>
                    <p className="footer">Developed by the CS Society</p>
                    <div className="society-logos">
                        <img className="society-logo" src="../assets/images/equilibrium.png" alt="Equilibrium Logo" />
                        <span className="collaboration-symbol">X</span>
                        <img className="society-logo" src="../assets/images/cssociety_logo.png" alt="CS Soc Logo" />
                        <span className="collaboration-symbol">X</span>
                        <img className="society-logo" src="../assets/images/econsoc.png" alt="Econ Soc Logo" />
                        <span className="collaboration-symbol">X</span>
                        <img className="society-logo" src="../assets/images/acc_logo_main.png" alt="ACC Logo" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;