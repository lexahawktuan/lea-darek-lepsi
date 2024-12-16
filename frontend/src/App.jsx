import { useState } from 'react'
import axios from 'axios';
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [isClicked, setIsClicked] = useState(false);

  const handleRestart = () => {
    window.location.reload(); // Restarts the current page
  };

  const handleEnd = async () => {
    try {
      await axios.post('/api/giftget', {
        userName: 'Lea <33 ',
        email: 'joemama@example.com'
      });
      setClicked(true);
    } catch (error) {
      console.error('Error sending click to the server:', error);
    }
  }


  const handleButtonClick = () => {
    setIsClicked(true);
    document.documentElement.style.setProperty('--background-color', '#FFC0CB'); // Change background to pink
    document.documentElement.style.setProperty('--text-color', '#FFFFFF'); // Change text to white
  };

  return (
    <>
      <h1 className={isClicked ? 'transition-h1' : ''}>Rozhodně nemačkej</h1>
      <div className={isClicked ? 'transition-emoji-icon' : 'emoji-icon'}>
        <img src="https://em-content.zobj.net/source/apple/391/eyes_1f440.png" alt="" />
      </div>

      <div className={`btn-card ${isClicked ? 'slide-down' : ''}`}>
        {isClicked ? (
          <>
            <button className="restart-button" onClick={handleRestart}>
              <i className="fas fa-sync-alt restart-icon"></i> 
              Restart
            </button>
            <button onClick={handleEnd}>
            <i class="fa-solid fa-gift"></i>
              Přijmout dárek</button>
          </>
        ) : (
          <button onClick={handleButtonClick}>
            Odhalit dárek
          </button>
        )}
      </div>
    </>
  )
}

export default App;