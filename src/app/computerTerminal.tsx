import { wrap } from "module";
import React, { useEffect, useState } from "react";
import computerScreen from "../assets/images/computer.png"
import { questions } from "src/assets/text/code";

const Computer = () => {
    const [computerOn, setComputerOn] = useState(false);
    const [levelStage, setStage] = useState(0);
    const [terminalMode, setTerminalMode] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [thing, setThing] = useState('');

    const text = [
        'Starting up computer...\nBIOS version 1.0.0\nCritical error at 0x10020.\nPress any key to continue.',
    ]

    const eventHandler = (e: any) => {
        if (e.key === 'Enter') {
            setTerminalMode(true);
            setTextAreaValue(questions[levelStage]);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', eventHandler);
        return () => {
            window.removeEventListener('keydown', eventHandler);
        }
    }, []);

    return(
        <div>
            <img src={computerScreen} style={{width: '682px', height: '512px'}}/>
            <p style={{backgroundColor: "black", color: '#23AF46', position: "absolute", left: (window.innerWidth/2)-239, top: (window.innerHeight/2)-160, width: '468px', wordWrap: 'normal', paddingLeft: 10}}>
                {text[levelStage]}
            </p>
            <input type="text" value={thing} onChange={() => setThing(value => value)} />
            {terminalMode && <textarea value={textAreaValue} onChange={() => {setTextAreaValue(value => value);console.log('he')}} name="" id="" cols={58} rows={17} style={{backgroundColor: "black", color: '#23AF46', position: "absolute", left: (window.innerWidth/2)-239, top: (window.innerHeight/2)-160, resize: "none"}}></textarea>}
        </div>
    );
}


export default Computer;