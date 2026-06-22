import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/shared/Toast';
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';

// Pages
import { ProtectedRoute } from './pages/auth/ProtectedRoute';
import { Home } from './pages/public/Home';
import { AboutOniomaniaPage } from './pages/public/AboutOniomaniaPage';
import { SignalsChecklistPage } from './pages/public/SignalsChecklistPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { BenefitsPage } from './pages/public/BenefitsPage';
import { ProfessionalsPage } from './pages/public/ProfessionalsPage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';
import { SignupPage } from './pages/public/SignupPage';
import { LoginPage } from './pages/public/LoginPage';

import { ROUTES } from './utils/constants';

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
                        <div className="py-20 text-center">
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Dashboard
                          </h1>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            (Em desenvolvimento - breve disponível)
                          </p>
                        </div>
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