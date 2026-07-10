# IncidentIQ 🚨

AI-Powered Incident Response & Post-Mortem System built for HiDevs × Mastra Hackathon 2026.

## What is IncidentIQ?

IncidentIQ is a multi-agent AI system that automatically triages software incidents, generates remediation plans, and creates post-mortem reports in seconds.

## Tech Stack

- **Mastra** - Agent orchestration & workflows
- **Groq (LLaMA 3.3-70b)** - AI Language Model
- **Qdrant Cloud** - Vector database for institutional memory
- **Enkrypt AI** - Safety guardrails & hallucination detection
- **Next.js** - Frontend dashboard
- **TypeScript** - All code

## Agents

1. **Classifier Agent** - Classifies incident by category & severity
2. **Retrieval Agent** - Searches similar past incidents in Qdrant
3. **Security Specialist** - Analyzes security incidents
4. **Performance Specialist** - Analyzes performance issues
5. **UI/Infra Specialist** - Analyzes UI & infrastructure issues
6. **Remediation Agent** - Creates comprehensive fix plan
7. **Post-Mortem Agent** - Generates structured report

## Setup

Clone the repo:
git clone https://github.com/sg4426847-star/incidentiq.git
cd incidentiq

Install dependencies:
npm install

Add environment variables in .env file:
GROQ_API_KEY=your_key
QDRANT_URL=your_url
QDRANT_API_KEY=your_key
ENKRYPT_API_KEY=your_key

Start Mastra server:
npm run dev

In another terminal, start frontend:
cd frontend
npm run dev

## Usage

1. Open http://localhost:3000
2. Paste your incident report or logs
3. Click "Analyze Incident"
4. Get complete post-mortem report instantly!

## How It Works

Bug Report Input
      ↓
Classifier Agent (category + severity)
      ↓
Retrieval Agent (search Qdrant for similar incidents)
      ↓
Specialist Agent (Security/Performance/UI)
      ↓
Remediation Agent (fix plan + confidence score)
      ↓
Enkrypt AI (safety validation)
      ↓
Post-Mortem Agent (final report)
      ↓
Display on Dashboard

## Problem Statement

Incident Response & Post-Mortem Agent - Track 5, HiDevs × Mastra Hackathon 2026