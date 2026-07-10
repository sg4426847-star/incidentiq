import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { classifierAgent } from './agents/classifier';
import { retrievalAgent } from './agents/retrieval';
import { securitySpecialistAgent, performanceSpecialistAgent, infraSpecialistAgent } from './agents/specialists';
import { remediationAgent } from './agents/remediation';
import { postMortemAgent } from './agents/postmortem';
import { incidentWorkflow } from './workflows/incident-workflow';

export const mastra = new Mastra({
  agents: { 
    classifierAgent, 
    retrievalAgent,
    securitySpecialistAgent,
    performanceSpecialistAgent,
    infraSpecialistAgent,
    remediationAgent,
    postMortemAgent
  },
  workflows: {
    incidentWorkflow
  },
  logger: new PinoLogger({
    name: 'IncidentIQ',
    level: 'info',
  }),
});