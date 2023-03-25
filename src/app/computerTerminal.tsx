import React, { useEffect, useState } from "react";
import computerScreen from "../assets/images/computer.png"
import { questionsCodes, questionsText, solutions } from "src/assets/text/code";
import Page from "./Page";
import axios from "axios";
import { useAuth } from "./app";

const Computer = () => {
    const [levelStage, setStage] = useState(0);
    const [terminalMode, setTerminalMode] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [thing, setThing] = useState('');

    const text = [
        'Starting up computer...\nBIOS version 1.0.0\nCritical error at 0x10020.\nPress <Enter> to continue.',
        'Logging in user...\nDefault user logged in.\nError: STDTYPERR\nPress <Enter> to continue.',
        'Loading in file system.\nDecrypting files...\nError: INT_BUFFER_OVERFLOW\nPress <Enter> to continue.',
        'Opening terminal...\nError: TERMINAL_NOT_FOUND\nPress <Enter> to continue.',

    ]

    const {userID} = useAuth()

    const eventHandler = (e: any) => {
        if (e.key === 'Enter' && !terminalMode) {
            setTerminalMode(terminalMode => true);
            setTextAreaValue(questionsCodes[levelStage]);
            console.log(levelStage);
        }
    }
    
    function submit() {
        console.log(textAreaValue);
        if (terminalMode) {
            setStage(levelStage => levelStage+1);
            setTerminalMode(terminalMode => false);
            setTextAreaValue('');
        }
    }

    useEffect(() => {
        if (!terminalMode) {
            window.addEventListener('keydown', eventHandler);
            return () => {
                window.removeEventListener('keydown', eventHandler);
            }
        }
    }, [levelStage, terminalMode]);

    return(
        <Page>
            <a href="3" style={{color: "white", alignSelf: 'baseline', marginLeft: 25}}>← Back to room</a>
            <div>
            {terminalMode && <p className="question">
                <span style={{backgroundColor: '#159955', padding: '0px 5px', marginRight: '5px', borderRadius: '5px'}}>Problem</span>{questionsText[levelStage].problem}</p>}
            <br />
            {terminalMode && <p className="question">
                <span style={{backgroundColor: '#15995599', padding: '0px 5px', marginRight: '5px', borderRadius: '5px'}}>Hint</span>{questionsText[levelStage].hint}</p>}
            </div>
            <div style={{width: '450px', height: '450px', display: 'flex', backgroundImage: `url(${computerScreen})`, backgroundSize: 'cover', justifyContent: "center", alignItems: 'center'}}>
                {!terminalMode && <p style={{fontFamily: 'monospace',
                    height: '230px', color: '#23AF46', width: '310px', wordWrap: 'normal', marginBottom: 40, fontSize: '0.75rem'}}>
                    {text[levelStage]}
                </p>}
                {terminalMode && 
                    <textarea value={textAreaValue} onChange={(e) => {setTextAreaValue(e.target.value.replace('"', "'"))}} 
                    name="" id=""
                    style={{
                        backgroundColor: "black", 
                        marginBottom: 30,
                        height: '230px', width: '310px',
                        color: '#23AF46', 
                        fontSize: '0.75rem',
                        resize: "none",
                        border: "none"
                        }}>
                    </textarea>}
            </div>
            <p style={{textAlign: 'center', margin: '0 10px', fontSize: '0.9rem'}}>Make the required changes to your code in the editor above itself, and click on the button below when you're done. You get unlimited tries, but a lesser amount of tries will put you higher on the leaderboard. Make sure you click off the button before pressing enter.</p>
            <button 
                onClick={() => {submit()}}
                style={{
                padding: '5px 20px', backgroundColor: '#159955', border: 'none', borderRadius: '5px', fontWeight: 500, 
                fontFamily: 'IBM Plex Sans JP', color: '#FFF', fontSize: '1rem'}}>
                    Submit
            </button>
        </Page>
    );
}


export default Computer;