import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store/store";

import PageNotFound from "./pages/PageNotFound";
import Header from "./components/header/Header";

import AuthGuard from "./routes/AuthGuard";

import AuthPage from "./pages/auth/AuthPage";
import VerifyEmail from "./pages/auth/VerifyEmail";

import Home from "./pages/Home";
import Dashboard from "./pages/profile/Dashboard";
import EventsPage from "./pages/events/EventsPage";
import { CommunityHelpPage } from "./pages/community/CommunityHelpPage";

import TeamPage from "./pages/teams/TeamsPage";
import TeamDetailsPage from "./pages/teams/TeamsDetailsPage";
import TeamsLeaderboardPage from "./pages/teams/TeamsLeaderboardPage";

import ImpactDashboard from "./pages/impact/ImpactDashboardPage";
import ImpactLeaderboardPage from "./pages/impact/ImpactLeaderboardPage";
import LogHoursPage from "./pages/impact/LogHourPage";

import Login from "./pages/test/Login";
import Signup from "./pages/test/Signup";
import TestVerifyEmail from "./pages/test/VerifyEmail";
import VerifyPassword from "./pages/auth/VerifyPassword";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <ToastContainer />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage isLoginPage={true} />} />
            <Route path="/signup" element={<AuthPage isLoginPage={false} />} />
            <Route path="/verify-password" element={<VerifyPassword />} />

            {/* Protected Routes */}
            <Route
              path="/verify-email"
              element={
                <AuthGuard type="email" url="/login">
                  <VerifyEmail />
                </AuthGuard>
              }
            />

            <Route
              path="/*"
              element={
                <AuthGuard type="protected" url="/login">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/community" element={<CommunityHelpPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/teams" element={<TeamsLeaderboardPage />} />
                    <Route path="/team/:teamId" element={<TeamDetailsPage />} />
                    <Route path="/impact" element={<ImpactDashboard />} />
                    <Route
                      path="/impact/leader-board"
                      element={<ImpactLeaderboardPage />}
                    />
                    <Route path="impact/log-hour" element={<LogHoursPage />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </AuthGuard>
              }
            />

            {/* Redirect Routes */}
            <Route
              path="/test/*"
              element={
                <AuthGuard type="redirect" url="/dashboard">
                  <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="verify-email" element={<TestVerifyEmail />} />
                  </Routes>
                </AuthGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
