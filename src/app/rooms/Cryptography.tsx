import React, { useState } from "react";
import Page from "../Page";
import roomImage from '../../assets/images/cryptographyroom.svg'
import safe from '../../assets/images/Safe.svg'
import knob from '../../assets/images/Knob.svg'
import dots from '../../assets/images/Frame3.png'
const Latex = require('react-latex');
import axios from 'axios';
import { useAuth } from "../app";
import { useNavigate } from "react-router-dom";

export default function CryptographyRoom() {
    const [progress, setProgress] = React.useState({
        1: false,
        2: false,
        3: false,
        code: false
    });

    const [modal, setModal] = React.useState(0);

    const [safeOpen, setSafeOpen] = React.useState(false);
    const [details, setDetails] = React.useState(false);
    const [numberDetails, setNumberDetails] = React.useState(false);
    const {userID} = useAuth()
    const navigate = useNavigate()

    const latexstring = "\\[ (\\sum_{i=1}^{\\infty} i)^{-1} + 4\\]"

    const solve = (i:number, answer:string) => {
        axios.post(`https://decipher-backend.vercel.app/play/2/solve/`, {
            auth: userID,
            challengeNumber: i,
            answer: answer
        }).then((res) => {if (res.data) {
            setProgress(progress => ({...progress, [i]: true}))
            setModal(0)
            if (i == 4) {
                setSafeOpen(false)
                navigate('/home')
            }
        }})
    }

    function Safe() {

        const [key, setKey] = useState('')
        return(
            <div style={{
                position: "absolute", zIndex: 100, width: '100vw', height: '100vh', display: "flex", backgroundColor: '#00000099', justifyContent: "center", alignItems: "center",
                flexDirection: "column"
            }}>
                <div style={{textDecoration: 'underline', cursor: 'pointer', marginBottom: 30}} onClick={() => setSafeOpen(false)}>Close</div>
                <div style={{backgroundColor: '#999', display: "flex", border: '#BBB 10px solid', width: '30vw', height: '50vh', justifyContent: "center", alignItems: "center" }}>
                    <div style={{backgroundColor: "white", height: "30vh", width: "15vw", color: "black", padding: 10, textAlign: 'center'}}>
                        <Latex>{latexstring}</Latex>
                        <p style={{fontFamily: 'monospace'}}>jiv rii jivriizi</p>
                    </div>
                </div>
                <input style={{marginTop: 25}} type="text" name="" id="" value={key} onChange={(e) => setKey(e.target.value)} />
                <button onClick={() => {solve(4, key)}}>Submit</button>
            </div>
        )
    }
    
    function SafeModal({a, ...props}: {a: number}) {
        const [key, setKey] = React.useState('');
        const [error, setError] = React.useState(false);
        return(
            <div 
                style={{
                    position: "absolute", zIndex: 20, width: '100vw', height: '100vh', display: "flex", backgroundColor: '#00000099', justifyContent: "center", alignItems: "center",
                    flexDirection: "column"
                }}>
                <div style={{width: '50vw', color: "black", height: '20vh', backgroundColor: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column"}}>
                    <div onClick={() => setModal(0)} style={{cursor: "pointer"}}>Close</div>
                    <div style={{color: "red", display: error ? 'block' : 'none', margin: 0}}>Incorrect key</div>
                    <h3 style={{margin: 0}}>Enter the key {a}</h3>
                    <input value={key} onChange={(e) => setKey(e.target.value)} type="text" name="" id="" />
                <button onClick={() => {
                    solve(a, key)}}>Submit</button>
                </div>
            </div>
        )
    }

    return (
        <Page>
            {safeOpen && <Safe />}
            {modal !== 0  && <SafeModal a={modal} />}
            {numberDetails && <div style={{backgroundColor: '#0009', position: "absolute", zIndex: 100, flexDirection: "column", width: '100vw', height: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <div style={{textDecoration: 'underline', cursor: 'pointer', marginBottom: 10}} onClick={() => setNumberDetails(false)}>Close</div>
                <div style={{backgroundColor: 'white', color: 'black', padding: 10, letterSpacing: 2, borderRadius: '5px'}}>
            7002320026000297003210035536 <br />
            8002350022000257003240035036 <br />
            3002340025000294003250035636
                </div>
            </div>}
            {details && <div style={{backgroundColor: '#0009', position: "absolute", zIndex: 100, flexDirection: "column", width: '100vw', height: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <div style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setDetails(false)}>Close</div>
                <img src={dots} alt="" />
                </div>}
            <a href="/home" style={{color: "white", alignSelf: 'baseline', marginLeft: 25}}>← Back</a>
            <div style={{display: "flex"}}>
                <p onClick={() => {if(progress[1] && progress[2] && progress[3]) {setSafeOpen(true)}}} style={{height: 10, fontWeight: 700, transform: 'rotate(-30deg)', position: "relative", top: 250, left: 300, cursor: 'pointer', fontSize: '0.5rem', zIndex: 10}}>Open the safe</p>
                <p onClick={() => {setDetails(true)}} style={{height: 10, transform: 'rotate(-30deg)', position: "relative", top:235, left: 300, cursor: 'pointer', fontSize: '0.5rem', zIndex: 10}}>← View</p>
                <p onClick={() => {setNumberDetails(true)}} style={{height: 10, transform: 'rotate(25deg)', position: "relative", cursor: 'pointer', fontSize: '0.5rem', zIndex: 10, color: "black", fontWeight: 500, top: 225, left: 490}}>← View</p>
                <object data={roomImage} type="image/svg+xml" height={600}>
                </object>
                <object data={safe} type="image/svg+xml" style={{position: "relative", right: 450, top: 225}} height={150}></object>
                <div 
                    className="interactable" onClick={() => setModal(1)} 
                    style={{position: "relative", top: 280, right: 480, width: 30, height: 25}}>
                    <object  data={knob} type="image/svg+xml" height={22}></object>
                </div>
                <div 
                    className="interactable" onClick={() => setModal(2)} 
                    style={{position: "relative", top: 307, right: 510, width: 30, height: 25}}>
                    <object  data={knob} type="image/svg+xml" height={22}></object>
                </div>
                <div 
                    className="interactable" onClick={() => setModal(3)} 
                    style={{position: "relative", top: 335, right: 540, width: 30, height: 25}}>
                    <object  data={knob} type="image/svg+xml" height={22}></object>
                </div>
            </div>

        </Page>
    );
}