import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import CalendarPage from './pages/calendarPage';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
      />
      <Route
        path="/calendar"
        element={isLoggedIn ? <CalendarPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
