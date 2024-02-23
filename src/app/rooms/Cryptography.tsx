import React, { useState, useEffect } from "react";
import Page from "../Page";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'https://decipher-backend.onrender.com';

export default function CryptographyRoom() {
    const [progress, setProgress] = React.useState({
        0: false,
        1: false,
        2: false,
        3: false
    });

    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [modal, setModal] = React.useState(0);
    const [safeOpen, setSafeOpen] = React.useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    const solve = (i:number, answer:string) => {
        console.log(i, answer)
        axios.post(`${BACKEND_URL}/play/2/solve/`, {
            challengeNumber: i,
            answer: answer
        }, {
            withCredentials:true
        }).then((res) => {
            console.log(i)
            if (res.data)
             {
            setProgress(progress => ({...progress, [i]: true}))
            setModal(0)
            setCurrentChallenge(currentChallenge + 1);
                        console.log(currentChallenge)
            if (i == 3) {
                setSafeOpen(false)
                navigate('/home')
            }
        }
        else{
            setError(true)
        }
    }).catch((error) => {
        setError(true)
    })
    }

    function Safe() {

        const [key, setKey] = useState('')
        const [question, setQuestion] = useState('');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/play/2`, {}, {withCredentials: true});
                setQuestion(response.data.question);
            } catch (error) {
                setQuestion('Failed to fetch question');
            }
        };

        fetchQuestion();
    }, []);
        return(
            <div style={{
                position: "absolute", zIndex: 100, width: '100vw', height: '100vh', display: "flex", backgroundColor: '#00000099', justifyContent: "center", alignItems: "center",
                flexDirection: "column"
            }}>
                <div style={{textDecoration: 'underline', cursor: 'pointer', marginBottom: 30}} onClick={() => setSafeOpen(false)}>Close</div>
                <div style={{backgroundColor: '#999', display: "flex", border: '#BBB 10px solid', width: '30vw', height: '50vh', justifyContent: "center", alignItems: "center" }}>
                    <div style={{backgroundColor: "white", height: "30vh", width: "15vw", color: "black", padding: 10, textAlign: 'center'}}>
                        <p style={{fontFamily: 'monospace'}}>{question}</p>
                    </div>
                </div>
                <input style={{marginTop: 25}} type="text" name="" id="" value={key} onChange={(e) => setKey(e.target.value)} />
                <button style={{margin : 10}} onClick={() => {solve(3, key)}}>Submit</button>
            </div>
        )
    }
    
    function SafeModal({ a }: { a: number }) {
        const [key, setKey] = useState('');
        const [question, setQuestion] = useState('');
        setError(false)
        if (progress[0] && progress[1] && progress[2]) {
            setWarning(true)
        }

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/play/2`, {}, {withCredentials: true});
                console.log(response)
                setQuestion(response.data.question);
            } catch (error: any) {
                if (error.code === "ERR_BAD_REQUEST") setQuestion('You have already solved this challenge')
                else setQuestion('Failed to fetch question');
            }
        };

        fetchQuestion();
    }, []);
    
        return (
            <div
                style={{
                    position: "absolute", zIndex: 20, width: '100vw', height: '100vh', display: "flex", backgroundColor: '#00000099', justifyContent: "center", alignItems: "center",
                    flexDirection: "column"
                }}>
                <div style={{ padding:"20px", width: 'fit-content', color: "black", height: 'fit-content', backgroundColor: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                    <div onClick={() => setModal(0)} style={{ cursor: "pointer" }}>Close</div>
                    <div style={{ color: "red", display: error ? 'block' : 'none', margin: 0 }}>Incorrect answer</div>
                    <div style={{ color: "red", display: warning ? 'block' : 'none', margin: 0 }}>Open the safe</div>
                    <h3 style={{ margin: 0 }}>{question}</h3>
                    <input value={key} onChange={(e) => setKey(e.target.value)} type="text" />
                    <button onClick={() => {
                    solve(currentChallenge-1, key)}}>Submit</button>
                </div>
            </div>
        );
    }

    return (
        <Page>
            {safeOpen && <Safe />}
            {modal !== 0  && <SafeModal a={modal} />}
            <a href="/home" style={{color: "white", alignSelf: 'baseline', marginLeft: 25}}>← Back</a>
            <div style={{display: "flex"}}>
                <p onClick={() => {if(progress[0] && progress[1] && progress[2]) {setSafeOpen(true)}}} style={{height: 10, fontWeight: 700, transform: 'rotate(-30deg)', position: "relative", top: 250, left: 240, cursor: 'pointer', fontSize: '0.5rem', zIndex: 10}}>Open the safe</p>
                <img src={'../../assets/images/cryptographyroom.jpg'} height={600}>
                {/* <object data={roomImage} type="image/svg+xml" height={600}> */}
                </img>
                <img src={'../../assets/images/Safe.svg'} style={{position: "relative", right: 450, top: 225}} height={150}></img>
                <div 
                    className="interactable" onClick={() => setModal(currentChallenge)}
                    style={{position: "relative", top: 280, right: 480, width: 30, height: 25}}>
                    <img  src={'../../assets/images/Knob.svg'} height={22}></img>
                    {/* <object  data={knob} type="image/svg+xml" height={22}></object> */}
                </div>
                <div 
                    className="interactable" onClick={() => setModal(currentChallenge)}
                    style={{position: "relative", top: 307, right: 510, width: 30, height: 25}}>
                    <img  src={'../../assets/images/Knob.svg'} height={22}></img>
                </div>
                <div 
                    className="interactable" onClick={() => setModal(currentChallenge)}
                    style={{position: "relative", top: 335, right: 540, width: 30, height: 25}}>
                    <img  src={'../../assets/images/Knob.svg'} height={22}></img>
                </div>
            </div>

        </Page>
    );
}
