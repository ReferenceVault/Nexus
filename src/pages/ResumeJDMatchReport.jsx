import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const ResumeJDMatchReport = () => {
  const navigate = useNavigate()
  const [reportData, setReportData] = useState(null)

  useEffect(() => {
    const storedReport = sessionStorage.getItem('matchReport')
    if (storedReport) {
      try {
        setReportData(JSON.parse(storedReport))
      } catch (err) {
        console.error('Error parsing report data:', err)
        navigate('/resume-jd-match')
      }
    } else {
      navigate('/resume-jd-match')
    }
  }, [navigate])

  if (!reportData) {
    return (
      <div className="bg-neutral-50 font-sans min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-primary mb-4"></i>
            <p className="text-neutral-900">Loading report...</p>
          </div>
        </div>
      </div>
    )
  }

  const { overall_score, parameters, strengths, gaps, recommendation, skills_gap_analysis, industry_benchmarking, performance_comparison, improvement_roadmap } = reportData

  // Dummy video analysis data
  const videoAnalysisData = {
    overall_score: 82,
    parameters: [
      { name: 'Speech Clarity', score: 90, explanation: 'Clear articulation and pronunciation throughout the video presentation.' },
      { name: 'Professional Presence', score: 85, explanation: 'Strong professional demeanor and confident delivery.' },
      { name: 'Content Relevance', score: 75, explanation: 'Good alignment with job requirements, with room for more specific examples.' },
      { name: 'Technical Quality', score: 80, explanation: 'Good audio and video quality, minor improvements possible.' }
    ],
    strengths: [
      { text: 'Excellent Confidence - Your speaking pace and eye contact demonstrate strong professional presence.', type: 'strength' }
    ],
    improvements: [
      { text: 'Add Specific Examples - Include concrete achievements and project details when describing your experience.', type: 'improvement' },
      { text: 'Improve Audio Quality - Consider using a quieter environment or external microphone for future recordings.', type: 'improvement' }
    ]
  }

  const resumeScore = parameters?.[0]?.score || overall_score || 78
  const videoScore = videoAnalysisData.overall_score

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-error'
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10 border-success/20'
    if (score >= 60) return 'bg-warning/10 border-warning/20'
    return 'bg-error/10 border-error/20'
  }

  return (
    <div className="bg-neutral-50 font-sans min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <i className="fa-solid fa-robot text-3xl mr-4"></i>
                <h1 className="text-3xl font-bold">AI Analysis Complete</h1>
              </div>
              <p className="text-white/90 text-lg">
                Your profile has been thoroughly analyzed by our advanced AI system.
              </p>
            </div>
            <div className="flex items-center">
              <div className="text-center bg-white/20 rounded-full w-32 h-32 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">{overall_score}</div>
                <div className="text-white/90 text-sm mt-1">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Summary Scores */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/90 font-medium">Resume Quality</span>
                <span className="text-2xl font-bold">{resumeScore}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${resumeScore}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/90 font-medium">Video Presentation</span>
                <span className="text-2xl font-bold">{videoScore}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${videoScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-white/90">
            <i className="fa-solid fa-trophy mr-2"></i>
            You're in the top {overall_score >= 80 ? '25%' : overall_score >= 60 ? '50%' : '75%'} of candidates
          </div>
        </div>

        {/* Performance Comparison Section */}
        {(() => {
          const perfData = performance_comparison || {
            metrics: [
              { name: 'Resume Quality', user_score: resumeScore, average_score: 65 },
              { name: 'Video Presentation', user_score: videoScore, average_score: 58 },
              { name: 'Technical Skills', user_score: (skills_gap_analysis && skills_gap_analysis.overall_match) || 85, average_score: 72 }
            ]
          }
          return (
            <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Performance Comparison</h2>
              <div className="space-y-6">
                {perfData.metrics && perfData.metrics.map((metric, index) => {
                const colors = ['bg-primary', 'bg-purple-600', 'bg-success']
                const colorClass = colors[index % colors.length]
                const isAboveAverage = metric.user_score > metric.average_score
                
                return (
                  <div key={index} className="border border-neutral-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-neutral-900">{metric.name}</h3>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-neutral-900">{metric.user_score}</div>
                          <div className="text-sm text-neutral-900/60">Your Score</div>
                        </div>
                        <div className="text-neutral-900/40">vs</div>
                        <div className="text-right">
                          <div className="text-xl font-semibold text-neutral-900/70">{metric.average_score}</div>
                          <div className="text-sm text-neutral-900/60">(avg)</div>
                        </div>
                        {isAboveAverage && (
                          <div className="flex items-center text-success">
                            <i className="fa-solid fa-arrow-up mr-1"></i>
                            <span className="text-sm font-semibold">
                              +{metric.user_score - metric.average_score} above avg
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3 mb-2">
                      <div
                        className={`${colorClass} h-3 rounded-full transition-all`}
                        style={{ width: `${metric.user_score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-900/60">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          )
        })()}

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Resume Analysis Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
            <div className="flex items-center mb-6">
              <i className="fa-solid fa-file-alt text-2xl text-primary mr-4"></i>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Resume Analysis</h2>
                <p className="text-neutral-900/60">Comprehensive document review</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold text-primary mb-2">
                {resumeScore} <span className="text-2xl text-neutral-900/60">out of 100</span>
              </div>
            </div>

            {/* Parameter Scores */}
            <div className="space-y-6 mb-8">
              {parameters && parameters.map((param, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900">{param.name}</h3>
                    <div className={`text-xl font-bold ${getScoreColor(param.score)}`}>
                      {param.score}
                    </div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getScoreColor(param.score).replace('text-', 'bg-')}`}
                      style={{ width: `${param.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Recommendations */}
            {gaps && gaps.length > 0 && (
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                  <i className="fa-solid fa-lightbulb text-warning mr-2"></i>
                  Key Recommendations
                </h3>
                <ol className="space-y-4">
                  {gaps.map((gap, index) => {
                    const colors = ['bg-yellow-100 border-yellow-200', 'bg-blue-100 border-blue-200', 'bg-green-100 border-green-200']
                    const colorClass = colors[index % colors.length]
                    const parts = gap.split(':')
                    const title = parts[0]?.trim() || gap
                    const description = parts.slice(1).join(':').trim()
                    
                    return (
                      <li key={index} className={`${colorClass} border rounded-lg p-4`}>
                        <div className="flex items-start">
                          <span className="font-bold text-neutral-900 mr-3 mt-1 flex-shrink-0">{index + 1}.</span>
                          <div className="flex-1">
                            <div className="font-semibold text-neutral-900 mb-1">
                              {title}
                            </div>
                            {description && (
                              <div className="text-neutral-900/70 text-sm">
                                {description}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => window.print()}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center justify-center"
            >
              <i className="fa-solid fa-eye mr-2"></i>
              View Detailed Analysis
            </button>
          </div>

          {/* Video Analysis Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
            <div className="flex items-center mb-6">
              <i className="fa-solid fa-video text-2xl text-primary mr-4"></i>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Video Analysis</h2>
                <p className="text-neutral-900/60">Presentation & communication review</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold text-primary mb-2">
                {videoScore} <span className="text-2xl text-neutral-900/60">out of 100</span>
              </div>
            </div>

            {/* Parameter Scores */}
            <div className="space-y-6 mb-8">
              {videoAnalysisData.parameters.map((param, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900">{param.name}</h3>
                    <div className={`text-xl font-bold ${getScoreColor(param.score)}`}>
                      {param.score}
                    </div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getScoreColor(param.score).replace('text-', 'bg-')}`}
                      style={{ width: `${param.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Improvements */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <i className="fa-solid fa-star text-primary mr-2"></i>
                Strengths & Improvements
              </h3>
              <ul className="space-y-4">
                {videoAnalysisData.strengths.map((item, index) => (
                  <li key={index} className="flex items-start bg-success/10 border border-success/20 rounded-lg p-3">
                    <i className="fa-solid fa-check-circle text-success mr-3 mt-1 flex-shrink-0"></i>
                    <div>
                      <div className="font-semibold text-neutral-900 mb-1">
                        {item.text.split(' - ')[0]}
                      </div>
                      {item.text.includes(' - ') && (
                        <div className="text-neutral-900/70 text-sm">
                          {item.text.split(' - ').slice(1).join(' - ')}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
                {videoAnalysisData.improvements.map((item, index) => (
                  <li key={`imp-${index}`} className="flex items-start bg-warning/10 border border-warning/20 rounded-lg p-3">
                    <i className="fa-solid fa-exclamation-triangle text-warning mr-3 mt-1 flex-shrink-0"></i>
                    <div>
                      <div className="font-semibold text-neutral-900 mb-1">
                        {item.text.split(' - ')[0]}
                      </div>
                      {item.text.includes(' - ') && (
                        <div className="text-neutral-900/70 text-sm">
                          {item.text.split(' - ').slice(1).join(' - ')}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {}}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all flex items-center justify-center"
            >
              <i className="fa-solid fa-play mr-2"></i>
              Watch Analysis Highlights
            </button>
          </div>
        </div>

        {/* Strengths Section */}
        {strengths && strengths.length > 0 && (
          <div className="mb-8 bg-success/10 border border-success/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
              <i className="fa-solid fa-star text-success mr-2"></i>
              Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-neutral-900/80">
                  <i className="fa-solid fa-check-circle text-success mr-3 mt-1 flex-shrink-0"></i>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills Gap Analysis Section */}
        {(() => {
          const skillsData = skills_gap_analysis || {
            overall_match: 85,
            strong_skills: [
              { name: 'JavaScript', description: 'High demand skill', market_fit: 95 },
              { name: 'React', description: 'Frontend framework', market_fit: 92 },
              { name: 'AWS', description: 'Cloud platform', market_fit: 88 }
            ],
            recommended_skills: [
              { name: 'TypeScript', description: 'Growing demand', salary_boost: 15 },
              { name: 'Kubernetes', description: 'Container orchestration', salary_boost: 12 },
              { name: 'GraphQL', description: 'API query language', salary_boost: 8 }
            ]
          }
          return (
          <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Skills Gap Analysis</h2>
                <p className="text-neutral-900/60">How your skills match with current market demands</p>
              </div>
              <div className="flex items-center bg-success/10 border border-success/20 rounded-lg px-4 py-2">
                <i className="fa-solid fa-check-circle text-success mr-2"></i>
                <span className="font-bold text-success">{skillsData.overall_match || 85}% Match</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Strong Skills */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Your Strong Skills</h3>
                <div className="space-y-4">
                  {skillsData.strong_skills && skillsData.strong_skills.length > 0 ? skillsData.strong_skills.map((skill, index) => {
                    const colors = ['bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500']
                    const colorClass = colors[index % colors.length]
                    const initials = skill.name.substring(0, 2).toUpperCase()
                    
                    return (
                      <div key={index} className="border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                          <div className={`${colorClass} text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3`}>
                            {initials}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-neutral-900">{skill.name}</h4>
                            <p className="text-sm text-neutral-900/60">{skill.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-neutral-900/70">{skill.market_fit}% Market fit</span>
                          <span className="text-sm font-semibold text-success">{skill.market_fit}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className="bg-success h-2 rounded-full transition-all"
                            style={{ width: `${skill.market_fit}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="text-center py-8 text-neutral-900/60">
                      <i className="fa-solid fa-info-circle text-2xl mb-2"></i>
                      <p>No strong skills data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Skills */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recommended Skills to Add</h3>
                <div className="space-y-4">
                  {skillsData.recommended_skills && skillsData.recommended_skills.length > 0 ? skillsData.recommended_skills.map((skill, index) => {
                    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-orange-500']
                    const colorClass = colors[index % colors.length]
                    const initials = skill.name.substring(0, 2).toUpperCase()
                    
                    return (
                      <div key={index} className="border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                          <div className={`${colorClass} text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3`}>
                            {initials}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-neutral-900">{skill.name}</h4>
                            <p className="text-sm text-neutral-900/60">{skill.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-neutral-900/70">+{skill.salary_boost}% Salary boost</span>
                          <span className="text-sm font-semibold text-warning">+{skill.salary_boost}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className="bg-warning h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(skill.salary_boost * 5, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="text-center py-8 text-neutral-900/60">
                      <i className="fa-solid fa-info-circle text-2xl mb-2"></i>
                      <p>No recommended skills data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          )
        })()}

        {/* Industry Benchmarking Section */}
        {(() => {
          const industryData = industry_benchmarking || {
            overall_ranking: overall_score >= 80 ? 'Top 25%' : overall_score >= 60 ? 'Top 50%' : 'Top 75%',
            skill_relevance: Math.min(overall_score + 7, 100),
            profile_completeness: Math.min(overall_score + 14, 100),
            industry: 'Software Engineering'
          }
          return (
          <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Industry Benchmarking</h2>
                <p className="text-neutral-900/60">See how you compare with other professionals in your field</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <span className="font-semibold text-primary">{industryData.industry || 'Software Engineering'}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Overall Ranking */}
              <div className="bg-success/10 border border-success/20 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <i className="fa-solid fa-trophy text-success text-4xl"></i>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-2">
                  {industryData.overall_ranking || 'Top 25%'}
                </div>
                <div className="text-neutral-900/70 font-medium mb-1">Overall Ranking</div>
                <div className="text-sm text-neutral-900/60">Among 50,000+ profiles</div>
              </div>

              {/* Skill Relevance */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <i className="fa-solid fa-chart-bar text-primary text-4xl"></i>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-2">
                  {industryData.skill_relevance || 87}%
                </div>
                <div className="text-neutral-900/70 font-medium mb-1">Skill Relevance</div>
                <div className="text-sm text-neutral-900/60">Above industry average</div>
              </div>

              {/* Profile Completeness */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <i className="fa-solid fa-rocket text-purple-600 text-4xl"></i>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-2">
                  {industryData.profile_completeness || 92}%
                </div>
                <div className="text-neutral-900/70 font-medium mb-1">Profile Completeness</div>
                <div className="text-sm text-neutral-900/60">Excellent coverage</div>
              </div>
            </div>
          </div>
          )
        })()}

        {/* Improvement Roadmap Section */}
        {(() => {
          const roadmapData = improvement_roadmap || {
            overall_time_estimate: '2-3 weeks',
            action_items: [
              {
                title: 'Update Resume Metrics',
                description: 'Add quantifiable achievements to 3-4 key bullet points',
                priority: 'high',
                week: 1,
                impact_points: 12,
                time_estimate: '2-3 hours'
              },
              {
                title: 'Enhance LinkedIn Profile',
                description: 'Optimize headline and summary with target keywords',
                priority: 'high',
                week: 1,
                impact_points: 8,
                time_estimate: '1-2 hours'
              },
              {
                title: 'Learn TypeScript Basics',
                description: 'Complete online course and add to skill set',
                priority: 'medium',
                week: 2,
                impact_points: 6,
                time_estimate: '10-15 hours'
              },
              {
                title: 'Record New Video',
                description: 'Include specific project examples and achievements',
                priority: 'medium',
                week: 2,
                impact_points: 5,
                time_estimate: '3-4 hours'
              },
              {
                title: 'Build Portfolio Project',
                description: 'Create a showcase project using modern tech stack',
                priority: 'low',
                week: 3,
                impact_points: 4,
                time_estimate: '20+ hours'
              },
              {
                title: 'Get Certifications',
                description: 'AWS or React certification to validate skills',
                priority: 'low',
                week: 3,
                impact_points: 3,
                time_estimate: '30+ hours'
              }
            ]
          }
          return (
          <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Improvement Roadmap</h2>
                <p className="text-neutral-900/60">Prioritized action items to enhance your profile</p>
              </div>
              {improvement_roadmap.overall_time_estimate && (
                <div className="bg-warning/10 border border-warning/20 rounded-full px-4 py-2 flex items-center">
                  <i className="fa-solid fa-clock text-warning mr-2"></i>
                  <span className="font-semibold text-warning">{improvement_roadmap.overall_time_estimate}</span>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* High Priority - Week 1 */}
              <div>
                <div className="flex items-center mb-4">
                  <i className="fa-solid fa-exclamation-circle text-error mr-2"></i>
                  <h3 className="text-lg font-semibold text-error">High Priority (Week 1)</h3>
                </div>
                <div className="space-y-4">
                  {roadmapData.action_items
                    .filter(item => item.priority === 'high' && item.week === 1)
                    .length > 0 ? (
                    roadmapData.action_items
                      .filter(item => item.priority === 'high' && item.week === 1)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-white border-l-4 border-error rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold text-neutral-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-neutral-900/70 mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-error">
                              Impact: +{item.impact_points} points
                            </span>
                            <span className="text-xs text-neutral-900/50">{item.time_estimate}</span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-neutral-900/40 text-sm">
                      No high priority items
                    </div>
                  )}
                </div>
              </div>

              {/* Medium Priority - Week 2 */}
              <div>
                <div className="flex items-center mb-4">
                  <i className="fa-solid fa-clock text-warning mr-2"></i>
                  <h3 className="text-lg font-semibold text-warning">Medium Priority (Week 2)</h3>
                </div>
                <div className="space-y-4">
                  {roadmapData.action_items
                    .filter(item => item.priority === 'medium' && item.week === 2)
                    .length > 0 ? (
                    roadmapData.action_items
                      .filter(item => item.priority === 'medium' && item.week === 2)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-white border-l-4 border-warning rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold text-neutral-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-neutral-900/70 mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-warning">
                              Impact: +{item.impact_points} points
                            </span>
                            <span className="text-xs text-neutral-900/50">{item.time_estimate}</span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-neutral-900/40 text-sm">
                      No medium priority items
                    </div>
                  )}
                </div>
              </div>

              {/* Low Priority - Week 3 */}
              <div>
                <div className="flex items-center mb-4">
                  <i className="fa-solid fa-check-circle text-success mr-2"></i>
                  <h3 className="text-lg font-semibold text-success">Low Priority (Week 3)</h3>
                </div>
                <div className="space-y-4">
                  {roadmapData.action_items
                    .filter(item => item.priority === 'low' && item.week === 3)
                    .length > 0 ? (
                    roadmapData.action_items
                      .filter(item => item.priority === 'low' && item.week === 3)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-white border-l-4 border-success rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold text-neutral-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-neutral-900/70 mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-success">
                              Impact: +{item.impact_points} points
                            </span>
                            <span className="text-xs text-neutral-900/50">{item.time_estimate}</span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-neutral-900/40 text-sm">
                      No low priority items
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          )
        })()}

        {/* Recommendation Section */}
        {recommendation && (
          <div className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
              <i className="fa-solid fa-comment-dots text-primary mr-3"></i>
              Hiring Recommendation
            </h3>
            <p className="text-lg text-neutral-900/80 leading-relaxed">{recommendation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/resume-jd-match')}
            className="px-6 py-3 border border-neutral-200 text-neutral-900 rounded-lg font-medium hover:bg-neutral-50 transition-all flex items-center"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Analyze Another Resume
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeJDMatchReport

