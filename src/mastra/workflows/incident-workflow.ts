import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import { validateWithEnkrypt } from "../agents/enkrypt";

const classifyStep = createStep({
  id: "classify-incident",
  description: "Classify the incident by category and severity",
  inputSchema: z.object({
    incidentReport: z.string(),
  }),
  outputSchema: z.object({
    category: z.string(),
    severity: z.number(),
    reasoning: z.string(),
    incidentReport: z.string(),
  }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra?.getAgent("classifierAgent");
    const result = await agent?.generate(inputData.incidentReport);
    
    let parsed;
    try {
      const text = result?.text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(text!);
    } catch {
      parsed = { category: "INFRA", severity: 3, reasoning: result?.text };
    }
    
    return {
      ...parsed,
      incidentReport: inputData.incidentReport,
    };
  },
});

const remediationStep = createStep({
  id: "remediate-incident",
  description: "Generate remediation plan",
  inputSchema: z.object({
    category: z.string(),
    severity: z.number(),
    reasoning: z.string(),
    incidentReport: z.string(),
  }),
  outputSchema: z.object({
    remediationPlan: z.string(),
    category: z.string(),
    severity: z.number(),
    incidentReport: z.string(),
    enkryptValidation: z.object({
      isSafe: z.boolean(),
      score: z.number(),
      reason: z.string(),
    }),
  }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra?.getAgent("remediationAgent");
    const prompt = `Incident: ${inputData.incidentReport}\nCategory: ${inputData.category}\nSeverity: ${inputData.severity}\nAnalysis: ${inputData.reasoning}`;
    const result = await agent?.generate(prompt);
    
    const enkryptValidation = await validateWithEnkrypt(result?.text || "");
    
    return {
      remediationPlan: result?.text || "",
      category: inputData.category,
      severity: inputData.severity,
      incidentReport: inputData.incidentReport,
      enkryptValidation,
    };
  },
});

const postMortemStep = createStep({
  id: "generate-postmortem",
  description: "Generate post-mortem report",
  inputSchema: z.object({
    remediationPlan: z.string(),
    category: z.string(),
    severity: z.number(),
    incidentReport: z.string(),
    enkryptValidation: z.object({
      isSafe: z.boolean(),
      score: z.number(),
      reason: z.string(),
    }),
  }),
  outputSchema: z.object({
    postMortemReport: z.string(),
    enkryptValidation: z.object({
      isSafe: z.boolean(),
      score: z.number(),
      reason: z.string(),
    }),
  }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra?.getAgent("postMortemAgent");
    const prompt = `Incident: ${inputData.incidentReport}\nCategory: ${inputData.category}\nSeverity: ${inputData.severity}\nRemediation: ${inputData.remediationPlan}`;
    const result = await agent?.generate(prompt);
    
    return {
      postMortemReport: result?.text || "",
      enkryptValidation: inputData.enkryptValidation,
    };
  },
});

export const incidentWorkflow = createWorkflow({
  id: "incident-response-workflow",
  description: "Complete incident response workflow",
  inputSchema: z.object({
    incidentReport: z.string(),
  }),
  outputSchema: z.object({
    postMortemReport: z.string(),
    enkryptValidation: z.object({
      isSafe: z.boolean(),
      score: z.number(),
      reason: z.string(),
    }),
  }),
})
  .then(classifyStep)
  .then(remediationStep)
  .then(postMortemStep)
  .commit();