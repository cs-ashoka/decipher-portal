import React from "react";
import Page from "../Page";
import computersvg from '../../assets/images/Computer.svg'
import roomImage from '../../assets/images/debuggingroom.svg'
import {useNavigate} from "react-router-dom";

export default function Debugging() {
    const navigate = useNavigate();

    return (
        <Page>
            <a href="/home" style={{color: "white", alignSelf: 'baseline', marginLeft: 25}}>← Back</a>
            <object data={roomImage} type="image/svg+xml" height={600}>
            </object>
            <a onClick={() => console.log('hello')} href="/3/computer" style={{position: "absolute", marginRight: 190, marginBottom: 80, textDecoration: 'none'}}>
                <pre style={{fontFamily: 'sans-serif', color: "black", fontSize: '0.5rem', left: 55, position: 'relative', top: -5, textDecoration: 'none', transform: 'rotate(-30deg)', margin: 0, zIndex: 100}}>Open computer</pre>
                <div>
                    <object className="question interactable" data={computersvg} type="image/svg+xml" height={100} />
                </div>
            </a>
        </Page>
    );
}