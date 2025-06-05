import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { SuccessSignup } from "./pages/SuccessSignup";
import { ResidentScreen } from "./pages/Accommodations";
import { ServiceScreen } from "./pages/Services";
import { MockAuthProvider } from "./context/MockAuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { DashboardHome } from "./pages/DashboardHome";
import { DashboardAddListing } from "./pages/DashboardAddListing";
import { PreviewListing } from "./pages/PreviewListing";
import { Onboarding } from "./pages/Onboarding";
import { ListingPage } from "./pages/ListingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { DashboardNotif } from "./pages/DashboardNotif";
import { ListingPreview } from "./pages/ListingPreview";
import { EditProfile } from "./pages/EditProfile";
import { EditListing } from "./pages/EditListing";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <div className="bg-background">
      <MockAuthProvider>
        <PropertyProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/successsignup" element={<SuccessSignup />} />
              <Route
                path="/explore/accommodations"
                element={<ResidentScreen />}
              />
              <Route path="/explore/services" element={<ServiceScreen />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/About" element={<About />} />
              <Route path="/onboarding" element={<Onboarding />} />

              <Route path="/DashboardHome" element={<DashboardHome />} />

              <Route path="/dashboard/listings" element={<ListingPage />} />
              <Route
                path="/dashboard/notifications"
                element={<DashboardNotif />}
              />
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route
                path="/dashboard/add-listing"
                element={<DashboardAddListing />}
              />
              <Route
                path="/dashboard/preview-listing"
                element={<PreviewListing />}
              />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/:listing/:id" element={<ListingPreview />} />
              <Route path="/dashboard/editProfile" element={<EditProfile />} />
              <Route path="/dashboard/:listingId" element={<EditListing />} />
            </Routes>
          </Router>
        </PropertyProvider>
      </MockAuthProvider>
    </div>
  );
}

export default App;
