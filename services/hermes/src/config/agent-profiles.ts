export type AgentProfile = {
  id: string
  name: string
  role: string
  purpose: string
  cadence: string
  files: {
    soul: string
  }
}

export const agentProfiles: AgentProfile[] = [
  {
    id: 'hermes',
    name: 'Hermes',
    role: 'Mission Operator',
    purpose:
      'Owns the nonprofit operations layer, public trust posture, routing logic, and mission coherence across products.',
    cadence: 'Always available, with scheduled reviews and event-driven tasks.',
    files: {
      soul: 'services/hermes/agents/hermes/SOUL.md',
    },
  },
  {
    id: 'grant-hunter',
    name: 'Grant Hunter',
    role: 'Funding Strategy',
    purpose:
      'Researches grants, frames applications, and keeps the funding pipeline aligned to the four pillars.',
    cadence: 'Weekly scans plus manual launches for priority opportunities.',
    files: {
      soul: 'services/hermes/agents/grant-hunter/SOUL.md',
    },
  },
  {
    id: 'trust-steward',
    name: 'Trust Steward',
    role: 'Verification and Public Proof',
    purpose:
      'Maintains the trust center, verification copy, document metadata, and integrity of public claims.',
    cadence: 'Daily content checks and release review support.',
    files: {
      soul: 'services/hermes/agents/trust-steward/SOUL.md',
    },
  },
  {
    id: 'content-engine',
    name: 'Content Engine',
    role: 'Field Publishing',
    purpose:
      'Turns documented field work into journal entries, updates, media support, and donor-friendly narratives.',
    cadence: 'Three publishing beats per week plus campaign support.',
    files: {
      soul: 'services/hermes/agents/content-engine/SOUL.md',
    },
  },
]
