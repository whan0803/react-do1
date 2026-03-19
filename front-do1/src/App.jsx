import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MainPage from './pages/MainPage/MainPage';
import MissionPage from './pages/MissionPage/MissionPage';
import ListPage from './pages/ListPage/ListPage';


import { useEffect } from 'react';
import { setUserStore } from './store/setUserStore';
import { userChatMessageStore } from './store/userChatMessageStore';
import TimeStart from './components/TimeStart/TimeStart';

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
        {/* <TimeStart> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/missionpage" element={<MissionPage />} />
              <Route path="/listpage" element={<ListPage />} />
            </Routes>
          </BrowserRouter>
        {/* </TimeStart> */}
      </QueryClientProvider>
    </div>
  );
}

export default App
