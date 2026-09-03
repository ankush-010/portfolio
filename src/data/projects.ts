import type { Project } from '../types'

// ── Projects are populated from real workspace data ─────────────────────────
// Architecture descriptions and features come directly from the project READMEs
// and ARCHITECTURE.md files in this repository.

const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. LifeOS AI — Most complex project, featured first
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lifeos-ai',
    title: 'LifeOS AI',
    tagline: 'AI-powered personal productivity platform with 9 integrated modules.',
    description:
      'LifeOS AI is a full-stack personal productivity platform that acts as an intelligent life operating system. It integrates nine functional modules — from task management and habit tracking to document intelligence and AI-assisted resume building — all enhanced by IBM watsonx.ai (Granite LLM).',
    problem:
      'Managing productivity across multiple tools (tasks, notes, expenses, habits, study plans) is fragmented. There is no single platform that combines all these workflows with AI assistance that understands your personal context.',
    solution:
      'A unified full-stack application with a React frontend and a Node.js/Express backend, connected to MongoDB Atlas for persistence and IBM watsonx.ai for AI inference. Every module is AI-enhanced — the assistant has full chat history and context, the resume builder gives ATS suggestions, and the study planner generates week-by-week AI schedules.',
    features: [
      'AI Chat Assistant — conversational assistant powered by IBM watsonx.ai (Granite-13b-chat-v2) with full session history',
      'Task Management — create, prioritize, and track tasks by status, priority, and category',
      'Smart Notes — markdown note-taking with pin support, search, and tagging',
      'Habit Tracker — daily/weekly habits with streak tracking and analytics dashboard',
      'Expense Manager — log expenses by category, set budgets, view spending trends',
      'AI Study Planner — generate week-by-week study schedules via watsonx.ai based on subject and exam date',
      'Resume Builder — build structured resumes with AI-powered ATS optimization suggestions',
      'Document Intelligence — upload PDF/DOCX/TXT files for AI-generated summaries and Q&A',
      'Unified Analytics — cross-module productivity insights on tasks, habits, expenses, and study activity',
      'JWT-based authentication with role-based access control (User / Admin)',
    ],
    architecture: `Three-tier architecture:
• Presentation: React 18 SPA (Vercel CDN edge)
• Application: Node.js/Express REST API (Render Web Service)
• Data: MongoDB Atlas M0 cluster (AWS us-east-1)
• AI: IBM watsonx.ai Granite-13b-chat-v2 via REST API (IAM key auth)

All inter-service communication over HTTPS. JWT tokens validated on every protected route. Multer handles file uploads with MIME type whitelist.`,
    tech: [
      'React 18',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'Mongoose',
      'IBM watsonx.ai',
      'JWT',
      'Multer',
      'bcrypt',
      'Helmet.js',
    ],
    challenges: [
      'Designing a scalable multi-module architecture where each module is independently maintainable',
      'Managing IBM watsonx.ai context windows and prompt formatting for high-quality AI responses',
      'Implementing secure file upload with MIME type validation, size limits, and safe text extraction from PDFs and DOCX files',
      'Building RBAC middleware that cleanly separates user and admin access without duplication',
    ],
    learnings: [
      'Full-stack architecture design: separating concerns across routes, controllers, services, and models',
      'IBM watsonx.ai integration patterns — IAM key authentication, Granite model prompt formatting',
      'JWT authentication with refresh strategies and token-secured file access',
      'MongoDB schema design for time-series habit data and nested resume structures',
      'Production deployment pipeline: Vercel (frontend) + Render (backend) + MongoDB Atlas (data)',
    ],
    github: 'https://github.com/ankush-010/LifeOS-AI',
    demo: undefined,
    status: 'complete',
    featured: true,
    category: ['Full Stack', 'AI', 'Node.js'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. IBM Investment Analyst Agent
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'investment-analyst-agent',
    title: 'IBM Investment Analyst Agent',
    tagline: 'AI-powered sequential analysis agent for investment research.',
    description:
      'An AI-powered investment analyst that automates multi-step financial analysis using IBM watsonx.ai. It executes a 6-step sequential pipeline — from financial data gathering to AI-generated investment recommendations — and visualises the full analysis on an interactive ECharts dashboard.',
    problem:
      'Investment research requires synthesising financial data, KPIs, ratios, peer benchmarks, and sentiment signals across multiple sources. This process is manual, time-consuming, and inconsistent without a structured analytical framework.',
    solution:
      'A sequential task agent built with Node.js and Express that orchestrates a deterministic 6-step analysis pipeline. IBM watsonx.ai (Granite model) generates the sentiment narrative and final investment recommendation. Results are displayed on a real-time interactive dashboard with ECharts visualisations.',
    features: [
      'Step 1 — Data Gathering: financial data and price history collection per ticker',
      'Step 2 — KPI Extraction: normalisation and computation of 20+ key performance metrics',
      'Step 3 — Ratio Analysis: composite quality scoring with interpretation',
      'Step 4 — Peer Benchmarking: sector percentile ranking against peer companies',
      'Step 5 — Sentiment Analysis: news and technical signal analysis via IBM watsonx.ai',
      'Step 6 — AI Recommendation: investment recommendation and risk factors generated by Granite-13b-instruct-v2',
      'Interactive ECharts dashboard with real-time pipeline progress indicators',
      'Demo mode: runs with deterministic fallback responses when IBM credentials are not configured',
      'REST API: GET /api/analyse?ticker=AAPL returns complete analysis JSON',
    ],
    architecture: `Sequential pipeline architecture:
• Express.js server orchestrates all 6 analysis steps in sequence
• Each step is a separate module (dataGathering → kpiExtraction → ratioAnalysis → benchmarking → sentimentAnalysis → recommendation)
• watsonx.js module handles IBM watsonx.ai REST API calls with IAM authentication
• Results are cached per ticker and streamed to the ECharts frontend dashboard`,
    tech: [
      'Node.js',
      'Express.js',
      'IBM watsonx.ai',
      'Granite-13b-instruct-v2',
      'ECharts',
      'JavaScript',
      'REST API',
    ],
    challenges: [
      'Designing a modular sequential pipeline where each step passes clean structured data to the next',
      'Prompt engineering for Granite to produce structured, actionable investment insights',
      'Building a graceful demo/fallback mode that works without IBM credentials — important for open-source sharing',
    ],
    learnings: [
      'IBM watsonx.ai API integration patterns including IAM token authentication and model parameter tuning',
      'Sequential agent design: how to break complex analysis into deterministic, testable pipeline steps',
      'ECharts data visualisation — rendering financial metrics as interactive charts',
      'Environment-based feature flagging (demo mode vs. real API mode)',
    ],
    github: 'https://github.com/ankush-010/investment-analyst-agent',
    demo: undefined,
    status: 'complete',
    featured: true,
    category: ['AI', 'Node.js', 'Backend'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Student Attendance Management System — Java/Spring Boot showcase
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'attendance-system',
    title: 'Student Attendance Management System',
    tagline: 'Full-stack attendance tracking with a Spring Boot REST API and plain JS frontend.',
    description:
      'A complete web application for managing student attendance, built with Java 17 and Spring Boot 3.2 on the backend and plain HTML/CSS/JavaScript on the frontend. Includes student CRUD, date-based attendance marking, attendance percentage reports, and a live dashboard.',
    problem:
      'Manual attendance tracking is error-prone and difficult to query for reports. Institutions need a reliable system to record, update, and analyse student attendance without complex setup.',
    solution:
      'A Spring Boot REST API following a clean layered architecture (Controller → Service → Repository) backed by MySQL and Spring Data JPA. The vanilla JS frontend consumes the API and provides a responsive multi-page interface for dashboard, student management, attendance marking, and reports.',
    features: [
      'Dashboard — real-time summary: total students, present/absent today, average attendance percentage',
      'Student Management — full CRUD: add, edit, delete, search students by name or roll number',
      'Attendance Marking — mark Present/Absent for any student on any date',
      'Attendance Reports — per-student attendance percentage with good/low attendance filters (≥75% threshold)',
      'Global Exception Handler — structured error responses for 404, 400, and server errors',
      'Server-side and client-side input validation',
      'REST API with 14 endpoints across Students, Attendance, and Dashboard resources',
    ],
    architecture: `Layered Spring Boot architecture:
• Controller layer: StudentController, AttendanceController, DashboardController
• Service layer: business logic, validation, DTO mapping
• Repository layer: Spring Data JPA interfaces (StudentRepository, AttendanceRepository)
• Model layer: Student and Attendance JPA entities with AttendanceStatus enum (PRESENT/ABSENT)
• Exception layer: GlobalExceptionHandler (@ControllerAdvice) for ResourceNotFoundException (404) and BadRequestException (400)
• Database: MySQL 8 with schema.sql setup script`,
    tech: [
      'Java 17',
      'Spring Boot 3.2',
      'Spring MVC',
      'Spring Data JPA',
      'Hibernate',
      'MySQL 8',
      'Maven',
      'REST API',
      'HTML5',
      'CSS3',
      'Vanilla JavaScript',
    ],
    challenges: [
      'Designing the layered architecture cleanly so controllers never contain business logic',
      'Handling duplicate roll numbers and concurrent attendance marking with proper 400/409 error responses',
      'CORS configuration for the decoupled plain-HTML frontend served on a different port',
    ],
    learnings: [
      'Spring Boot layered architecture in practice: Controllers, Services, Repositories, DTOs, and Entities',
      'Spring Data JPA — writing custom JPQL queries for attendance percentage calculations',
      'Global exception handling with @ControllerAdvice for consistent API error responses',
      'Building a complete REST API with proper HTTP semantics (201 Created, 204 No Content, 404, 400)',
    ],
    github: 'https://github.com/ankush-010/attendance-system',
    demo: undefined,
    status: 'complete',
    featured: true,
    category: ['Backend', 'Java', 'Spring Boot'],
  },
]

export default projects
