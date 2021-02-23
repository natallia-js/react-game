import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Game } from '../src/components/Game';

function App() {
  const [isFullScreen, SetIsFullScreen] = useState(false);

  useEffect(() => {
    document.addEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement) {
        SetIsFullScreen(true);
      } else {
        SetIsFullScreen(false);
      }
    });
  }, []);

  function fullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitrequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) { /* IE11 */
      element.mozRequestFullScreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

  function setFullScreen() {
    if (!isFullScreen) {
      // полноэкранный режим для всей страницы
      var html = document.documentElement;
      fullScreen(html);
    } else {
      closeFullscreen();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Game-title-block">
          <div className="game-logo">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="game-title">
            Rock, Scissors, Paper
          </div>
        </div>
        <Game />
        <div>
          <button onClick={setFullScreen}>{!isFullScreen ? 'Full Screen' : 'Exit Full Screen'}</button>
        </div>
      </header>
    </div>
  );
}

export default App;
