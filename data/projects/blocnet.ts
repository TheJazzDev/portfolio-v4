import type { Project } from '@/lib/types';

export const blocnet: Project = {
  id: 'blocnet',
  title: 'Blocnet',
  years: '2024–now',
  role: 'Founder and lead engineer',
  tags: ['Mobile app', 'Admin panel', 'Landing page'],
  description:
    'A social platform for the crypto community. Users discover and follow projects, read a feed of their updates ranked by an AI engine, join community discussions, complete quests, run mining sessions for rewards, and hold, send and tip BNT, BNB and USDT from a built-in custodial wallet with KYC.',
  metrics: [
    { value: '270', label: 'API endpoints' },
    { value: '74', label: 'data models' },
    { value: '1,180+', label: 'automated tests' },
    { value: '38', label: 'admin console pages' },
  ],
  highlights: [
    'Custodial multi-asset wallet: Turnkey key custody, a double-entry ledger with 18-decimal precision and an idempotency key on every entry, an on-chain deposit indexer over HTTP and WebSocket, sweeps, and admin-reviewed withdrawals.',
    'BNT, an ERC-20 token written in Solidity and deployed to BNB Smart Chain testnet under a multisig owner, with its ABI and addresses exported straight into the backend.',
    'Blocnet Edge Engine, a Python service that scores every project update for quality, sentiment, urgency and actionability, falling back across Ollama, Groq and Gemini. The API calls it through a circuit breaker whose settings admins change at runtime.',
    'A NestJS API of 36 modules. Mining is serialised with Postgres advisory locks, and the feed went from 8 queries to 1, verified with a k6 load test of 1,000 concurrent readers.',
    'Admin two-factor sign-in with recovery codes, stackable roles with role impersonation for testing, and an audit log that tracks financial actions.',
  ],
  stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Flutter', 'Next.js', 'Python', 'FastAPI', 'Solidity', 'viem', 'Supabase', 'Railway'],
  links: [{ label: 'blocnet.app', href: 'https://blocnet.app' }],
};
