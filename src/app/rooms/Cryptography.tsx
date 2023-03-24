import React from "react";
import Page from "../Page";
import roomImage from '../../assets/images/cryptographyroom.svg'
import safe from '../../assets/images/Safe.svg'
import knob from '../../assets/images/Knob.svg'
import { KeyObject } from "crypto";



export default function CryptographyRoom() {
    const [progress, setProgress] = React.useState({
        1: false,
        2: false,
        3: false,
        code: false
    });

    const [modal, setModal] = React.useState(0);
    
    function SafeModal({a, ...props}: {a: number}) {
        const [key, setKey] = React.useState('');
        const [error, setError] = React.useState(false);
        console.log(a)
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
                    if (key === '123') {
                        setProgress({...progress, [a]: true})
                        setModal(0);
                    } else {
                        setError(true);
                    }}}>Submit</button>
                </div>
            </div>
        )
    }

    return (
        <Page>
            {modal !== 0  && <SafeModal a={modal} />}
            <a href="\home" style={{color: "white", alignSelf: 'baseline', marginLeft: 25}}>← Back</a>
            <div>
                <p onClick={() => {console.log("Can't open safe")}} style={{transform: 'rotate(-30deg)', position: "relative", top: 120, left: 150, cursor: 'pointer', fontSize: '0.5rem', zIndex: 100}}>Open the safe</p>
                <object data={roomImage} type="image/svg+xml" height={600}>
                </object>
                <object data={safe} type="image/svg+xml" style={{position: "relative", right: 450, bottom: 220}} height={150}></object>
                <div 
                    className="interactable" onClick={() => setModal(1)} 
                    style={{position: "relative", bottom: 320, left: 219, width: 30}}>
                    <object  data={knob} type="image/svg+xml" height={22}></object>
                </div>
                <div 
                    className="interactable" onClick={() => setModal(2)} 
                    style={{position: "relative", bottom: 318, left: 219, width: 30}}>
                    <object  data={knob} type="image/svg+xml" height={22}></object>
                </div>
                <div 
                    className="interactable" onClick={() => setModal(3)} 
                    style={{position: "relative", bottom: 318, left: 220, width: 30}}>
                    <object  data={knob} type="image/svg+xml" height={22}></object>
                </div>
            </div>

        </Page>
    );
}