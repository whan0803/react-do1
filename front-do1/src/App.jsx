import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
