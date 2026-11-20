import type { Project } from '@/lib/types';

export const vomChurch: Project = {
  id: 'vom-church',
  title: 'VOM Church',
  years: '2025',
  role: 'Lead engineer',
  tags: ['Mobile app', 'Admin panel'],
  description:
    'A mobile app for members of Valley of Mercy church, with a web admin for staff. Members follow sermons, Bible study and prayer requests. Staff manage members, attendance and announcements.',
  highlights: [
    'Members sign in by email or phone OTP, and existing members can find and activate their accounts.',
    'Daily prayer and study earn points, badges and streaks, with a leaderboard.',
    'Push notifications go out in batches through Expo, with delivery receipts.',
    'Admin access is split by team (programme, treasury, secretariat) and checked on the server.',
  ],
  stack: ['React Native', 'Expo', 'Next.js', 'Firebase', 'Redux Toolkit', 'TanStack Query', 'NativeWind'],
  links: [],
};
