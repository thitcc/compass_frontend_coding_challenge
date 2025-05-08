import React from 'react';
import logo from './topiaofficial_logo.jpg';
import './App.css';
import Calendar from './components/calendar/Calendar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Calendar/>
      </header>
    </div>
  );
}

export default App;
