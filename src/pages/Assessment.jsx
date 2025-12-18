import React from 'react'
import Header from '../components/Header'

const Assessment = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white min-h-screen flex flex-col">
      <Header userMode activeNav="Assessments" />

      <main className="flex-1">
        <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-9">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">AI Feedback Results</h1>
                  <p className="text-xs text-slate-300">Your personalized analysis and recommendations are ready</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold hover:bg-white/20 transition flex items-center gap-1.5">
                    <i className="fa-solid fa-download text-xs"></i>
                    Export Report
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold hover:bg-white/20 transition flex items-center gap-1.5">
                    <i className="fa-solid fa-share text-xs"></i>
                    Share Results
                  </button>
                </div>
              </div>
            </div>

            {/* Overall Analysis Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-robot text-xl text-white"></i>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Analysis Complete</h2>
                  <p className="text-xs text-slate-300">Your profile has been thoroughly analyzed by our advanced AI system</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 items-center">
                {/* Resume Quality Tile */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-file-lines text-indigo-300 text-lg"></i>
                    <div className="text-xs text-slate-300">Resume Quality</div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">78</div>
                  <div className="w-full h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-indigo-400 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                {/* Video Presentation Tile */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-video text-purple-300 text-lg"></i>
                    <div className="text-xs text-slate-300">Video Presentation</div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">82</div>
                  <div className="w-full h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-purple-400 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                {/* Overall Score Circle */}
                <div className="text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center mx-auto mb-2 shadow-xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">80</div>
                      <div className="text-xs text-indigo-100">Overall Score</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-300">You're in the top 25% of candidates</div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Resume Analysis Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-file-lines text-indigo-300 text-base"></i>
                    <div>
                      <h3 className="text-base font-bold text-white">Resume Analysis</h3>
                      <p className="text-[10px] text-slate-400">Comprehensive document review</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-300">78</div>
                    <div className="text-[10px] text-slate-400">out of 100</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-file-text text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Content Quality</span>
                      </div>
                      <span className="text-white font-semibold">85</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-palette text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Format & Design</span>
                      </div>
                      <span className="text-white font-semibold">70</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-key text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Keyword Optimization</span>
                      </div>
                      <span className="text-white font-semibold">80</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-bullseye text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Impact Statements</span>
                      </div>
                      <span className="text-white font-semibold">75</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Analysis Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-video text-indigo-300 text-base"></i>
                    <div>
                      <h3 className="text-base font-bold text-white">Video Analysis</h3>
                      <p className="text-[10px] text-slate-400">Presentation & communication review</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-300">82</div>
                    <div className="text-[10px] text-slate-400">out of 100</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-microphone text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Speech Clarity</span>
                      </div>
                      <span className="text-white font-semibold">90</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-user-tie text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Professional Presence</span>
                      </div>
                      <span className="text-white font-semibold">85</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check-circle text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Content Relevance</span>
                      </div>
                      <span className="text-white font-semibold">75</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-cog text-indigo-300 text-xs"></i>
                        <span className="text-slate-300">Technical Quality</span>
                      </div>
                      <span className="text-white font-semibold">80</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                      <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Key Recommendations Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <i className="fa-solid fa-lightbulb text-yellow-400 text-base"></i>
                  <h3 className="text-base font-bold text-white">Key Recommendations</h3>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold text-base">1.</span>
                      <div>
                        <div className="font-semibold text-white mb-0.5 text-sm">Quantify Your Achievements</div>
                        <div className="text-xs text-slate-300">Add specific metrics like 'Reduced load time by 40%' instead of 'Improved performance'</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold text-base">2.</span>
                      <div>
                        <div className="font-semibold text-white mb-0.5 text-sm">Enhance Technical Keywords</div>
                        <div className="text-xs text-slate-300">Include more specific technologies and frameworks relevant to your target roles</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold text-base">3.</span>
                      <div>
                        <div className="font-semibold text-white mb-0.5 text-sm">Modernize Format</div>
                        <div className="text-xs text-slate-300">Consider a more contemporary layout with better visual hierarchy</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-1.5">
                  <i className="fa-solid fa-eye text-xs"></i>
                  View Detailed Analysis
                </button>
              </div>

              {/* Strengths & Improvements Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <i className="fa-solid fa-star text-yellow-400 text-base"></i>
                  <h3 className="text-base font-bold text-white">Strengths & Improvements</h3>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <i className="fa-solid fa-check-circle text-emerald-400 mt-0.5 text-xs"></i>
                      <div>
                        <div className="font-semibold text-white mb-0.5 text-sm">Excellent Confidence</div>
                        <div className="text-xs text-slate-300">Your speaking pace and eye contact demonstrate strong professional presence</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <i className="fa-solid fa-triangle-exclamation text-yellow-400 mt-0.5 text-xs"></i>
                      <div>
                        <div className="font-semibold text-white mb-0.5 text-sm">Add Specific Examples</div>
                        <div className="text-xs text-slate-300">Include concrete achievements and project details when describing your experience</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <i className="fa-solid fa-lightbulb text-blue-400 mt-0.5 text-xs"></i>
                      <div>
                        <div className="font-semibold text-white mb-0.5 text-sm">Improve Audio Quality</div>
                        <div className="text-xs text-slate-300">Consider using a quieter environment or external microphone for future recordings</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-1.5">
                  <i className="fa-solid fa-play text-xs"></i>
                  Watch Analysis Highlights
                </button>
              </div>
            </div>

            {/* Skills Gap Analysis Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Skills Gap Analysis</h3>
                  <p className="text-xs text-slate-400">How your skills match with current market demands</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-1.5">
                  <i className="fa-solid fa-check text-emerald-400 text-xs"></i>
                  <span className="text-emerald-300 font-semibold text-xs">85% Match</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-white mb-3">Your Strong Skills</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-300 font-bold text-xs">JS</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">JavaScript</div>
                        <div className="text-xs text-slate-400">High demand skill</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-1">95% Market fit</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-300 font-bold text-xs">RC</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">React</div>
                        <div className="text-xs text-slate-400">Frontend framework</div>
                        <div className="text-xs text-blue-400 font-semibold mt-1">92% Market fit</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-300 font-bold text-xs">AWS</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">AWS</div>
                        <div className="text-xs text-slate-400">Cloud platform</div>
                        <div className="text-xs text-orange-400 font-semibold mt-1">88% Market fit</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-3">Recommended Skills to Add</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-300 font-bold text-xs">TS</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">TypeScript</div>
                        <div className="text-xs text-slate-400">Growing demand</div>
                        <div className="text-xs text-purple-400 font-semibold mt-1">+15% Salary boost</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-300 font-bold text-xs">K8</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">Kubernetes</div>
                        <div className="text-xs text-slate-400">Container orchestration</div>
                        <div className="text-xs text-blue-400 font-semibold mt-1">+12% Salary boost</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-300 font-bold text-xs">GQL</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">GraphQL</div>
                        <div className="text-xs text-slate-400">API query language</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-1">+8% Salary boost</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Benchmarking Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Industry Benchmarking</h3>
                  <p className="text-xs text-slate-400">See how you compare with other professionals in your field</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 text-white text-xs font-semibold hover:bg-white/10 transition">
                  Software Engineering
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                  <i className="fa-solid fa-trophy text-emerald-400 text-2xl mb-2"></i>
                  <div className="text-2xl font-bold text-emerald-300 mb-1">Top 25%</div>
                  <div className="text-xs text-slate-300 mb-1">Overall Ranking</div>
                  <div className="text-[10px] text-slate-400">Among 50,000+ profiles</div>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
                  <i className="fa-solid fa-chart-bar text-blue-400 text-2xl mb-2"></i>
                  <div className="text-2xl font-bold text-blue-300 mb-1">87%</div>
                  <div className="text-xs text-slate-300 mb-1">Skill Relevance</div>
                  <div className="text-[10px] text-slate-400">Above industry average</div>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
                  <i className="fa-solid fa-rocket text-purple-400 text-2xl mb-2"></i>
                  <div className="text-2xl font-bold text-purple-300 mb-1">92%</div>
                  <div className="text-xs text-slate-300 mb-1">Profile Completeness</div>
                  <div className="text-[10px] text-slate-400">Excellent coverage</div>
                </div>
              </div>
            </div>

            {/* Performance Comparison Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4 mb-4">
              <h3 className="text-base font-bold text-white mb-3">Performance Comparison</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Resume Quality</span>
                    <span className="text-white font-semibold">78 vs 65 (avg)</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Video Presentation</span>
                    <span className="text-white font-semibold">82 vs 58 (avg)</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-purple-500 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Technical Skills</span>
                    <span className="text-white font-semibold">85 vs 72 (avg)</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Roadmap Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Improvement Roadmap</h3>
                  <p className="text-xs text-slate-400">Prioritized action items to enhance your profile</p>
                </div>
                <div className="text-xs text-slate-300 font-semibold">2-3 weeks</div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs font-semibold text-red-400 mb-2">High Priority (Week 1)</div>
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="font-semibold text-white text-xs mb-1">Update Resume Metrics</div>
                      <div className="text-[10px] text-slate-400 mb-2">Add quantifiable achievements to 3-4 key bullet points.</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold">+12 points</span>
                        <span className="text-slate-400">2-3 hours</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="font-semibold text-white text-xs mb-1">Enhance LinkedIn Profile</div>
                      <div className="text-[10px] text-slate-400 mb-2">Optimize headline and summary with target keywords.</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold">+8 points</span>
                        <span className="text-slate-400">1-2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-yellow-400 mb-2">Medium Priority (Week 2)</div>
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="font-semibold text-white text-xs mb-1">Learn TypeScript Basics</div>
                      <div className="text-[10px] text-slate-400 mb-2">Complete online course and add to skill set.</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold">+6 points</span>
                        <span className="text-slate-400">10-15 hours</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="font-semibold text-white text-xs mb-1">Record New Video</div>
                      <div className="text-[10px] text-slate-400 mb-2">Include specific project examples and achievements.</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold">+5 points</span>
                        <span className="text-slate-400">3-4 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-blue-400 mb-2">Low Priority (Week 3)</div>
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="font-semibold text-white text-xs mb-1">Build Portfolio Project</div>
                      <div className="text-[10px] text-slate-400 mb-2">Create a showcase project using modern tech stack.</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold">+4 points</span>
                        <span className="text-slate-400">20+ hours</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="font-semibold text-white text-xs mb-1">Get Certifications</div>
                      <div className="text-[10px] text-slate-400 mb-2">AWS or React certification to validate skills.</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold">+3 points</span>
                        <span className="text-slate-400">30+ hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Insights Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Market Insights</h3>
                  <p className="text-xs text-slate-400">Current trends and opportunities in your field</p>
                </div>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-1.5">Growing Market</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-white mb-3">Salary Insights</div>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">Your Expected Range</span>
                      <span className="text-sm font-bold text-emerald-400">$95K - $130K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">Market Average</span>
                      <span className="text-xs text-white">$105K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">Top 10%</span>
                      <span className="text-xs text-white">$150K+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">Your Profile Strength</span>
                      <span className="text-xs font-semibold text-emerald-400">Above Average</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-[10px] text-slate-300 space-y-1">
                    <div>• Adding TypeScript could increase your range by $8-12K.</div>
                    <div>• Senior roles in your area are growing by 15% annually.</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-3">Hot Skills & Trends</div>
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-fire text-red-400 text-xs"></i>
                          <span className="text-xs font-semibold text-white">AI/ML Integration</span>
                        </div>
                        <span className="text-[10px] text-red-400 font-semibold">Trending</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-1">Demand for developers with AI/ML knowledge increased 45% this quarter.</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">↑+45% demand increase</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-chart-line text-blue-400 text-xs"></i>
                          <span className="text-xs font-semibold text-white">Cloud-Native Development</span>
                        </div>
                        <span className="text-[10px] text-blue-400 font-semibold">Growing</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-1">Kubernetes and Docker skills are becoming essential.</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">↑+32% demand increase</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-emerald-400 text-xs"></i>
                          <span className="text-xs font-semibold text-white">Full-Stack TypeScript</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold">Stable</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-1">TypeScript adoption continues to grow across teams.</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">↑+28% demand increase</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready to Level Up CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Level Up?</h3>
                    <p className="text-sm text-indigo-100 mb-4">Follow our personalized roadmap to boost your profile score and land better opportunities.</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-white">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <i className="fa-solid fa-check text-white text-xs"></i>
                        </div>
                        <span>Detailed improvement suggestions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <i className="fa-solid fa-check text-white text-xs"></i>
                        </div>
                        <span>Skill development recommendations</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <i className="fa-solid fa-check text-white text-xs"></i>
                        </div>
                        <span>Market-aligned career guidance</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="px-4 py-2 rounded-lg bg-white text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                        <i className="fa-solid fa-play text-indigo-600"></i>
                        Start Improvement Plan
                      </button>
                      <button className="px-4 py-2 rounded-lg border-2 border-white text-white text-sm font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2">
                        <i className="fa-solid fa-calendar text-white"></i>
                        Schedule Coaching Call
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:block ml-6">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <i className="fa-solid fa-rocket text-white text-3xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Assessment

