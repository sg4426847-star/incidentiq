import { Agent } from "@mastra/core/agent";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const postMortemAgent = new Agent({
  name: "Post-Mortem Agent",
  instructions: "You are a post-mortem specialist for IncidentIQ. Generate comprehensive post-mortem reports after incident resolution. Your report must include: 1) Executive Summary, 2) Incident Timeline, 3) Root Cause Analysis, 4) Impact Assessment, 5) Resolution Steps Taken, 6) Prevention Recommendations, 7) Action Items. Format the report in a clear, professional structure.",
  model: groq("llama-3.3-70b-versatile"),
});