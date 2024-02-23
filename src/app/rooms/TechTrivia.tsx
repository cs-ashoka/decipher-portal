import React, { useEffect } from 'react';
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

const BACKEND_URL = 'https://decipher-backend.onrender.com';

export default function TriviaRoom() {
  const { userID } = useAuth();
  const [stage, setStage] = React.useState(1);
  const questions = [q1, q2, q3, q4, q5, q6];
  const [answer, setAnswer] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [solved, setSolved] = React.useState(false);

  const getStageNumber = () => {
    axios
      .post(`${BACKEND_URL}/play/1`, {
      }, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        if (res.data) {
          setStage((stage) => res.data.challengeNumber + 1);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_BAD_REQUEST") navigate("/home")
      });
  };

  useEffect(() => {
    setLoading(true)
    getStageNumber()
    console.log("effect")
  }, []);
  // getStageNumber();
  console.log(stage)

  const navigate = useNavigate();

  function submit() {
    axios
      .post(`${BACKEND_URL}/play/1/solve`, {
        challengeNumber: stage - 1,
        auth: userID,
        answer: answer,
      }, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          if (stage == 5) setSolved(true);
          getStageNumber()
          // setStage((stage) => stage + 1);
          setAnswer('');
        }
        if (solved) {
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
      {stage && !loading && (
        <>
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
