import type { Project } from '@/lib/types';

export const vomChurch: Project = {
  id: 'vom-church',
  title: 'VOM Church',
  years: '2025',
  role: 'Lead engineer',
  tags: ['Mobile app', 'Admin panel'],
  description:
    'A mobile app for the members of Valley of Mercy church and a web admin for its staff. Members follow sermons, Bible study, prayer requests, testimonies and the church programme, and find each other in a directory. Staff manage members, first-timers, attendance, departments and push announcements.',
  highlights: [
    'Engagement built in: points for daily prayer, study and sermons, 30+ badges, day streaks and a leaderboard.',
    'Sign-in by email or phone OTP, with a flow for existing members to find and activate their accounts.',
    'Role-based admin access for teams such as programme, treasury and secretariat, enforced by permission guards, with Firebase session cookies verified on the server.',
    'Push notifications sent in batches through Expo with delivery receipts, member CSV import and export, and Android builds produced by CI.',
  ],
  stack: ['React Native', 'Expo', 'Next.js', 'Firebase', 'Redux Toolkit', 'TanStack Query', 'NativeWind'],
  links: [],
};
