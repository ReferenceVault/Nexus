import express from 'express'
import cors from 'cors'
import multer from 'multer'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Extract text from resume file
async function extractResumeText(filePath, mimeType) {
  try {
    if (mimeType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath)
      const data = await pdfParse(dataBuffer)
      return data.text
    } else if (mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: filePath })
      return result.value
    }
    throw new Error('Unsupported file type')
  } catch (error) {
    throw new Error(`Failed to extract text: ${error.message}`)
  }
}

// API Route for Resume-JD Matching
app.post('/api/resume-jd-match', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' })
    }

    if (!req.body.jobDescription) {
      return res.status(400).json({ error: 'Job description is required' })
    }

    // Extract text from resume
    const resumeText = await extractResumeText(req.file.path, req.file.mimetype)
    const jobDescription = req.body.jobDescription

    // Clean up uploaded file
    fs.unlinkSync(req.file.path)

    // Prepare OpenAI prompt
    const systemPrompt = `You are an expert resume analyst. Analyze a resume against a job description and provide a structured evaluation.

Evaluate the resume based on these specific parameters:
1. Content Quality - Assess the clarity, completeness, and relevance of the resume content
2. Format & Design - Evaluate the visual presentation, structure, and readability
3. Keyword Optimization - Check how well the resume matches keywords and phrases from the job description
4. Impact Statements - Assess the strength and quantifiability of achievements and accomplishments

For each parameter, provide:
- A score from 0-100
- A detailed explanation (2-3 sentences)

Also provide:
- Overall match score (0-100) - calculated as the average of all parameter scores
- Strengths (array of 2-4 specific strengths)
- Gaps (array of 2-4 specific gaps or missing elements)
- Final hiring recommendation (2-3 sentences)

Additionally, provide Skills Gap Analysis:
- Overall skills match percentage (0-100)
- Strong skills (array of 3-5 skills with: name, description, market_fit percentage)
- Recommended skills to add (array of 3-5 skills with: name, description, salary_boost percentage)

And Industry Benchmarking:
- Overall ranking (percentage like "Top 25%")
- Skill relevance (percentage 0-100)
- Profile completeness (percentage 0-100)
- Industry/field name (e.g., "Software Engineering")

Also provide Performance Comparison:
- Compare user scores vs industry average for: Resume Quality, Video Presentation, Technical Skills
- Each metric should have: name, user_score, average_score

And Improvement Roadmap:
- Overall time estimate (e.g., "2-3 weeks")
- Prioritized action items organized by priority (high, medium, low) and week (1, 2, 3)
- Each action item should have: title, description, priority (high/medium/low), week (1/2/3), impact_points (number), time_estimate (string like "2-3 hours")

Return ONLY valid JSON in this exact format:
{
  "overall_score": number,
  "parameters": [
    {
      "name": "Content Quality",
      "score": number,
      "explanation": "string"
    },
    {
      "name": "Format & Design",
      "score": number,
      "explanation": "string"
    },
    {
      "name": "Keyword Optimization",
      "score": number,
      "explanation": "string"
    },
    {
      "name": "Impact Statements",
      "score": number,
      "explanation": "string"
    }
  ],
  "strengths": ["string", "string"],
  "gaps": ["string", "string"],
  "recommendation": "string",
  "skills_gap_analysis": {
    "overall_match": number,
    "strong_skills": [
      {
        "name": "string",
        "description": "string",
        "market_fit": number
      }
    ],
    "recommended_skills": [
      {
        "name": "string",
        "description": "string",
        "salary_boost": number
      }
    ]
  },
  "industry_benchmarking": {
    "overall_ranking": "string",
    "skill_relevance": number,
    "profile_completeness": number,
    "industry": "string"
  },
  "performance_comparison": {
    "metrics": [
      {
        "name": "Resume Quality",
        "user_score": number,
        "average_score": number
      },
      {
        "name": "Video Presentation",
        "user_score": number,
        "average_score": number
      },
      {
        "name": "Technical Skills",
        "user_score": number,
        "average_score": number
      }
    ]
  },
  "improvement_roadmap": {
    "overall_time_estimate": "string",
    "action_items": [
      {
        "title": "string",
        "description": "string",
        "priority": "high" | "medium" | "low",
        "week": number,
        "impact_points": number,
        "time_estimate": "string"
      }
    ]
  }
}`

    const userPrompt = `Resume:
${resumeText}

Job Description:
${jobDescription}

Analyze this resume against the job description and provide the evaluation in the specified JSON format.

For Skills Gap Analysis:
- Extract 3-5 key skills from the resume that are strong matches with the job description
- Identify 3-5 skills mentioned in the job description that are missing or weak in the resume
- Calculate market fit percentages for strong skills (based on demand and relevance)
- Calculate salary boost percentages for recommended skills (based on market value and demand)

For Industry Benchmarking:
- Determine the industry/field (e.g., "Software Engineering", "Data Science", "Product Management")
- Calculate overall ranking percentile (e.g., "Top 25%", "Top 50%")
- Assess skill relevance percentage (0-100) based on how well resume skills match industry standards
- Calculate profile completeness percentage (0-100) based on resume detail and coverage

For Performance Comparison:
- Compare the user's Resume Quality score against industry average (typically 60-70)
- Compare the user's Video Presentation score against industry average (typically 55-65)
- Calculate Technical Skills score based on skills mentioned in resume and compare to average (typically 65-75)

For Improvement Roadmap:
- Generate 4-6 prioritized action items based on identified gaps and weaknesses
- Categorize by priority: high (Week 1), medium (Week 2), low (Week 3)
- Estimate impact points (how much each action would improve overall score)
- Provide realistic time estimates for each action item
- Calculate overall time estimate for all improvements`

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    })

    const responseContent = completion.choices[0].message.content
    let analysisResult

    try {
      analysisResult = JSON.parse(responseContent)
    } catch (parseError) {
      // Try to extract JSON if wrapped in markdown
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Failed to parse AI response as JSON')
      }
    }

    // Validate and ensure structure
    if (!analysisResult.overall_score || !analysisResult.parameters) {
      throw new Error('Invalid response structure from AI')
    }

    // Ensure all required sections are present with fallback data
    const resumeScore = analysisResult.parameters?.[0]?.score || analysisResult.overall_score || 78
    const videoScore = 82 // Default video score

    // Ensure Skills Gap Analysis
    if (!analysisResult.skills_gap_analysis) {
      analysisResult.skills_gap_analysis = {
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
    }

    // Ensure Industry Benchmarking
    if (!analysisResult.industry_benchmarking) {
      analysisResult.industry_benchmarking = {
        overall_ranking: overall_score >= 80 ? 'Top 25%' : overall_score >= 60 ? 'Top 50%' : 'Top 75%',
        skill_relevance: Math.min(overall_score + 7, 100),
        profile_completeness: Math.min(overall_score + 14, 100),
        industry: 'Software Engineering'
      }
    }

    // Ensure Performance Comparison
    if (!analysisResult.performance_comparison) {
      analysisResult.performance_comparison = {
        metrics: [
          {
            name: 'Resume Quality',
            user_score: resumeScore,
            average_score: 65
          },
          {
            name: 'Video Presentation',
            user_score: videoScore,
            average_score: 58
          },
          {
            name: 'Technical Skills',
            user_score: analysisResult.skills_gap_analysis?.overall_match || 85,
            average_score: 72
          }
        ]
      }
    }

    // Ensure Improvement Roadmap
    if (!analysisResult.improvement_roadmap || !analysisResult.improvement_roadmap.action_items) {
      analysisResult.improvement_roadmap = {
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
    }

    res.json(analysisResult)
  } catch (error) {
    console.error('Error processing resume-JD match:', error)
    
    // Clean up file if it still exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.status(500).json({ 
      error: error.message || 'An error occurred while processing your request' 
    })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

