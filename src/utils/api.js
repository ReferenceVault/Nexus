const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = {
  async signup(email, firstName, lastName, password) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName, password }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Signup failed')
    }
    return response.json()
  },

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }
    return response.json()
  },

  async getCurrentUser(accessToken) {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    return response.json()
  },

  async refreshToken(refreshToken) {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!response.ok) {
      throw new Error('Token refresh failed')
    }
    return response.json()
  },

  async logout(accessToken) {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    return response.json()
  },

  async forgotPassword(email) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to send reset email')
    }
    return response.json()
  },

  async resetPassword(token, newPassword) {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to reset password')
    }
    return response.json()
  },
}

export const authStorage = {
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  },

  getAccessToken() {
    return localStorage.getItem('accessToken')
  },

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  },

  clearTokens() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },

  setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData))
  },

  getUserData() {
    const data = localStorage.getItem('userData')
    return data ? JSON.parse(data) : null
  },

  clearUserData() {
    localStorage.removeItem('userData')
  },

  setSignupData(firstName, lastName, email) {
    localStorage.setItem('signupFirstName', firstName)
    localStorage.setItem('signupLastName', lastName)
    localStorage.setItem('signupEmail', email)
  },

  getSignupData() {
    return {
      firstName: localStorage.getItem('signupFirstName'),
      lastName: localStorage.getItem('signupLastName'),
      email: localStorage.getItem('signupEmail'),
    }
  },

  clearSignupData() {
    localStorage.removeItem('signupFirstName')
    localStorage.removeItem('signupLastName')
    localStorage.removeItem('signupEmail')
  },
}

