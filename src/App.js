import './App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import { useState } from 'react';
import SettingsContext from './SettingsContext';

function App() {
  const [showSettings, setShowSettings] = useState(true);

  return (
    <main>
      <SettingsContext.Provider value={{
        workMinutes: 45,
        breakMinutes: 15
      }}>
        {showSettings && <Settings />}
      </SettingsContext.Provider>
      {!showSettings && <Timer />}
    </main>
  );
}

export default App;