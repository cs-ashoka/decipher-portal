import React, { useState, useEffect, useRef} from 'react';

import restro from "../assets/images/restro.jpg";

import upIdle from "../assets/images/up_idle.png";
import upWalkRight from "../assets/images/up_walk_right.png";
import upWalkLeft from "../assets/images/up_walk_left.png";
import leftIdle from "../assets/images/left_idle.png";
import leftWalkRight from "../assets/images/left_walk_right.png";
import rightIdle from "../assets/images/right_idle.png";
import rightWalkRight from "../assets/images/right_walk_right.png";
import downIdle from "../assets/images/down_idle.png";
import downWalkRight from "../assets/images/down_walk_right.png";
import debuggingRoom from "../assets/images/debuggingRoom.png";
import cryptoRoom from "../assets/images/cryptoRoom.png";
import dsaRoom from "../assets/images/dsaRoom.png";
import generalRoom from "../assets/images/generalRoom.png";
import {useNavigate} from "react-router-dom";
import blackImage from "../assets/images/blackImage.png";
import Page from './Page';

const HomePage = () => {
  const width = window.innerWidth/4 + window.innerWidth/8;
  const height = width;
  const [rectPosition, setRectPosition] = useState({ x: width/2, y: height/2 });
  const [playerSprite, setPlayerSprite] = useState(upIdle)

  const navigate = useNavigate();

  const [dRoom, setdRoom] = useState(debuggingRoom);
  const [DSARoom, setDSARoom] = useState(dsaRoom);
  const [gRoom, setgRoom] = useState(generalRoom);
  const [cRoom, setcRoom] = useState(cryptoRoom);
  

  const xPosRef = useRef(rectPosition.x);
  const yPosRef = useRef(rectPosition.y);

  useEffect(() => {
    xPosRef.current = rectPosition.x;
    yPosRef.current = rectPosition.y;
  }, [rectPosition]);


  // ADD PAGE ROUTE LOGIC.
  function navigateTo(page: any) {
    navigate(`/${page}`);
  }

  // Will replace a room with a black image to signify that it is complete. Player will still be able to enter doorway because this is not saved in a bool so will have to call multiple times for each finished room.
  function finishedRoom(room: any) {
    if (room === "c") {
      setcRoom(blackImage);
    } else if (room === "d") {
      setdRoom(blackImage);
    } else if (room === "dsa") {
      setDSARoom(blackImage);
    } else if (room === "g") {
      setgRoom(blackImage);
    }
  }

  //this is very bad code but i had 2 hours

  //checking collision with room walls
  function collidingWithCrypto(x:any, y:any) {
    return ((x) < (width/2 - sizeDiff)) && (((y) < (width/2 - 120)));
  }

  function collidingWithDebug(x:any, y:any) {
    return ((x) < (width/2 - sizeDiff)) && (((y) > (height/2 +40)));
  }

  function collidingWithGeneral(x:any, y:any) {
    return ((x > (width/2 + sizeDiff - 40)) && (y > (height/2 + 40)));
  }

  function collidingWithTable(x:any, y:any) {
    //first table
    y = y+40
    x= x+40

    const sf = width / 1000;

    let newX = (570) * sf;
    let newY = (330) * sf;
    const newSize = 150 * sf;

    const t1 :boolean = (x > newX) && (x < (newX + newSize)) && (y > newY) && (y < (newY + newSize));



    newX = 215 * sf;
    newY = 470 * sf;
    x = x- 20;
    const t2 :boolean = (x > newX) && (x < (newX + newSize)) && (y > newY) && (y < (newY + newSize));

    return t1 || t2;

  }

  //checking if entering room door
  function enteringDoorway(x:any, y:any) {
    if (collidingWithDebug(x,y)) {
      {
        return navigateTo("3");
      }
    } else if (collidingWithCrypto(x, y)) {
      {
        return navigateTo("2");
      }
    } else if (collidingWithGeneral(x, y)) {
      {
        return navigateTo("1");
      } 
    }
  }

    const stepSize = 10;

    //walking logic. uses arrow keys.
  const handleKeyDown = (e:KeyboardEvent) => {
    enteringDoorway(xPosRef.current, yPosRef.current);
    
    if (e.key === 'ArrowLeft') {
      if (xPosRef.current > 0 && !collidingWithCrypto(xPosRef.current, yPosRef.current) && !collidingWithDebug(xPosRef.current, yPosRef.current)) {
          if (collidingWithTable(xPosRef.current - stepSize, yPosRef.current)) {
              setRectPosition(prev => ({ x: prev.x + stepSize, y: prev.y }));
          } else {
              setRectPosition(prev => ({ x: prev.x - stepSize, y: prev.y }));
          }
      }
  }
  if (e.key === 'ArrowRight') {
      if (xPosRef.current < width - 50 && !collidingWithGeneral(xPosRef.current, yPosRef.current)) {
          if (collidingWithTable(xPosRef.current + stepSize, yPosRef.current)) {
              setRectPosition(prev => ({ x: prev.x - stepSize, y: prev.y }));
          } else {
              setRectPosition(prev => ({ x: prev.x + stepSize, y: prev.y }));
          }
      }
  }
  if (e.key === 'ArrowUp') {
      if (yPosRef.current > 0 && !collidingWithCrypto(xPosRef.current, yPosRef.current)) {
          if (collidingWithTable(xPosRef.current, yPosRef.current - stepSize)) {
              setRectPosition(prev => ({ x: prev.x, y: prev.y + stepSize }));
          } else {
              setRectPosition(prev => ({ x: prev.x, y: prev.y - stepSize }));
          }
      }
  }
  if (e.key === 'ArrowDown') {
      if (yPosRef.current < height - 50 && !collidingWithDebug(xPosRef.current, yPosRef.current) && !collidingWithGeneral(xPosRef.current, yPosRef.current)) {
          if (collidingWithTable(xPosRef.current, yPosRef.current + stepSize)) {
              setRectPosition(prev => ({ x: prev.x, y: prev.y - stepSize }));
          } else {
              setRectPosition(prev => ({ x: prev.x, y: prev.y + stepSize }));
          }
      }
  }
  
    
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const animationState = useRef(-1);
  const rightAnimState = useRef(0);
  const leftAnimState = useRef(0);
  const downAnimState = useRef(0);

  const rightCycle = useRef([rightWalkRight, rightIdle, rightWalkRight]);
  const leftCycle = useRef([leftWalkRight, leftIdle, leftWalkRight]);
  const downCycle = useRef([downWalkRight, downIdle, downWalkRight]);
  
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        if (animationState.current < 0) {
          setPlayerSprite(upWalkLeft);
          animationState.current = animationState.current + 1;
        } else if (animationState.current === 0){
          setPlayerSprite(upIdle);
          animationState.current = animationState.current +1;
        } else {
          setPlayerSprite(upWalkRight);
          animationState.current = -1;
        }
      } else if (event.key === "ArrowRight") {
        setPlayerSprite(rightCycle.current[rightAnimState.current])
        rightAnimState.current = (rightAnimState.current +1) % 3;
      } else if (event.key === "ArrowLeft") {
        setPlayerSprite(leftCycle.current[leftAnimState.current])
        leftAnimState.current = (leftAnimState.current +1) % 3;
      } else if (event.key === "ArrowDown") {
        setPlayerSprite(downCycle.current[downAnimState.current])
        downAnimState.current = (downAnimState.current +1) % 3;
      }
    };

    document.addEventListener('keydown', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyUp);
    };
  }, []);




  const sizeDiff = 100;

  //ignore the following, for debugging purposes
  function renderGrid() {
    let grid = [];
    for (let i = 0; i < width; i += 100) {
      for (let j = 0; j < height; j += 100) {
        grid.push(
          <div
            style={{
              width: '5px',
              height: '5px',
              backgroundColor: 'red',
              position: 'absolute',
              left: i + 'px',
              top: j + 'px',
            }}
            >{i}</div>
          
        );
      }
    }
    return grid;
  }

  const g = renderGrid();


  function drawSquare(x: number, y: number, side: number) {
    return (
      <div
        style={{
          width: side + 'px',
          height: side + 'px',
          backgroundColor: 'transparent',
          border: '2px solid red',
          position: 'absolute',
          left: x + 'px',
          top: y + 'px',
        }}
      />
    );
  }
  const ogX = 500 + 70;
  const ogY = 500 - 170;
  const ogSize = 150;

  const sf = width / 1000;

  const newX = ogX * sf;
  const newY = ogY * sf;
  const newX2 = 215 * sf;
  const newY2 = 470 * sf;
  const newSize = ogSize * sf;

  return (
    <Page>
    <div
      style={{
        backgroundImage: `url(${restro})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
        width: width +"px",
        height: height + "px",
        position: 'relative',
      }}
    >

      <div
      style={
        {
          backgroundImage: `url(${dRoom})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: (width/2 - sizeDiff) + "px",
          width: (width/2 - sizeDiff) + "px",
          height : (width/2 - sizeDiff) + "px",
          position: 'absolute',
          left: 0 + "px",
          top: ((height/2 + sizeDiff)) + "px"
        }
      }
      >
      </div>

      <div
      style={
        {
          backgroundImage: `url(${cRoom})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: (width/2 - sizeDiff) + "px",
          width: (width/2 - sizeDiff) + "px",
          height : (width/2 - sizeDiff) + "px",
          position: 'absolute',
          left: 0 + "px",
          top: 0 + "px"
        }
      }
      >
      </div>

      <div
      style={
        {
          backgroundImage: `url(${gRoom})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: (width/2 - sizeDiff) + "px",
          width: (width/2 - sizeDiff) + "px",
          height : (width/2 - sizeDiff) + "px",
          position: 'absolute',
          left: (width/2 + sizeDiff) + "px",
          top: ((height/2 + sizeDiff)) + "px"
        }
      }
      >
      </div>
      <div
        style={{
          backgroundImage: `url(${playerSprite})`,
          backgroundSize: '50px',
          backgroundRepeat: 'no-repeat',
          width: '50px',
          height: '50px',
          position: 'absolute',
          left: rectPosition.x + 'px',
          top: rectPosition.y + 'px',
        }}
      />
    </div>


    </Page>
  );
};

export default HomePage;
