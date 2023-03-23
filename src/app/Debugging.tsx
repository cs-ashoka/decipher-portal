import React from "react";
import Page from "./Page";
import computersvg from '../assets/images/Computer.svg'
import roomImage from '../assets/images/Room.svg'
import {useNavigate} from "react-router-dom";

export default function Debugging() {
    const navigate = useNavigate();

    return (
        <Page>
            <p onClick={() => console.log('jhldakjh')}>Welcome to the debugging room.</p>
            <object data={roomImage} type="image/svg+xml" height={500}>
            </object>
            <a onClick={() => console.log('hello')} href="/debugging/computer" style={{position: "absolute", marginRight: 190, marginBottom: 80}}>
                <object className="question interactable" data={computersvg} type="image/svg+xml" height={100} />
            </a>
        </Page>
    );
}