import { useState } from 'react'
import './App.css'
import RankingsBody from './Rankings.jsx'
import SettingsBody from './Settings.jsx'
import SpreadsheetsBody from './Spreadsheets.jsx'

function App() {
  const [currentBody, setCurrentBody] = useState('rankings');

  return (
    <div>
      <Header currentBody={currentBody} setCurrentBody={setCurrentBody} />
      <RankingsBody currentBody={currentBody} />
      {currentBody === 'settings' && <SettingsBody />}
      {currentBody === 'spreadsheets' && <SpreadsheetsBody />}
    </div>
  );
}

function Header({currentBody, setCurrentBody}) {
  return (
    <div id="header">
        <img onClick={() => setCurrentBody('home')} src="images/odds-logo.svg?v=2" id="logo" className={`${currentBody === 'home' ? "active-body" : ""}`} />
        <h2>Odds Drafter</h2>
        <div id="subheader">
          <button onClick={() => setCurrentBody('rankings')} className={`${currentBody === 'rankings' ? "active-body" : ""}`}>Rankings</button>
          <button onClick={() => setCurrentBody('methodology')} className={`${currentBody === 'methodology' ? "active-body" : ""}`}>Methodology</button>
          <button onClick={() => setCurrentBody('howToUse')} className={`${currentBody === 'howToUse' ? "active-body" : ""}`}>How it Works</button>
          <button onClick={() => setCurrentBody('spreadsheets')} className={`${currentBody === 'spreadsheets' ? "active-body" : ""}`}>Downloads</button>
          <button onClick={() => setCurrentBody('changelog')} className={`${currentBody === 'changelog' ? "active-body" : ""}`}>Changelog</button>
          <button onClick={() => setCurrentBody('settings')} className={`${currentBody === 'settings' ? "active-body" : ""}`}>Settings</button>
        </div>
    </div>
  );
}





export default App;