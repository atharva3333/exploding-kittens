import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, selectUsername } from '../features/user/userSlice';
import axios from 'axios';

const UsernamePopup = () => {
  const dispatch = useDispatch();
  const reduxUsername = useSelector(selectUsername);
  const [localUsername, setLocalUsername] = useState('');
  const [showPopup, setShowPopup] = useState(true);
 

  useEffect(() => {
    // Check if username is available in Redux
    if (reduxUsername) {
      // If available, set localUsername to the Redux value
      setLocalUsername(reduxUsername);
      // Close the popup
      setShowPopup(false);
    } else {
      // If not available in Redux, check local storage
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        // If available in local storage, set localUsername to the stored value
        setLocalUsername(storedUsername);
        // Save the username to Redux
        dispatch(setUsername(storedUsername));
        // Close the popup
        setShowPopup(false);
      }
    }
  }, [reduxUsername, dispatch]);

  const handleSaveUsername = () => {
    // Set initial high score for the user
    const initialHighScore = 0;
  
    // Save username to Redux
    dispatch(setUsername(localUsername));
    // Save username to local storage
    localStorage.setItem('username', localUsername);
  
    // Post the initial high score to the backend
    axios.post('http://localhost:8080/highscore', {
      username: localUsername,
      highscore: initialHighScore
    })
      .then(response => {
        // Handle success if needed
        console.log('High score set successfully:', response.data);
      })
      .catch(error => {
        console.error('Error setting high score:', error);
      });
  
    // Close the popup
    setShowPopup(false);
  };
  

  return (
    <>
      {showPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-16 bg-white rounded-lg">
          <h1 className='text-lg mb-8'>Before we start let&apos;s set your username</h1>
          <div className='flex flex-col items-center gap-8'>
            <input
              type="text"
              placeholder="Enter your username"
              value={localUsername}
              className='border-2 border-black bg-slate-100 p-4 rounded-lg'
              onChange={(e) => setLocalUsername(e.target.value)}
            />
            <button onClick={handleSaveUsername} className='bg-blue-700 px-8 py-3 rounded-lg text-white'>Save Username</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UsernamePopup;
