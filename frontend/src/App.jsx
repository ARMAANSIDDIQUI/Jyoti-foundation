import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import OurWork from './pages/OurWork';
import Hospitals from './pages/Hospitals';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProjectDetails from './pages/ProjectDetails';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';


import ProtectedRoute from './components/ProtectedRoute';

export default function App() {

  return (
    <AuthProvider>
      <LanguageProvider>

      <Router>
        <ScrollToTop />
        <ScrollToTopButton />
        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="our-work" element={<OurWork />} />
            <Route path="projects/:slug" element={<ProjectDetails />} />
            <Route path="donate" element={<Donate />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all route to redirect back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </Router>
    </LanguageProvider>
  </AuthProvider>
  );
}


