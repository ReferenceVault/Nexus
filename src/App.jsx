import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CreateProfile from './pages/CreateProfile'
import ImportProfile from './pages/ImportProfile'
import JobMatches from './pages/JobMatches'
import JobDetails from './pages/JobDetails'
import Auth from './pages/Auth'
import UserDashboard from './pages/UserDashboard'
import Onboarding from './pages/Onboarding'
import Assessment from './pages/Assessment'
import { isOnboardingComplete } from './utils/onboarding'

// Protected Route Component
const ProtectedDashboard = () => {
  if (!isOnboardingComplete()) {
    // Redirect to onboarding if not completed
    return <Navigate to="/onboarding" replace />
  }
  return <UserDashboard />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/user-dashboard" element={<ProtectedDashboard />} />
        <Route path="/assessments" element={<Assessment />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/import-profile" element={<ImportProfile />} />
        <Route path="/job-matches" element={<JobMatches />} />
        <Route path="/job-details/:jobId" element={<JobDetails />} />
      </Routes>
    </Router>
  )
}

export default App
