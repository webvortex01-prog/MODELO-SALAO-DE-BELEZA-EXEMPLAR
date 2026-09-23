import React from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import { TopBarNavigation } from './components/TopBarNavigation';
import { HeroSection } from './components/client/HeroSection';
import { ServicesSection } from './components/client/ServicesSection';
import { SpecialistsSection } from './components/client/SpecialistsSection';
import { GallerySection } from './components/client/GallerySection';
import { ExperienceSection } from './components/client/ExperienceSection';
import { LoyaltyProgramSection } from './components/client/LoyaltyProgramSection';
import { ReviewsSection } from './components/client/ReviewsSection';
import { Footer } from './components/client/Footer';
import { BookingModal } from './components/client/BookingModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DemoWelcomeModal } from './components/DemoWelcomeModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentView } = useSalon();

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E8E6E3] font-sans selection:bg-[#D4AF37]/30 selection:text-[#F3ECE1]">
      <TopBarNavigation />
      
      {currentView === 'client' ? (
        <main>
          <HeroSection />
          <ServicesSection />
          <SpecialistsSection />
          <GallerySection />
          <ExperienceSection />
          <LoyaltyProgramSection />
          <ReviewsSection />
          <Footer />
        </main>
      ) : (
        <main>
          <AdminDashboard />
        </main>
      )}

      {/* Global Modals & Notifications */}
      <BookingModal />
      <DemoWelcomeModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <SalonProvider>
      <MainContent />
    </SalonProvider>
  );
}
