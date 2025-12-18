import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const JobMatches = () => {
  const navigate = useNavigate()
  const [savedJobs, setSavedJobs] = useState(new Set(['react-developer-healthtech']))
  const [filters, setFilters] = useState({
    location: '',
    salaryMin: '',
    salaryMax: '',
    experience: 'mid',
    skills: ['React', 'JavaScript', 'Node.js'],
    companySize: ['medium'],
    remote: true
  })

  const jobMatches = [
    {
      id: 'senior-frontend-techflow',
      title: 'Senior Frontend Developer',
      company: 'TechFlow Inc.',
      location: 'San Francisco, CA',
      posted: '2 days ago',
      companyType: 'Series B Startup',
      salary: '$95k - $130k',
      workType: 'Remote OK',
      benefits: ['Equity Available'],
      matchScore: 96,
      isPremium: true,
      description: 'Join our growing team to build next-generation web applications using React, TypeScript, and modern frontend technologies. We\'re looking for someone passionate about user experience and performance optimization.',
      skills: ['React', 'TypeScript', 'Redux', 'Next.js', 'GraphQL'],
      logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2615db9833-1271f64869e51bf90875.png'
    },
    {
      id: 'full-stack-financehub',
      title: 'Full Stack Engineer',
      company: 'FinanceHub',
      location: 'New York, NY',
      posted: '1 week ago',
      companyType: '200-500 employees',
      salary: '$85k - $115k',
      workType: 'Hybrid',
      benefits: ['Great Benefits'],
      matchScore: 89,
      isPremium: false,
      description: 'Build scalable financial applications using React, Node.js, and PostgreSQL. Work with a collaborative team to deliver features that impact millions of users worldwide.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/623dd88eee-8b0dcc56b705435f7025.png'
    },
    {
      id: 'react-developer-healthtech',
      title: 'React Developer',
      company: 'HealthTech Solutions',
      location: 'Austin, TX',
      posted: '3 days ago',
      companyType: 'Growth Stage',
      salary: '$75k - $105k',
      workType: 'Remote OK',
      benefits: ['Mission Driven'],
      matchScore: 84,
      isPremium: false,
      description: 'Develop healthcare applications that improve patient outcomes. Work with cutting-edge technology to create intuitive user interfaces for medical professionals.',
      skills: ['React', 'JavaScript', 'Redux', 'Material-UI', 'Jest'],
      logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e72528e45d-81fb3cc5e5597fae6dff.png'
    },
    {
      id: 'frontend-engineer-shopsmart',
      title: 'Frontend Engineer',
      company: 'ShopSmart',
      location: 'Seattle, WA',
      posted: '5 days ago',
      companyType: '1000+ employees',
      salary: '$90k - $125k',
      workType: 'Hybrid',
      benefits: ['Stock Options'],
      matchScore: 82,
      isPremium: false,
      description: 'Build and optimize e-commerce experiences for millions of users. Work with modern frontend technologies to create fast, responsive, and accessible web applications.',
      skills: ['React', 'TypeScript', 'Next.js', 'Webpack', 'CSS-in-JS'],
      logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/9bd2c40ef2-e2aa0c3d756f68bb892d.png'
    },
    {
      id: 'javascript-developer-gamestudio',
      title: 'JavaScript Developer',
      company: 'GameStudio Pro',
      location: 'Los Angeles, CA',
      posted: '1 week ago',
      companyType: 'Gaming Studio',
      salary: '$80k - $110k',
      workType: 'Remote OK',
      benefits: ['Creative Environment'],
      matchScore: 78,
      isPremium: false,
      description: 'Create immersive gaming experiences using JavaScript and WebGL. Join a creative team building the next generation of browser-based games and interactive entertainment.',
      skills: ['JavaScript', 'WebGL', 'Three.js', 'Canvas API', 'Game Physics'],
      logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d900c6a2d2-ccd92a21d53ecf6baaa1.png'
    }
  ]

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) {
        newSet.delete(jobId)
      } else {
        newSet.add(jobId)
      }
      return newSet
    })
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleSkillAdd = (skill) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const getWorkTypeColor = (workType) => {
    switch (workType) {
      case 'Remote OK':
        return 'bg-green-500/20 text-green-300 border border-green-500/30'
      case 'Hybrid':
        return 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
    }
  }

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'bg-success'
    if (score >= 80) return 'bg-secondary'
    if (score >= 70) return 'bg-purple-600'
    return 'bg-orange-500'
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white min-h-screen flex flex-col">
      <Header userMode activeNav="Job Matches" />

      <main className="flex-1">
        <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Sidebar Filters */}
            <aside className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 overflow-y-auto rounded-xl lg:col-span-3">
              {/* Match Insights */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-5 text-white mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold">Your Match Score</h3>
                      <p className="text-indigo-100 text-xs">Based on your profile</p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">92</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Skills Match</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div className="bg-white h-1.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Quick Actions</h3>
                <div className="space-y-2.5">
                  <button className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md font-medium hover:bg-indigo-700 transition flex items-center text-sm">
                    <i className="fa-solid fa-plus mr-1.5 text-xs"></i>
                    Save New Search
                  </button>
                  <button className="w-full border border-white/20 bg-white/5 text-white py-2 px-3 rounded-md font-medium hover:bg-white/10 transition flex items-center text-sm">
                    <i className="fa-solid fa-bell mr-1.5 text-xs"></i>
                    Job Alerts
                  </button>
                  <button className="w-full border border-white/20 bg-white/5 text-white py-2 px-3 rounded-md font-medium hover:bg-white/10 transition flex items-center text-sm">
                    <i className="fa-solid fa-filter mr-1.5 text-xs"></i>
                    Advanced Filters
                  </button>
                </div>
              </div>

              {/* Saved Searches */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Saved Searches</h3>
                <div className="space-y-2.5">
                  <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-white text-sm">Senior Frontend Developer</span>
                      <i className="fa-solid fa-star text-indigo-300 text-xs"></i>
                    </div>
                    <div className="text-xs text-slate-300">Remote • $80k-$120k • 23 new matches</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-white text-sm">Full Stack Engineer</span>
                      <i className="fa-regular fa-star text-slate-400 text-xs"></i>
                    </div>
                    <div className="text-xs text-slate-300">San Francisco • $90k-$140k • 8 new matches</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-white text-sm">React Developer</span>
                      <i className="fa-regular fa-star text-slate-400 text-xs"></i>
                    </div>
                    <div className="text-xs text-slate-300">NYC • Remote OK • $70k-$110k • 15 new matches</div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Filters</h3>
                
                {/* Location Filter */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Location</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full border border-white/20 bg-white/10 backdrop-blur-sm rounded-md px-2.5 py-1.5 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" 
                      placeholder="City, state, or country"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    />
                    <i className="fa-solid fa-map-marker-alt absolute right-2.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                  </div>
                  <div className="mt-1.5 space-y-1.5">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-400" 
                        checked={filters.remote}
                        onChange={(e) => handleFilterChange('remote', e.target.checked)}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Remote OK</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-400"
                        checked={filters.hybrid}
                        onChange={(e) => handleFilterChange('hybrid', e.target.checked)}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Hybrid</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-400"
                        checked={filters.onsite}
                        onChange={(e) => handleFilterChange('onsite', e.target.checked)}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">On-site only</span>
                    </label>
                  </div>
                </div>

                {/* Salary Range */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Salary Range</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input 
                      type="number" 
                      className="border border-white/20 bg-white/10 backdrop-blur-sm rounded-md px-2.5 py-1.5 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" 
                      placeholder="Min"
                      value={filters.salaryMin}
                      onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                    />
                    <input 
                      type="number" 
                      className="border border-white/20 bg-white/10 backdrop-blur-sm rounded-md px-2.5 py-1.5 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" 
                      placeholder="Max"
                      value={filters.salaryMax}
                      onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                    />
                  </div>
                  <div className="mt-1.5">
                    <input 
                      type="range" 
                      className="w-full h-1.5 bg-white/20 rounded-md appearance-none cursor-pointer slider" 
                      min="0" 
                      max="200000" 
                      value={filters.salaryRange || 80000}
                      onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Experience Level</label>
                  <div className="space-y-1.5">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="experience" 
                        className="text-indigo-600 focus:ring-indigo-400 border-white/20"
                        checked={filters.experience === 'entry'}
                        onChange={() => handleFilterChange('experience', 'entry')}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Entry Level (0-2 years)</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="experience" 
                        className="text-indigo-600 focus:ring-indigo-400 border-white/20"
                        checked={filters.experience === 'mid'}
                        onChange={() => handleFilterChange('experience', 'mid')}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Mid Level (3-5 years)</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="experience" 
                        className="text-indigo-600 focus:ring-indigo-400 border-white/20"
                        checked={filters.experience === 'senior'}
                        onChange={() => handleFilterChange('experience', 'senior')}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Senior Level (6+ years)</span>
                    </label>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Skills</label>
                  <div className="relative mb-2.5">
                    <input 
                      type="text" 
                      className="w-full border border-white/20 bg-white/10 backdrop-blur-sm rounded-md px-2.5 py-1.5 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400" 
                      placeholder="Add skills..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSkillAdd(e.target.value)
                          e.target.value = ''
                        }
                      }}
                    />
                    <i className="fa-solid fa-plus absolute right-2.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {filters.skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-full text-xs flex items-center">
                        {skill}
                        <i 
                          className="fa-solid fa-times ml-1.5 cursor-pointer text-xs"
                          onClick={() => handleSkillRemove(skill)}
                        ></i>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Company Size */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Company Size</label>
                  <div className="space-y-1.5">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-400"
                        checked={filters.companySize.includes('startup')}
                        onChange={(e) => {
                          const newSize = e.target.checked 
                            ? [...filters.companySize, 'startup']
                            : filters.companySize.filter(size => size !== 'startup')
                          handleFilterChange('companySize', newSize)
                        }}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Startup (1-50)</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-400"
                        checked={filters.companySize.includes('medium')}
                        onChange={(e) => {
                          const newSize = e.target.checked 
                            ? [...filters.companySize, 'medium']
                            : filters.companySize.filter(size => size !== 'medium')
                          handleFilterChange('companySize', newSize)
                        }}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Medium (51-500)</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-400"
                        checked={filters.companySize.includes('large')}
                        onChange={(e) => {
                          const newSize = e.target.checked 
                            ? [...filters.companySize, 'large']
                            : filters.companySize.filter(size => size !== 'large')
                          handleFilterChange('companySize', newSize)
                        }}
                      />
                      <span className="ml-1.5 text-xs text-slate-300">Large (500+)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="space-y-2.5">
                <button className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md font-medium hover:bg-indigo-700 transition text-sm">
                  Apply Filters
                </button>
                <button 
                  className="w-full text-slate-300 py-2 px-3 rounded-md font-medium hover:text-white transition border border-white/20 bg-white/5 hover:bg-white/10 text-sm"
                  onClick={() => setFilters({
                    location: '',
                    salaryMin: '',
                    salaryMax: '',
                    experience: 'mid',
                    skills: [],
                    companySize: [],
                    remote: false,
                    hybrid: false,
                    onsite: false
                  })}
                >
                  Clear All Filters
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-6 space-y-5">
              {/* Header Section */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white mb-1.5">Job Matches</h1>
                    <p className="text-xs text-slate-300">Personalized opportunities based on your profile and preferences</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-md border border-white/20 px-3 py-1.5">
                      <i className="fa-solid fa-sort mr-1.5 text-slate-400 text-xs"></i>
                      <select className="border-none bg-transparent focus:ring-0 text-xs text-white">
                        <option className="bg-slate-900 text-white">Best Match</option>
                        <option className="bg-slate-900 text-white">Newest First</option>
                        <option className="bg-slate-900 text-white">Highest Salary</option>
                        <option className="bg-slate-900 text-white">Company Rating</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md hover:bg-white/20 transition">
                        <i className="fa-solid fa-th-large text-slate-300 text-xs"></i>
                      </button>
                      <button className="p-1.5 bg-indigo-600 text-white border border-indigo-600 rounded-md">
                        <i className="fa-solid fa-list text-white text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 mb-3">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-xl font-bold text-indigo-300 mb-0.5">247</div>
                      <div className="text-xs text-slate-400">Total Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-300 mb-0.5">18</div>
                      <div className="text-xs text-slate-400">New This Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-400 mb-0.5">12</div>
                      <div className="text-xs text-slate-400">Applied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-pink-300 mb-0.5">5</div>
                      <div className="text-xs text-slate-400">Interviews</div>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                <div className="flex items-center space-x-2.5 mb-3">
                  <span className="text-xs font-medium text-slate-300">Active Filters:</span>
                  {filters.remote && (
                    <div className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs flex items-center">
                      Remote OK
                      <i className="fa-solid fa-times ml-1.5 cursor-pointer text-xs" onClick={() => handleFilterChange('remote', false)}></i>
                    </div>
                  )}
                  {filters.salaryMin && filters.salaryMax && (
                    <div className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-xs flex items-center">
                      ${filters.salaryMin} - ${filters.salaryMax}
                      <i className="fa-solid fa-times ml-1.5 cursor-pointer text-xs" onClick={() => {
                        handleFilterChange('salaryMin', '')
                        handleFilterChange('salaryMax', '')
                      }}></i>
                    </div>
                  )}
                  <div className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-xs flex items-center">
                    {filters.experience === 'mid' ? 'Mid Level' : filters.experience === 'senior' ? 'Senior Level' : 'Entry Level'}
                    <i className="fa-solid fa-times ml-1.5 cursor-pointer text-xs" onClick={() => handleFilterChange('experience', 'mid')}></i>
                  </div>
                  <button className="text-xs text-slate-400 hover:text-white underline">Clear all</button>
                </div>
              </div>

              {/* Job Matches List */}
              <div className="space-y-5">
                {jobMatches.map((job) => (
                  <div 
                    key={job.id} 
                    className={`${job.isPremium 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30' 
                      : 'bg-white/10 backdrop-blur-sm border border-white/20'
                    } rounded-lg p-5 relative hover:bg-white/15 transition-all`}
                  >
                    {job.isPremium && (
                      <div className="absolute -top-2.5 left-5 bg-yellow-500 text-white px-2.5 py-0.5 rounded-full text-xs font-medium">
                        <i className="fa-solid fa-crown mr-1 text-xs"></i>
                        Premium Match
                      </div>
                    )}
                    <div className="flex items-start space-x-5">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                        <img className="w-11 h-11 rounded-md object-cover" src={job.logo} alt={`${job.company} logo`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-0.5">{job.title}</h3>
                            <p className="text-base font-semibold text-slate-300 mb-1.5">{job.company}</p>
                            <div className="flex items-center space-x-3 text-xs text-slate-400 mb-2.5">
                              <span className="flex items-center">
                                <i className="fa-solid fa-map-marker-alt mr-1 text-xs"></i>
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <i className="fa-solid fa-clock mr-1 text-xs"></i>
                                Posted {job.posted}
                              </span>
                              <span className="flex items-center">
                                <i className="fa-solid fa-building mr-1 text-xs"></i>
                                {job.companyType}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mb-2.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getWorkTypeColor(job.workType)}`}>
                                {job.workType}
                              </span>
                              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                {job.salary}
                              </span>
                              {job.benefits.map((benefit, index) => (
                                <span key={index} className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`rounded-full w-14 h-14 flex items-center justify-center mb-1.5 ${getMatchScoreColor(job.matchScore)}`}>
                              <span className="text-white font-bold text-base">{job.matchScore}</span>
                            </div>
                            <div className="text-xs text-slate-400">Match Score</div>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 mb-3 leading-relaxed text-sm">
                          {job.description}
                        </p>
                        
                        <div className="mb-3">
                          <div className="text-xs font-medium text-slate-300 mb-1.5">Required Skills:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {job.skills.map((skill, index) => (
                              <span key={index} className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button 
                              className="text-slate-400 hover:text-white transition text-xs"
                              onClick={() => toggleSaveJob(job.id)}
                            >
                              <i className={`${savedJobs.has(job.id) ? 'fa-solid fa-heart text-red-400' : 'fa-regular fa-heart'} mr-1 text-xs`}></i>
                              {savedJobs.has(job.id) ? 'Saved' : 'Save'}
                            </button>
                            <button className="text-slate-400 hover:text-white transition text-xs">
                              <i className="fa-solid fa-share mr-1 text-xs"></i>
                              Share
                            </button>
                            <button className="text-slate-400 hover:text-white transition text-xs">
                              <i className="fa-solid fa-eye-slash mr-1 text-xs"></i>
                              Hide
                            </button>
                          </div>
                          <div className="flex items-center space-x-2.5">
                            <button 
                              className="border border-white/20 bg-white/5 text-white px-5 py-1.5 rounded-md font-medium hover:bg-white/10 transition text-sm"
                              onClick={() => navigate(`/job-details/${job.id}`)}
                            >
                              View Details
                            </button>
                            <button className="bg-indigo-600 text-white px-5 py-1.5 rounded-md font-medium hover:bg-indigo-700 transition flex items-center text-sm">
                              <i className="fa-solid fa-paper-plane mr-1.5 text-xs"></i>
                              {job.isPremium ? 'Quick Apply' : 'Apply'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More Section */}
                <div className="text-center py-6">
                  <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2.5 rounded-md font-medium hover:bg-white/20 transition flex items-center mx-auto text-sm">
                    <i className="fa-solid fa-plus mr-1.5 text-xs"></i>
                    Load More Matches
                  </button>
                  <p className="text-xs text-slate-400 mt-2.5">Showing {jobMatches.length} of 247 matches</p>
                </div>
              </div>
        </main>

            {/* Right Sidebar - Match Insights */}
            <aside className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 overflow-y-auto rounded-xl lg:col-span-3">
              {/* Match Explanation */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Why This Match?</h3>
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg p-3 border border-indigo-500/30">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Skills Alignment</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-white/20 rounded-full h-1.5 mr-1.5">
                          <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-green-400">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Experience Match</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-white/20 rounded-full h-1.5 mr-1.5">
                          <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-indigo-400">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Salary Range</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-white/20 rounded-full h-1.5 mr-1.5">
                          <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-purple-400">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Location Fit</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-white/20 rounded-full h-1.5 mr-1.5">
                          <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-orange-400">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Insights */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Career Insights</h3>
                <div className="space-y-3">
                  <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-md p-3">
                    <div className="flex items-start space-x-2.5">
                      <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-lightbulb text-white text-xs"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-0.5 text-sm">Skill Gap Analysis</h4>
                        <p className="text-xs text-slate-300">Consider learning GraphQL to increase your match score by 8%</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-md p-3">
                    <div className="flex items-start space-x-2.5">
                      <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-chart-line text-white text-xs"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-0.5 text-sm">Market Trend</h4>
                        <p className="text-xs text-slate-300">React developers in your area see 15% salary growth annually</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saved Jobs */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Recently Saved</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2.5 p-2.5 bg-white/5 border border-white/10 rounded-md">
                    <div className="w-9 h-9 bg-white/10 rounded-md flex items-center justify-center border border-white/20">
                      <img className="w-7 h-7 rounded object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c73833ea5f-fecf083748cfdcde108f.png" alt="tech startup logo minimal design" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-xs text-white">React Developer</div>
                      <div className="text-xs text-slate-400">TechStart Inc.</div>
                    </div>
                    <i className="fa-solid fa-heart text-red-400 text-xs"></i>
                  </div>
                  <div className="flex items-center space-x-2.5 p-2.5 bg-white/5 border border-white/10 rounded-md">
                    <div className="w-9 h-9 bg-white/10 rounded-md flex items-center justify-center border border-white/20">
                      <img className="w-7 h-7 rounded object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/afce614007-577c228ec7dfe3991da4.png" alt="software company logo blue and white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-xs text-white">Frontend Engineer</div>
                      <div className="text-xs text-slate-400">CodeCraft</div>
                    </div>
                    <i className="fa-solid fa-heart text-red-400 text-xs"></i>
                  </div>
                </div>
              </div>

              {/* Application Status */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Application Status</h3>
                <div className="space-y-2.5">
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-xs text-white">Senior Developer</span>
                      <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded-full">Under Review</span>
                    </div>
                    <div className="text-xs text-slate-300">DataFlow Corp • Applied 3 days ago</div>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-xs text-white">Full Stack Dev</span>
                      <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full">Interview</span>
                    </div>
                    <div className="text-xs text-slate-300">WebSolutions • Interview tomorrow</div>
                  </div>
                </div>
              </div>

              {/* Job Alerts */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">Job Alerts</h3>
                <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-md p-3">
                  <div className="flex items-center space-x-2.5 mb-2.5">
                    <i className="fa-solid fa-bell text-indigo-300 text-xs"></i>
                    <span className="font-medium text-white text-sm">Get notified</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2.5">Receive alerts when new jobs matching your criteria are posted.</p>
                  <button className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md text-xs font-medium hover:bg-indigo-700 transition">
                    Set Up Alerts
                  </button>
                </div>
              </div>

              {/* Profile Completion */}
              <div>
                <h3 className="text-base font-semibold text-white mb-3">Profile Strength</h3>
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg p-3 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-medium text-white text-sm">85% Complete</span>
                    <span className="text-xs text-purple-300 font-medium">Good</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5 mb-3">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center text-slate-300">
                      <i className="fa-solid fa-check text-green-400 mr-1.5 text-xs"></i>
                      Portfolio links added
                    </div>
                    <div className="flex items-center text-slate-300">
                      <i className="fa-solid fa-check text-green-400 mr-1.5 text-xs"></i>
                      Skills assessment completed
                    </div>
                    <div className="flex items-center text-slate-300">
                      <i className="fa-solid fa-times text-red-400 mr-1.5 text-xs"></i>
                      Add work preferences
                    </div>
                  </div>
                  <button 
                    className="w-full bg-purple-600 text-white py-2 px-3 rounded-md text-xs font-medium hover:bg-purple-700 transition mt-2.5"
                    onClick={() => navigate('/create-profile')}
                  >
                    Complete Profile
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}

export default JobMatches
