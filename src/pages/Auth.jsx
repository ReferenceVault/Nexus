import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { isOnboardingComplete } from '../utils/onboarding'

const Auth = () => {
  const navigate = useNavigate()

  const handleSignIn = () => {
    // Check if onboarding is complete
    if (isOnboardingComplete()) {
      // Returning user - go to dashboard
      navigate('/user-dashboard')
    } else {
      // First-time user - go to onboarding
      navigate('/onboarding')
    }
  }
  return (
    <div className="bg-white text-neutral-900">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-8 lg:py-12">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-rocket text-white text-xl"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Launch Your Career with{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Insights
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
              Get personalized feedback on your resume and video introduction. Complete your profile in minutes and start connecting with top employers.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-slate-200 text-sm">
              <div className="flex items-center space-x-2">
                <i className="fa-regular fa-clock text-indigo-300"></i>
                <span>5 min setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-shield-halved text-green-300"></i>
                <span>Secure &amp; Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-robot text-purple-300"></i>
                <span>AI-Powered Feedback</span>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-1">
                <div className="text-base font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Sign in
                </div>
                <div className="text-sm font-semibold text-slate-400">Access your profile and applications</div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-indigo-500 hover:text-indigo-600 font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="button"
                  className="w-3/5 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
                  onClick={handleSignIn}
                >
                  <span>Sign In to Dashboard</span>
                  <i className="fa-solid fa-right-to-bracket text-sm"></i>
                </button>

                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span>Or continue with</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="w-3/5 mx-auto flex items-center justify-center rounded-lg border border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50 py-1.5 text-xs font-semibold hover:from-slate-100 hover:to-indigo-100 transition"
                    onClick={handleSignIn}
                  >
                    <i className="fa-brands fa-google text-indigo-600 mr-2 text-sm"></i>
                    <span className="font-bold">Google</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Auth

