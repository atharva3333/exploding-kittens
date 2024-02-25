import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUsername, setUsername } from '../features/user/userSlice';
import "../Board.css";
import UsernamePopup from "./UsernamePopup";
import axios from 'axios';
// import Navbar from './components/Navbar';
// import Highscore from './components/Highscore';

function GameBoard() {
  const [deck, setDeck] = useState([]);
  const [diffuseCardCount, setDiffuseCardCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [explodeAction, setExplodeAction] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardIsShowing, setCardIsShowing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userscore, setUserScore] = useState([]);
  const prevGameWonRef = useRef();

  const dispatch = useDispatch();
  const reduxUsername = useSelector(selectUsername);

  useEffect(() => {
    const username = localStorage.getItem('username');
  
    if (username) {
      // Set the username to Redux
      dispatch(setUsername(username));
      // Close the popup
      setShowPopup(false);
    } else {
      // If username is not available in local storage, show the popup
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log(username, "username from useEffect");
    if(username){
      axios.get(`http://localhost:8080/highscore/${username}`)
      .then(response => {
        setUserScore(response.data);
      })
      .catch(error => {
        console.error('Error fetching high scores:', error);
      });
    }
    
  }, [userscore, reduxUsername]);

  useEffect(() => {
    if (!prevGameWonRef.current && gameWon) {
      axios.post('http://localhost:8080/highscore', {
        username: reduxUsername,
        highscore: userscore.highscore + 1
      })
        .then(response => {
          // Handle success if needed
          console.log('High score set successfully:', response.data);
        })
        .catch(error => {
          console.error('Error setting high score:', error);
        });
  
      prevGameWonRef.current = true;
    } else {
      prevGameWonRef.current = false;
    }
  }, [gameWon]);

  

  const initializeDeck = () => {
    const cards = [
      { cardName: "Cat card", cardTitle: "first card title" },
      { cardName: "Defuse card", cardTitle: "second card title" },
      { cardName: "Exploding kitten card", cardTitle: "third card title" },
      { cardName: "Cat card", cardTitle: "forth card title" },
      { cardName: "Shuffle card", cardTitle: "forth card title" },
    ];
    const tempDeck = [];

    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    for (let i = 0; i < 5; i++) {
      tempDeck.push(cards[getRandomInt(0, cards.length - 1)]);
    }

    return tempDeck;
  };

  const restartGame = () => {
    const tempDeck = initializeDeck();
    setDeck(tempDeck);
    setDiffuseCardCount(0);
    setGameOver(false);
    setGameWon(false);
  };

  const handleExplodingKitten = () => {
    const tempDeck = [...deck];
    tempDeck.pop();

    if (deck.length === 1) {
      setGameWon(true);
    } else {
      setDiffuseCardCount((prev) => prev - 1);
      setDeck(tempDeck);
      setExplodeAction(false);
    }
  };

  const handleCardShow = () => {
    const tempDeck = [...deck];
    const currCard = tempDeck[tempDeck.length - 1];
    setCurrentCard(currCard);
    setCardIsShowing(true);
    setTimeout(() => {
      if (
        tempDeck.length === 1 &&
        currCard.cardName !== "Shuffle card" &&
        currCard.cardName !== "Exploding kitten card"
      ) {
        setGameWon(true);
      }

      if (currCard.cardName === "Cat card") {
        tempDeck.pop();
        setDeck(tempDeck);
      } else if (currCard.cardName === "Defuse card") {
        setDiffuseCardCount((prev) => prev + 1);
        tempDeck.pop();
        setDeck(tempDeck);
      } else if (currCard.cardName === "Shuffle card") {
        restartGame();
      } else if (currCard.cardName === "Exploding kitten card") {
        if (diffuseCardCount > 0) {
          setExplodeAction(true);
        } else {
          setGameOver(true);
        }
      }
      setCurrentCard(null);
      setCardIsShowing(false);
    }, 2500);
  };

  useEffect(() => {
    const tempDeck = initializeDeck();
    setDeck(tempDeck);
  }, []);

  console.log(deck);
  
  console.log(userscore, "userscore");
  

  return (
    <>
      
      {showPopup && <UsernamePopup />}

      {reduxUsername && 
      <div className="absolute right-10 top-5">
        <p className="text-2xl">{reduxUsername}&apos;s Score: {userscore.highscore}</p>
      </div>
      }
     
      
      {gameWon ? (
        <div className="flex flex-col gap-4 justify-center items-center h-screen bg-green-500">
        <h1 className="text-white font-bold text-xl">You Won</h1>
          <div className="w-[500px] h-[400px] text-center">
            <iframe
              src="https://giphy.com/embed/BnDIcyVmgoHIz7NtFm/video"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button
            className="font-bold text-white bg-blue-600 px-8 py-3 mt-4 rounded-lg text-xl"
            onClick={restartGame}
          >
            Restart
          </button>
          </div>
          
        </div>
      ) : gameOver ? (
        <div className="flex flex-col gap-4 justify-center items-center h-screen bg-green-500">
          <div className="w-[500px] h-[400px] text-center">
            <iframe
              src="https://giphy.com/embed/eJ4j2VnYOZU8qJU3Py"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button
            className="font-bold text-white bg-blue-600 px-8 py-3 rounded-lg text-xl"
            onClick={restartGame}
          >
            Restart
          </button>
          </div>
          
        </div>
      ) : (
        <div className="board flex justify-center pt-16 h-screen bg-green-500">
          <div className="w-3/4 flex flex-col items-center mt-8">
            <div className="flex gap-8 justify-center">
              {deck &&
                deck.map((card, ind) => (
                  <div
                    key={ind}
                    className={`card-bg w-[200px] h-[300px] bg-gray-200 border-4 border-white flex justify-center items-center text-xl rounded-2xl font-bold`}
                  ></div>
                ))}
            </div>

            {currentCard && (
              <div className="w-[200px] h-[300px] border-2 rounded-xl border-white flex justify-center items-center text-xl mt-4 font-bold">
                {currentCard.cardName === "Exploding kitten card" && (
                  <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
                    <iframe
                      src="https://giphy.com/embed/g2YdApKEna2sg"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute inset-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {currentCard.cardName === "Cat card" && (
                  <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
                    <iframe
                      src="https://giphy.com/embed/TWH3IIPuGyxsOpOZin"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute inset-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {currentCard.cardName === "Defuse card" && (
                  <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
                    <iframe
                      src="https://giphy.com/embed/26tk0r2dToPoL43CM"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute inset-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {currentCard.cardName === "Shuffle card" && (
                  <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
                    <iframe
                      src="https://giphy.com/embed/iCnOabgikYFKK7zRSq"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute inset-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            )}

            {!cardIsShowing && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold text-lg rounded-md hover:bg-blue-700"
                onClick={handleCardShow}
              >
                show card
              </button>
            )}
            {explodeAction && (
              <button
                className="mt-4 text-xl font-bold text-white bg-green-600 px-4 py-2 rounded-lg"
                onClick={handleExplodingKitten}
              >
                use Diffuse Card
              </button>
            )}
            <h2 className="mt-4 text-xl font-bold text-white">
              Diffuse Cards Available - {diffuseCardCount}
            </h2>
          </div>

          {/* <Highscore /> */}
        </div>
      )}
    </>
  );
}

export default GameBoard;
