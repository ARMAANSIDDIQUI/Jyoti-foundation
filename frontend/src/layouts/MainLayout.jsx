import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LanguageSuggestionModal from '../components/LanguageSuggestionModal';
import FloatingCTA from '../components/FloatingCTA';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <LanguageSuggestionModal />
      <FloatingCTA />
    </div>
  );
}
