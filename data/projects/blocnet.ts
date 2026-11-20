import type { Project } from '@/lib/types';

export const blocnet: Project = {
  id: 'blocnet',
  title: 'Blocnet',
  years: '2024–now',
  role: 'Founder and engineer',
  tags: ['Mobile app', 'Admin panel', 'Landing page'],
  description:
    'A social app for crypto communities. Users follow projects, read a ranked feed of project updates, join discussions, complete quests and mine rewards. A built-in custodial wallet holds, sends and tips BNT, BNB and USDT.',
  metrics: [
    { value: '390', label: 'API endpoints' },
    { value: '97', label: 'data models' },
    { value: '1,180+', label: 'automated tests' },
    { value: '38', label: 'admin console pages' },
  ],
  highlights: [
    'The wallet keeps its keys in Turnkey and records every movement in a double-entry ledger with an idempotency key on each entry. An indexer picks up on-chain deposits, and an admin reviews every withdrawal.',
    'BNT is an ERC-20 token I wrote in Solidity and deployed to BNB Smart Chain testnet under a multisig owner.',
    'A Python service scores each project update for quality, sentiment and urgency, using Ollama, Groq or Gemini depending on which is available. The API calls it through a circuit breaker.',
    'I cut the feed from 8 database queries to 1 and load-tested it in k6 with 1,000 concurrent readers. Mining is serialised with Postgres advisory locks.',
    'The admin console has two-factor sign-in, stackable roles and an audit log of financial actions.',
  ],
  stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Flutter', 'Next.js', 'Python', 'FastAPI', 'Solidity', 'viem', 'Supabase', 'Railway'],
  links: [{ label: 'blocnet.app', href: 'https://blocnet.app' }],
};
