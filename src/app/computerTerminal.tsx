import { Fragment, useEffect, useState } from 'react';
import computerScreen from '../assets/images/computer.png';
import { questionsText } from 'src/assets/text/code';
import Page from './Page';
import { useAuth } from './app';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Computer = () => {
  const [levelStage, setStage] = useState(0);
  //   const [terminalMode, setTerminalMode] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  //   const [thing, setThing] = useState('');
  const [error, setError] = useState('');

  const text = [
    'Starting up computer...\nBIOS version 1.0.0\nCritical error at 0x10020.\nPress <Enter> to continue.',
    'Logging in user...\nDefault user logged in.\nError: STDTYPERR\nPress <Enter> to continue.',
    'Loading in file system.\nDecrypting files...\nError: INT_BUFFER_OVERFLOW\nPress <Enter> to continue.',
    'Opening terminal...\nError: TERMINAL_NOT_FOUND\nPress <Enter> to continue.',
  ];
  const navigate = useNavigate();

  const { userID } = useAuth();

  //   function submit() {
  //     console.log(textAreaValue);
  //     setStage((levelStage) => levelStage + 1);
  //     setTextAreaValue('');
  //   }

  function submit() {
    setError('');

    axios
      .post(`https://decipher-backend.vercel.app/play/3/solve`, {
        challengeNumber: levelStage,
        auth: userID,
        answer: textAreaValue,
      })
      .then((res) => {
        if (res.data) {
          setStage((stage) => stage + 1);
          setTextAreaValue('');
        }
        // if (stage == 4) {
        //   navigate('/home');
        // }
      })
      .catch((err: any) => {
        console.log(JSON.stringify(err));
        setError(err);
        // setStage((stage) => stage + 1);
      });
  }

  useEffect(() => {
    if (levelStage === questionsText.length) {
      navigate('/home');
    }
  }, [levelStage]);

  return (
    <Page>
      <a
        href="3"
        style={{ color: 'white', alignSelf: 'baseline', marginLeft: 25 }}
      >
        ← Back to room
      </a>
      <div>
        <div className="question">
          <span
            style={{
              backgroundColor: '#159955',
              padding: '0px 5px',
              marginRight: '5px',
              borderRadius: '5px',
            }}
          >
            Problem
          </span>
          <br />
          {questionsText[levelStage].problem.split('\n').map((text) => (
            <p key={text} style={{ margin: '0px', marginTop: '10px' }}>
              {text}
            </p>
          ))}
        </div>

        <br />

        {questionsText[levelStage].hint && (
          <p className="question">
            <span
              style={{
                backgroundColor: '#15995599',
                padding: '0px 5px',
                marginRight: '5px',
                borderRadius: '5px',
              }}
            >
              Hint
            </span>
            {questionsText[levelStage].hint}
          </p>
        )}
      </div>
      <div
        style={{
          width: '450px',
          height: '450px',
          display: 'flex',
          backgroundImage: `url(${computerScreen})`,
          backgroundSize: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: 'black',
            marginBottom: 30,
            height: '230px',
            width: '310px',
            color: '#23AF46',
            fontSize: '0.75rem',
            resize: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              backgroundColor: 'black',
              margin: 4,
              color: '#23AF46',
              fontSize: '0.75rem',
              resize: 'none',
              border: 'none',
              textAlign: 'center',
            }}
          >
            // Write answer below
          </p>
          <textarea
            value={textAreaValue}
            onChange={(e) => {
              setTextAreaValue(e.target.value.replace('"', "'"));
            }}
            name=""
            id=""
            style={{
              backgroundColor: 'black',
              marginBottom: 30,
              width: '310px',
              color: '#23AF46',
              fontSize: '0.75rem',
              resize: 'none',
              border: 'none',
              flexGrow: 1,
            }}
          ></textarea>
        </div>
      </div>
      {
        //@ts-ignore
        error && <p style={{ margin: 0, color: 'red' }}>{error?.message}</p>
      }
      <p style={{ textAlign: 'center', margin: '0 10px', fontSize: '0.9rem' }}>
        Type in your answer. You get unlimited tries, but a lesser amount of
        tries will put you higher on the leaderboard. Make sure you click off
        the button before pressing enter.
      </p>

      <button
        onClick={() => {
          submit();
        }}
        style={{
          padding: '5px 20px',
          backgroundColor: '#159955',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 500,
          fontFamily: 'IBM Plex Sans JP',
          color: '#FFF',
          fontSize: '1rem',
        }}
      >
        Submit
      </button>
    </Page>
  );
};

export default Computer;
