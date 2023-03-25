import React from "react";
import Page from "../Page";
import elon from '../../assets/images/ElonMusk.png'
import jeff from '../../assets/images/JeffBezos.png'
import evan from '../../assets/images/EvanSpiegel.png'
import marissa from '../../assets/images/MarissaMayer.png'
import axios from "axios";
import { useAuth } from "../app";
import { useNavigate } from "react-router-dom";

export default function TriviaRoom() {
    const {userID } = useAuth()
    const [stage, setStage] = React.useState(1);
    const questions = [elon, evan, marissa, jeff]
    const [answer, setAnswer] = React.useState('');

    const getStageNumber = () => {
        axios.post(`https://decipher-backend.vercel.app/play/1`,
        {
            auth: userID
        }
        ).then((res) => {
            if (res.data) {
                setStage(stage => res.data.challengeNumber);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const navigate = useNavigate()



    function submit() {
        axios.post(`https://decipher-backend.vercel.app/play/1/solve`, {
            challengeNumber: stage,
            auth: userID,
            answer: answer
        }).then((res) => {
            if (res.data) {
                setStage(stage => stage+1);
                setAnswer('');
            } 
            if (stage == 4) {
                navigate('/home')
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Page>
            <a href="/home" style={{color: "white", alignSelf: 'baseline', marginLeft: 25}}>← Back</a>
            {stage && <>
            <h3>Guess Who</h3>
            <img src={questions[stage-1]} alt="" width={400} />
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <button onClick={() => submit()}
            style={{
                padding: '5px 20px', backgroundColor: '#159955', border: 'none', borderRadius: '5px', fontWeight: 500, 
                color: '#FFF', fontSize: '1rem'}}
            >Submit</button>
            </>}
        </Page>
    );
}