import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { JobListings } from './pages/JobListings';
import { JobDetail } from './pages/JobDetail';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { AuthPage } from './pages/AuthPage';
import { JobApplicationForm } from './components/JobApplicationForm';
import { useAuth } from './hooks/useAuth';

type Page = 'home' | 'jobs' | 'job-detail' | 'employer-dashboard' | 'candidate-dashboard' | 'auth' | 'apply';

interface NavigationContext {
  currentPage: Page;
  selectedJobId: string | null;
  setPage: (page: Page) => void;
  setSelectedJobId: (id: string | null) => void;
}

export const NavigationContext = React.createContext<NavigationContext>({
  currentPage: 'home',
  selectedJobId: null,
  setPage: () => {},
  setSelectedJobId: () => {},
});

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const setPage = (page: Page) => {
    setCurrentPage(page);
    if (page !== 'job-detail' && page !== 'apply') {
      setSelectedJobId(null);
    }
  };

  const navigationValue = {
    currentPage,
    selectedJobId,
    setPage,
    setSelectedJobId,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <NavigationContext.Provider value={navigationValue}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'jobs' && <JobListings />}
          {currentPage === 'job-detail' && <JobDetail jobId={selectedJobId} />}
          {currentPage === 'employer-dashboard' && <EmployerDashboard />}
          {currentPage === 'candidate-dashboard' && <CandidateDashboard />}
          {currentPage === 'auth' && <AuthPage />}
          {currentPage === 'apply' && <JobApplicationForm jobId={selectedJobId} />}
        </main>
      </div>
    </NavigationContext.Provider>
  );
}

export default App;