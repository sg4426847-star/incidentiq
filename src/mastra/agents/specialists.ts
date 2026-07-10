import { Agent } from "@mastra/core/agent";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const securitySpecialistAgent = new Agent({
  name: "Security Specialist Agent",
  instructions: "You are a security expert for IncidentIQ. Analyze security incidents and provide root cause analysis and remediation steps.",
  model: groq("llama-3.3-70b-versatile"),
});

export const performanceSpecialistAgent = new Agent({
  name: "Performance Specialist Agent",
  instructions: "You are a performance expert for IncidentIQ. Analyze performance incidents and provide root cause analysis.",
  model: groq("llama-3.3-70b-versatile"),
});

export const infraSpecialistAgent = new Agent({
  name: "UI/Infra Specialist Agent",
  instructions: "You are a UI and infrastructure expert for IncidentIQ. Analyze UI bugs and infrastructure failures.",
  model: groq("llama-3.3-70b-versatile"),
});