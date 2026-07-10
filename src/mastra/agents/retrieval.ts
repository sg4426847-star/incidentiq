import { Agent } from "@mastra/core/agent";
import { createGroq } from "@ai-sdk/groq";
import { QdrantClient } from "@qdrant/js-client-rest";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const retrievalAgent = new Agent({
  name: "Retrieval Agent",
  instructions: "You are a retrieval specialist for IncidentIQ. Search for similar past incidents and return relevant context. When given an incident description, analyze it and provide context from historical incidents.",
  model: groq("llama-3.3-70b-versatile"),
});

export { qdrant };