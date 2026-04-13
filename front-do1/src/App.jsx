import "./App.css";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setUserStore } from "./store/setUserStore";
import { userChatMessageStore } from "./store/userChatMessageStore";
import { useGetMissionStore } from "./store/useMissionStore";
import { missionResultStore } from "./store/missionResultStore";
import TimeStart from "./components/TimeStart/TimeStart";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const MissionPage = lazy(() => import("./pages/MissionPage/MissionPage"));
const ListPage = lazy(() => import("./pages/ListPage/ListPage"));
const CalenderPage = lazy(() => import("./pages/CalenderPage/CalenderPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => <div style={{ minHeight: "100vh" }} />;

function App() {
  useEffect(() => {
    const { loadUser } = setUserStore.getState();
    const { initMessage } = userChatMessageStore.getState();
    const { loadUserState } = useGetMissionStore.getState();
    const { loadMissionResult } = missionResultStore.getState();

    (async () => {
      await loadUser();
      initMessage();
      loadUserState();
      loadMissionResult();
    })();
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <TimeStart>
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/mainpage" element={<MainPage />} />
                <Route path="/missionpage" element={<MissionPage />} />
                <Route path="/listpage" element={<ListPage />} />
                <Route path="/calenderpage" element={<CalenderPage />} />
                <Route path="/profilepage" element={<ProfilePage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TimeStart>
      </QueryClientProvider>
    </div>
  );
}

export default App;
