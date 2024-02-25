import { useEffect, useState } from 'react';
import axios from 'axios';
import "../Leaderboard.css";
const LeaderBoard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/highscores')
      .then(response => {
        setScores(response.data);
      })
      .catch(error => {
        console.error('Error fetching high scores:', error);
      });
  }, []);

  return (
    <div>
      <div className="text-center pt-4 h-screen bg-green-500">
        <h1 className="text-7xl">Leaderboard</h1>
        <div className='bg-white text-black p-16 rounded-lg w-[1200px] mx-auto mt-16'>
          <ul>
            {scores.map(score => (
              <li key={score.username}>
                {score.username}: {score.highscore}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
