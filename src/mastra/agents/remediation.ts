import { Agent } from "@mastra/core/agent";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const remediationAgent = new Agent({
  name: "Remediation Agent",
  instructions: "You are a remediation expert for IncidentIQ. Based on the incident analysis from specialist agents, create a comprehensive remediation plan. Include: 1) Immediate actions to take, 2) Root cause, 3) Step-by-step fix instructions, 4) Prevention recommendations. Provide a confidence score from 0 to 1 for your remediation plan.",
  model: groq("llama-3.3-70b-versatile"),
});