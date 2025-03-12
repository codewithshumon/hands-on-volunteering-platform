import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/header/Header";
import AuthPage from "./pages/auth/AuthPage";
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
import VerifyEmail from "./pages/test/VerifyEmail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <div className="pt-16">
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage isLogin={true} />} />
            <Route path="/signup" element={<AuthPage isLogin={false} />} />

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

            <Route path="test/login" element={<Login />} />
            <Route path="test/signup" element={<Signup />} />
            <Route path="test/verify-email" element={<VerifyEmail />} />

            {/* <Route
            path="/users/profile/me"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile/me"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
