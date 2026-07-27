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
        <img onClick={() => setCurrentBody('home')} src="images/odds-logo.svg?v=2" id="logo" />
        <button onClick={() => setCurrentBody('rankings')}>Rankings</button>
        <button onClick={() => setCurrentBody('settings')}>Settings</button>
        <button onClick={() => setCurrentBody('spreadsheets')}>Spreadsheets</button>
        <button onClick={() => setCurrentBody('methodology')}>Methodology</button>
        <button onClick={() => setCurrentBody('howToUse')}>How to Use</button>
        <button onClick={() => setCurrentBody('changelog')}>Changelog</button>
    </div>
  );
}





export default App;