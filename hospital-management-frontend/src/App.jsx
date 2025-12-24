import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './components/auth/Login'
import RoleSelection from './components/auth/RoleSelection'
import PatientRegister from './components/auth/PatientRegister'
import DoctorRegister from './components/auth/DoctorRegister'
import AdminDashboard from './components/dashboard/AdminDashboard'
import DoctorDashboard from './components/dashboard/DoctorDashboard'
import PatientDashboard from './components/dashboard/PatientDashboard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/common/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RoleSelection />} />
            <Route path="/register/patient" element={<PatientRegister />} />
            <Route path="/register/doctor" element={<DoctorRegister />} />

            {/* Protected Routes - Admin */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Doctor */}
            <Route
              path="/doctor/*"
              element={
                <ProtectedRoute allowedRoles={['DOCTOR']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Patient */}
            <Route
              path="/patient/*"
              element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App