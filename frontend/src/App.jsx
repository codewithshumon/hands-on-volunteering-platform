import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/header/Header";
import AuthPage from "./pages/auth/AuthPage";
import Dashboard from "./pages/profile/Dashboard";
import EventsPage from "./pages/events/EventsPage";
import { CommunityHelpPage } from "./pages/community/CommunityHelpPage";
import {
  TeamDashboard,
  TeamDashboardPage,
} from "./pages/team/TeamDashboardPage";
import { TeamsListingPage } from "./pages/team/TeamsListingPage";

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

            <Route path="/teams" element={<TeamsListingPage />} />
            <Route path="/teams/create" element={<CreateTeamPage />} />
            <Route path="/teams/:teamId" element={<TeamDashboardPage />} />
            {/* <Route path="/doctor/:id" element={<DoctorDetails />} /> */}

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
