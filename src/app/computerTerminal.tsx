import { useEffect, useState } from 'react';
import computerScreen from '../assets/images/computer.png';
import Page from './Page';
import { useAuth } from './app';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'https://decipher-backend.vercel.app';

type Question = {
  question: string;
  hint: string;
  roomNumber: number;
  challengeNumber: number;
};

const Computer = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [error, setError] = useState('');

  const [questionsText, setQuestionsText] = useState<{
    loading: boolean;
    error: boolean;
    data?: Question;
  }>({ loading: true, error: false, data: undefined });

  const fetchNext = () => {
    axios
      .post(`${BACKEND_URL}/play/3`, {}, { withCredentials: true })
      .then((res) => {
        setQuestionsText({ loading: false, error: false, data: res.data });
      })
      .catch((err) => {
        // if (levelStage === questionsText.data.length) {
        //   navigate('/home');
        // }
        console.log(err);
        setQuestionsText({ loading: false, error: true, data: undefined });
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  const navigate = useNavigate();

  const { userID } = useAuth();

  useEffect(() => {
    if (!questionsText.data) {
      return;
    }
  }, [questionsText]);

  function submit() {
    setError('');

    axios
      .post(
        `${BACKEND_URL}/play/3/solve`,
        {
          challengeNumber: questionsText.data?.challengeNumber,
          auth: userID,
          answer: textAreaValue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data) {
          fetchNext();

          // setStage((stage) => stage + 1);
          setTextAreaValue('');
        }
      })
      .catch((err: any) => {
        console.log(JSON.stringify(err));
        setError(err);
        // setStage((stage) => stage + 1);
      });
  }

  if (questionsText.loading) {
    return <Page>Loading...</Page>;
  }

  if (questionsText.error) {
    return <Page>Error loading questions</Page>;
  }

  if (!questionsText.data) {
    return <Page>Error loading questions</Page>;
  }

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
          {questionsText.data.question.split('\n').map((text) => (
            <p key={text} style={{ margin: '0px', marginTop: '10px' }}>
              {text}
            </p>
          ))}
        </div>

        <br />

        {questionsText.data.hint && (
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
            {questionsText.data.hint}
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
        error && <p style={{ margin: 0, color: 'red' }}>Wrong answer!</p>
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
