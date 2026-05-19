import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import BarraLateral from './components/barraLateral/barraLateral';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <div className="app-container" style={{ display: 'flex' }}>
              <BarraLateral />
              <main style={{ marginLeft: '60px', width: '100%', padding: '20px' }}>
                <h1>Bem-vindo à Home do DailyFlow!</h1>
              </main>
            </div>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;