import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import Dashboard from './pages/Dashboard';
import RegisteredWebsites from './pages/RegisteredWebsites';
import Home from './pages/Home';
import Insurances from './pages/Insurances';
import Redirect from './pages/Redirect';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/websites" element={<RegisteredWebsites />} />
        <Route path="/insurances" element={<Insurances />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        redirectUri: window.location.origin,
      }}
    >
      <Router>
        <AppRoutes />
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
