import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ProfileForm from "./pages/profile/ProfileForm";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfileForm />} />
          {/* <Route path="/doctor/:id" element={<DoctorDetails />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} /> */}
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
      </BrowserRouter>
    </>
  );
}

export default App;
