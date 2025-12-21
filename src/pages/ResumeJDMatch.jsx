import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const ResumeJDMatch = () => {
  const navigate = useNavigate()
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file)
        setError('')
      } else {
        setError('Please upload a PDF or DOCX file')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!resumeFile) {
      setError('Please upload a resume file')
      return
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description')
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('resume', resumeFile)
      formData.append('jobDescription', jobDescription)

      const response = await fetch('http://localhost:3001/api/resume-jd-match', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze resume')
      }

      const data = await response.json()
      
      // Store the result in sessionStorage to pass to report page
      sessionStorage.setItem('matchReport', JSON.stringify(data))
      
      // Navigate to report page
      navigate('/resume-jd-match/report')
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-neutral-50 font-sans min-h-screen">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Resume vs Job Description Match</h1>
          <p className="text-xl text-neutral-900/70 max-w-2xl mx-auto">
            Upload your resume and job description to get an AI-powered match analysis
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error">
              <i className="fa-solid fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          {/* Resume Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-neutral-900 mb-4">
              Upload Resume *
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary transition-all">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
                disabled={isLoading}
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <i className="fa-solid fa-cloud-upload text-4xl text-neutral-400 mb-4"></i>
                <div className="text-neutral-900 font-medium mb-2">
                  {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                </div>
                <div className="text-sm text-neutral-900/60">
                  PDF, DOC, or DOCX (Max 10MB)
                </div>
              </label>
            </div>
            {resumeFile && (
              <div className="mt-4 flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center">
                  <i className="fa-solid fa-file-pdf text-primary mr-3"></i>
                  <span className="text-neutral-900 font-medium">{resumeFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="text-error hover:text-error/80"
                  disabled={isLoading}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-neutral-900 mb-4">
              Job Description *
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows="12"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              disabled={isLoading}
              required
            />
            <div className="mt-2 text-sm text-neutral-900/60">
              {jobDescription.length} characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-3 border border-neutral-200 text-neutral-900 rounded-lg font-medium hover:bg-neutral-50 transition-all flex items-center"
              disabled={isLoading}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Match
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResumeJDMatch

