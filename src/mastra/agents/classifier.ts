import { Agent } from "@mastra/core/agent";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const classifierAgent = new Agent({
  name: "Classifier Agent",
  instructions: "You are an expert incident classifier for IncidentIQ. Analyze the provided bug report or log and respond with ONLY a JSON object with these fields: category (SECURITY, PERFORMANCE, UI, or INFRA), severity (1-5 where 1=Low and 5=Emergency), and reasoning (brief explanation). SECURITY = unauthorized access or auth failures. PERFORMANCE = latency or memory issues. UI = visual bugs or frontend errors. INFRA = database down or server crashes.",
  model: groq("llama-3.3-70b-versatile"),
});