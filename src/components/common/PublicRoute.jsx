import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { isTokenExpired } from '../../utils/apiClient'

/**
 * PublicRoute - Redirects authenticated users away from public pages (login/signup)
 * Prevents authenticated users from accessing auth pages
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, accessToken } = useAuth()
  const location = useLocation()

  // Check if user is authenticated and has valid token
  const isAuthenticatedWithValidToken = isAuthenticated && accessToken && !isTokenExpired(accessToken)

  // If authenticated, redirect to dashboard
  // Use replace to prevent browser back button from going back to auth pages
  if (isAuthenticatedWithValidToken) {
    // Get the redirect path from state (if coming from a protected route)
    const from = location.state?.from?.pathname || '/user-dashboard'
    return <Navigate to={from} replace />
  }

  return children
}

export default PublicRoute

