import React, { useState, useEffect } from 'react';
import Page from '../Page';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'https://decipher-backend.onrender.com';

export default function CryptographyRoom() {
  const [currentChallenge, setCurrentChallenge] = useState(1);
  const [modal, setModal] = React.useState(0);
  const [safeOpen, setSafeOpen] = React.useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [solved, setSolved] = useState(false);

  const solve = (i: number, answer: string) => {
    console.log(i, answer);
    axios
      .post(
        `${BACKEND_URL}/play/2/solve/`,
        {
          challengeNumber: i,
          answer: answer,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(i);
        if (res.data) {
          setModal(0);
          // setCurrentChallenge(currentChallenge + 1);
          //             console.log(currentChallenge)
          if (i == 3) {
            setSafeOpen(false);
            navigate('/home');
          }
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  function Safe() {
    const [key, setKey] = useState('');
    const [question, setQuestion] = useState('');

    useEffect(() => {
      const fetchQuestion = async () => {
        try {
          const response = await axios.post(
            `${BACKEND_URL}/play/2`,
            {},
            { withCredentials: true }
          );
          setQuestion(response.data.question);
          setError(false);
        } catch (error) {
          setQuestion('Failed to fetch question');
        }
      };

      fetchQuestion();
    }, []);
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 20,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          backgroundColor: '#00000099',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '20px',
            width: '50%',
            color: 'black',
            height: 'fit-content',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div onClick={() => setSafeOpen(false)} style={{ cursor: 'pointer' }}>
            Close
          </div>
          <div style={{ display: error ? 'block' : 'none', margin: 5 }}>
            Incorrect answer
          </div>
          <h3 style={{ margin: 5 }}>{question}</h3>
          <input
            style={{ margin: 5 }}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="text"
          />
          <button
            style={{ margin: 5 }}
            onClick={() => {
              solve(currentChallenge, key);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  function SafeModal({ a }: { a: number }) {
    const [key, setKey] = useState('');
    const [question, setQuestion] = useState('');
    setError(false);

    useEffect(() => {
      const fetchQuestion = async () => {
        try {
          const response = await axios.post(
            `${BACKEND_URL}/play/2`,
            {},
            { withCredentials: true }
          );
          console.log(response);
          setQuestion(response.data.question);
          setCurrentChallenge(response.data.challengeNumber);
          if (currentChallenge == 3) {
            setWarning(true);
          }
        } catch (error: any) {
          if (error.code === 'ERR_BAD_REQUEST') {
            setQuestion('You have already solved this challenge');
            setSolved(true);
          } else setQuestion('Failed to fetch question');
        }
      };

      fetchQuestion();
    }, []);

    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 20,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          backgroundColor: '#00000099',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '20px',
            width: '50%',
            color: 'black',
            height: 'fit-content',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div onClick={() => setModal(0)} style={{ cursor: 'pointer' }}>
            Close
          </div>
          <div
            style={{
              color: 'red',
              display: error ? 'block' : 'none',
              margin: 0,
            }}
          >
            Incorrect answer
          </div>
          <div
            style={{
              color: 'red',
              display: warning ? 'block' : 'none',
              margin: 0,
            }}
          >
            Open the safe
          </div>
          <h3 style={{ display: warning ? 'none' : 'block', margin: 5 }}>
            {question}
          </h3>
          <input
            style={{ display: warning || solved ? 'none' : 'block', margin: 5 }}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="text"
          />
          <button
            style={{ display: warning || solved ? 'none' : 'block', margin: 5 }}
            onClick={() => {
              solve(currentChallenge, key);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <Page>
      {safeOpen && <Safe />}
      {modal !== 0 && <SafeModal a={modal} />}
      <a
        href="/home"
        style={{ color: 'white', alignSelf: 'baseline', marginLeft: 25 }}
      >
        ← Back
      </a>
      <div style={{ display: 'flex' }}>
        <p
          onClick={() => {
            if (currentChallenge == 3) {
              setSafeOpen(true);
            }
          }}
          className={safeOpen ? 'interactable' : ''}
          style={{
            height: 10,
            fontWeight: 700,
            transform: 'rotate(-30deg)',
            position: 'relative',
            top: 250,
            left: 240,
            cursor: 'pointer',
            fontSize: '0.5rem',
            zIndex: 10,
          }}
        >
          Open the safe
        </p>
        <img src={'../../assets/images/cryptographyroom.jpg'} height={600}>
          {/* <object data={roomImage} type="image/svg+xml" height={600}> */}
        </img>
        <img
          src={'../../assets/images/Safe.svg'}
          style={{ position: 'relative', right: 450, top: 225 }}
          height={150}
        ></img>
        <div
          className="interactable"
          onClick={() => setModal(currentChallenge)}
          style={{
            position: 'relative',
            top: 307,
            right: 480,
            width: 30,
            height: 25,
          }}
        >
          <img src={'../../assets/images/Knob.svg'} height={22}></img>
        </div>
      </div>
    </Page>
  );
}
