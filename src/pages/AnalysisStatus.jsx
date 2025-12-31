import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { wsClient } from '../utils/websocket'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../hooks/useAuth'

const AnalysisStatus = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { accessToken, isAuthenticated } = useAuth()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      navigate('/signin', { replace: true })
      return
    }

    // Connect WebSocket
    wsClient.connect()

    // Subscribe to progress updates
    const unsubscribe = wsClient.on('analysis:progress', (data) => {
      if (data.analysisRequestId === id) {
        setAnalysis(prev => ({
          ...prev,
          status: data.status,
          progress: data.progress,
        }))
        
        // If completed, navigate to results
        if (data.status === 'COMPLETED') {
          setTimeout(() => {
            navigate(`/assessments/${id}`, { replace: true })
          }, 2000)
        }
      }
    })

    // Fetch initial status
    const fetchStatus = async () => {
      try {
        setLoading(true)
        const status = await api.getAnalysisStatus(id)
        setAnalysis(status)

        // If already completed, navigate to results
        if (status.status === 'COMPLETED') {
          setTimeout(() => {
            navigate(`/assessments/${id}`, { replace: true })
          }, 1000)
        }
      } catch (err) {
        setError(err.message || 'Failed to load analysis status')
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()

    // Poll for updates every 5 seconds (fallback if WebSocket fails)
    const pollInterval = setInterval(() => {
      if (analysis?.status !== 'COMPLETED' && analysis?.status !== 'FAILED') {
        fetchStatus()
      }
    }, 5000)

    return () => {
      unsubscribe()
      clearInterval(pollInterval)
    }
  }, [id, isAuthenticated, accessToken, navigate])

  const getStatusMessage = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Initializing analysis...'
      case 'RESUME_PARSING':
        return 'Parsing resume document...'
      case 'RESUME_ANALYZING':
        return 'Analyzing resume content...'
      case 'VIDEO_TRANSCRIBING':
        return 'Transcribing video...'
      case 'VIDEO_ANALYZING':
        return 'Analyzing video presentation...'
      case 'GENERATING_REPORT':
        return 'Generating final report...'
      case 'COMPLETED':
        return 'Analysis complete!'
      case 'FAILED':
        return 'Analysis failed'
      default:
        return 'Processing...'
    }
  }

  const getResumeSteps = () => {
    if (!analysis) return []
    
    const status = analysis.status
    const progress = analysis.progress

    return [
      {
        label: 'Document parsed successfully',
        completed: progress >= 20,
        inProgress: status === 'RESUME_PARSING' && progress < 20,
      },
      {
        label: 'Skills extracted and categorized',
        completed: progress >= 30,
        inProgress: status === 'RESUME_ANALYZING' && progress >= 20 && progress < 30,
      },
      {
        label: 'Analyzing content quality and impact',
        completed: progress >= 40,
        inProgress: status === 'RESUME_ANALYZING' && progress >= 30 && progress < 40,
      },
      {
        label: 'Generating improvement suggestions',
        completed: progress >= 40,
        inProgress: status === 'RESUME_ANALYZING' && progress >= 30 && progress < 40,
      },
    ]
  }

  const getVideoSteps = () => {
    if (!analysis) return []
    
    const status = analysis.status
    const progress = analysis.progress

    return [
      {
        label: 'Video uploaded and transcribed',
        completed: progress >= 50,
        inProgress: status === 'VIDEO_TRANSCRIBING' && progress < 50,
      },
      {
        label: 'Analyzing communication clarity',
        completed: progress >= 60,
        inProgress: status === 'VIDEO_ANALYZING' && progress >= 50 && progress < 60,
      },
      {
        label: 'Evaluating presentation quality',
        completed: progress >= 70,
        inProgress: status === 'VIDEO_ANALYZING' && progress >= 60 && progress < 70,
      },
      {
        label: 'Generating personalized tips',
        completed: progress >= 80,
        inProgress: status === 'GENERATING_REPORT' && progress >= 70 && progress < 80,
      },
    ]
  }

  if (loading && !analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <LoadingSpinner text="Loading analysis status..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white text-neutral-900 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <ErrorMessage message={error} />
        </div>
        <Footer />
      </div>
    )
  }

  if (!analysis) {
    return null
  }

  const resumeSteps = getResumeSteps()
  const videoSteps = getVideoSteps()

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Your onboarding is complete and AI feedback is on the way
            </h1>
            <p className="text-xl text-gray-300">
              {getStatusMessage(analysis.status)}
            </p>
          </div>

          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold mb-2">5.42</div>
              <div className="text-gray-300">Time to Complete</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold mb-2">{analysis.progress}%</div>
              <div className="text-gray-300">Profile Completeness</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold mb-2">Top 15%</div>
              <div className="text-gray-300">Candidate Quality</div>
            </div>
          </div>

          {/* Main Analysis Panel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fa-solid fa-robot mr-3"></i>
                AI Analysis in Progress
              </h2>
              <span className="text-sm text-gray-300">Processing...</span>
            </div>
            <p className="text-gray-300 mb-8">
              Our AI is analyzing your profile and preparing personalized feedback
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Resume Analysis */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <i className="fa-solid fa-file-lines mr-2"></i>
                    Resume Analysis
                  </h3>
                  <span className="text-sm text-gray-300">Processing...</span>
                </div>
                <ul className="space-y-3">
                  {resumeSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      {step.completed ? (
                        <i className="fa-solid fa-check-circle text-green-400 mr-3"></i>
                      ) : step.inProgress ? (
                        <i className="fa-solid fa-spinner fa-spin text-indigo-400 mr-3"></i>
                      ) : (
                        <i className="fa-solid fa-circle text-gray-500 mr-3"></i>
                      )}
                      <span className={step.completed ? 'text-green-400' : step.inProgress ? 'text-indigo-400' : 'text-gray-400'}>
                        {step.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-300">~3 mins</div>
              </div>

              {/* Video Analysis */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <i className="fa-solid fa-video mr-2"></i>
                    Video Analysis
                  </h3>
                  <span className="text-sm text-gray-300">Processing...</span>
                </div>
                <ul className="space-y-3">
                  {videoSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      {step.completed ? (
                        <i className="fa-solid fa-check-circle text-green-400 mr-3"></i>
                      ) : step.inProgress ? (
                        <i className="fa-solid fa-spinner fa-spin text-indigo-400 mr-3"></i>
                      ) : (
                        <i className="fa-solid fa-circle text-gray-500 mr-3"></i>
                      )}
                      <span className={step.completed ? 'text-green-400' : step.inProgress ? 'text-indigo-400' : 'text-gray-400'}>
                        {step.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-300">~5 mins</div>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Overall Progress</span>
                <span className="text-sm">{analysis.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Your AI feedback will be ready in approximately 3-5 minutes
              </p>
            </div>
          </div>

          {analysis.status === 'FAILED' && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-8">
              <p className="text-red-200">
                Analysis failed: {analysis.errorMessage || 'Unknown error'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AnalysisStatus

