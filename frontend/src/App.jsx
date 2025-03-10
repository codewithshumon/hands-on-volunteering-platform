import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/header/Header";
import AuthPage from "./pages/auth/AuthPage";
import Dashboard from "./pages/profile/Dashboard";
import EventsPage from "./pages/events/EventsPage";
import { CommunityHelpPage } from "./pages/community/CommunityHelpPage";

import TeamDetailsPage from "./pages/team/TeamDetailsPage";
import TeamPage from "./pages/team/TeamPage";
import ImpactDashboard from "./pages/traking/ImpactDashboardPage";
import LeaderboardPage from "./pages/traking/LeaderboardPage";
import LogHoursPage from "./pages/traking/LogHourPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<CommunityHelpPage />} />
            <Route path="/events" element={<EventsPage />} />

            {/* <Route path="/doctor/:id" element={<DoctorDetails />} /> */}

            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:teamId" element={<TeamDetailsPage />} />

            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/impactboard" element={<LeaderboardPage />} />
            <Route path="/LogHourPage" element={<LogHoursPage />} />

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage isLogin={true} />} />
            <Route path="/signup" element={<AuthPage isLogin={false} />} />
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
