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
        <button onClick={() => setCurrentBody('rankings')}>Rankings</button>
        <button onClick={() => setCurrentBody('settings')}>Settings</button>
        <button onClick={() => setCurrentBody('spreadsheets')}>Spreadsheets</button>
    </div>
  );
}





export default App;