import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MainPage from './pages/MainPage/MainPage';
import { useEffect } from 'react';
import { setUserStore } from './store/setUserStore';
import { userChatMessageStore } from './store/userChatMessageStore';

const queryClient = new QueryClient();

function App() {



  
  useEffect(() => {
    const {loadUser} = setUserStore.getState();
    const { initMessage} = userChatMessageStore.getState();
    loadUser();
    initMessage();
  }, []);



  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mainpage" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App
