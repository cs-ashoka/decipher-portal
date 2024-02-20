import React from 'react';
import Page from '../Page';
import q1 from '../../assets/images/trivia-1.png';
import q2 from '../../assets/images/trivia-2.png';
import q3 from '../../assets/images/trivia-3.png';
import q4 from '../../assets/images/trivia-4.png';
import q5 from '../../assets/images/trivia-5.png';
import q6 from '../../assets/images/trivia-6.png';

import axios from 'axios';
import { useAuth } from '../app';
import { useNavigate } from 'react-router-dom';

export default function TriviaRoom() {
  const { userID } = useAuth();
  const [stage, setStage] = React.useState(1);
  const questions = [q1, q2, q3, q4, q5, q6];
  const [answer, setAnswer] = React.useState('');

  const getStageNumber = () => {
    axios
      .post(`http://decipher-backend.vercel.app/play/1`, {
        auth: userID,
      })
      .then((res) => {
        if (res.data) {
          setStage((stage) => res.data.challengeNumber);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();

  function submit() {
    axios
      .post(`http://decipher-backend.vercel.app/play/1/solve`, {
        challengeNumber: stage,
        auth: userID,
        answer: answer,
      }, {
        withCredentials: true
      })
      .then((res) => {
        if (res.data) {
          setStage((stage) => stage + 1);
          setAnswer('');
        }
        if (stage == 6) {
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Page>
      <a
        href="/home"
        style={{ color: 'white', alignSelf: 'baseline', marginLeft: 25 }}
      >
        ← Back
      </a>
      {stage && (
        <>
          <h3>Guess Who</h3>
          <img src={questions[stage - 1]} alt="" width={400} />
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            onClick={() => submit()}
            style={{
              padding: '5px 20px',
              backgroundColor: '#159955',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 500,
              color: '#FFF',
              fontSize: '1rem',
            }}
          >
            Submit
          </button>
        </>
      )}
    </Page>
  );
}
