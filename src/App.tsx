import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/shared/Toast';
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';
import { ProtectedRoute } from './pages/auth/ProtectedRoute';

// Pages
import { Home } from './pages/public/Home';
import { TestPage } from './pages/public/TestPage';
import { AboutOniomaniaPage } from './pages/public/AboutOniomaniaPage';
import { SignalsChecklistPage } from './pages/public/SignalsChecklistPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { BenefitsPage } from './pages/public/BenefitsPage';
import { ProfessionalsPage } from './pages/public/ProfessionalsPage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';
import { SignupPage } from './pages/public/SignupPage';
import { LoginPage } from './pages/public/LoginPage';

// Dashboard Pages
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { SpendingPage } from './pages/dashboard/SpendingPage';
import { AnalysisPage } from './pages/dashboard/AnalysisPage';
import { AntiImpulsePage } from './pages/dashboard/AntiImpulsePage';
import { GoalsPage } from './pages/dashboard/GoalsPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';

import { ROUTES } from './constants';

export function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
              <Header />

              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path="/test" element={<TestPage />} />
                  <Route path={ROUTES.ABOUT} element={<AboutOniomaniaPage />} />
                  <Route path={ROUTES.CHECKLIST} element={<SignalsChecklistPage />} />
                  <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorksPage />} />
                  <Route path={ROUTES.BENEFITS} element={<BenefitsPage />} />
                  <Route path={ROUTES.PROFESSIONALS} element={<ProfessionalsPage />} />
                  <Route path={ROUTES.FAQ} element={<FAQPage />} />
                  <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                  <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
                  <Route path={ROUTES.LOGIN} element={<LoginPage />} />

                  {/* Protected Routes */}
                  <Route
                    path={ROUTES.DASHBOARD}
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/gastos"
                    element={
                      <ProtectedRoute>
                        <SpendingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/analise"
                    element={
                      <ProtectedRoute>
                        <AnalysisPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/anti-impulso"
                    element={
                      <ProtectedRoute>
                        <AntiImpulsePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/metas"
                    element={
                      <ProtectedRoute>
                        <GoalsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/perfil"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path={ROUTES.NOT_FOUND} element={<Home />} />
                  <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}