// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import AddEmployee from './pages/AddEmployee';
import Employee_details from './pages/Employee_details';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content">{children}</div>
    </>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const location = useLocation();
  const hideHeaderSidebar = location.pathname === '/' || location.pathname === '/register' || location.pathname === '/login';

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Layout>
                <Employee />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <Layout>
                <AddEmployee />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee_details/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Employee_details />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
