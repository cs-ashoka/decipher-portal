import React, { useState, useEffect, useRef} from 'react';

import floorTiles from  "../assets/images/floorTile.png";
import restro from "../assets/images/restro.jpg";

import upIdle from "../assets/images/up_idle.png";
import upWalkRight from "../assets/images/up_walk_right.png";
import upWalkLeft from "../assets/images/up_walk_left.png";
import leftIdle from "../assets/images/left_idle.png";
import leftWalkRight from "../assets/images/left_walk_right.png";
import leftWalkLeft from "../assets/images/left_walk_left.png";
import rightIdle from "../assets/images/right_idle.png";
import rightWalkRight from "../assets/images/right_walk_right.png";
import rightWalkLeft from "../assets/images/right_walk_left.png";
import downIdle from "../assets/images/down_idle.png";
import downWalkRight from "../assets/images/down_walk_right.png";
import downWalkLeft from "../assets/images/down_walk_left.png";

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
    return ((x) < (width/2 - 50)) && (((y) < (width/2 - 80)));
  }

  function collidingWithDebug(x:any, y:any) {
    return ((x) < (width/2 - 60)) && (((y) > (height/2)));
  }

  function collidingWithGeneral(x:any, y:any) {
    return ((x > (width/2 + 10)) && (y > (height/2)));
  }

  function collidingWithTable(x:any, y:any) {

    //return (  ((x > width/2) && (x < width/2 +200 ))  && ( (y < height/2) && (y > height/2-200)  )  )
    return(false);
  }

  //checking if entering room door
  function enteringDoorway(x:any, y:any) {
    if (collidingWithDebug(x,y)) {
      if ( (y > (height/2 + height * 0.1290)) && (y < (height/2 + height * 0.2580)) ) {
        return navigateTo("3");
      }
    } else if (collidingWithCrypto(x, y)) {
      if ((y > (height/2 - 80 - height * 0.3010)) && (y < (height/2 - 80 - height * 0.1720))) {
        return navigateTo("2");
      }
    } else if (collidingWithGeneral(x, y)) {
      if ( (y > height/2 + height * 0.1720) && (y < height /2 + height * 0.301)) {
        return navigateTo("1");
      } 
    }
  }

    const stepSize = 10;

    //walking logic. uses arrow keys.
  const handleKeyDown = (e:KeyboardEvent) => {
    enteringDoorway(xPosRef.current, yPosRef.current);
    
      if (e.key === 'ArrowLeft') {
        if ((xPosRef.current > 0) && !(collidingWithCrypto(xPosRef.current, yPosRef.current)) && !(collidingWithDebug(xPosRef.current, yPosRef.current)) && !(collidingWithTable(xPosRef.current, yPosRef.current))) {
            setRectPosition((prev) => ({ x: prev.x - stepSize, y: prev.y }));
        }
      }
      if  (e.key === 'ArrowRight') {
        if ((xPosRef.current < width- 50) && !(collidingWithGeneral(xPosRef.current, yPosRef.current)) && !(collidingWithTable(xPosRef.current, yPosRef.current))) {
            setRectPosition((prev) => ({ x: prev.x + stepSize, y: prev.y }));
        }
      }
      if  (e.key === 'ArrowUp') {
        if ((yPosRef.current > 0) && !(collidingWithCrypto(xPosRef.current, yPosRef.current)) && !(collidingWithTable(xPosRef.current, yPosRef.current))) {
            setRectPosition((prev) => ({ x: prev.x, y: prev.y - stepSize }));
        }
      }
      if  (e.key === 'ArrowDown') {
        if ((yPosRef.current < height - 50) && !(collidingWithDebug(xPosRef.current, yPosRef.current)) && !(collidingWithGeneral(xPosRef.current, yPosRef.current)) && !(collidingWithTable(xPosRef.current, yPosRef.current))) {
            setRectPosition((prev) => ({ x: prev.x, y: prev.y + stepSize }));
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
          backgroundSize: (width/2 - 50) + "px",
          width: (width/2 - 50) + "px",
          height : (width/2 - 50) + "px",
          position: 'absolute',
          left: 0 + "px",
          top: ((height/2 + 50)) + "px"
        }
      }
      >
      </div>

      <div
      style={
        {
          backgroundImage: `url(${cRoom})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: (width/2 - 50) + "px",
          width: (width/2 - 50) + "px",
          height : (width/2 - 50) + "px",
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
          backgroundSize: (width/2 - 50) + "px",
          width: (width/2 - 50) + "px",
          height : (width/2 - 50) + "px",
          position: 'absolute',
          left: (width/2 + 50) + "px",
          top: ((height/2 + 50)) + "px"
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
