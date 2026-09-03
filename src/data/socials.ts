import type { Social, CodingProfile } from '../types'

// ── PLACEHOLDERS — Replace all PLACEHOLDER_* values before deploying ────────
// These are deliberately marked so they are easy to find and update.

export const socials: Social[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/ankush-010',
    icon: 'github',
    username: 'ankush-010',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ankush-kumar-a0a042336/',
    icon: 'linkedin',
    username: 'ankush-kumar-a0a042336',
  },
  {
    label: 'Email',
    url: 'mailto:ankushkumawat112@gmail.com',
    icon: 'mail',
    username: 'ankushkumawat112@gmail.com',
  },
]

export const codingProfiles: CodingProfile[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/ankush-010',
    username: 'ankush-010',
    icon: 'github',
    description: 'Source code, projects and open-source contributions.',
  },
  {
    platform: 'LeetCode',
    url: 'https://leetcode.com/PLACEHOLDER_YOUR_LEETCODE_USERNAME',
    username: 'PLACEHOLDER_YOUR_LEETCODE_USERNAME',
    icon: 'code',
    description: 'DSA practice — arrays, trees, graphs, dynamic programming.',
  },
  {
    platform: 'CodeChef',
    url: 'https://codechef.com/users/PLACEHOLDER_YOUR_CODECHEF_USERNAME',
    username: 'PLACEHOLDER_YOUR_CODECHEF_USERNAME',
    icon: 'trophy',
    description: 'Competitive programming contests and practice.',
  },
  {
    platform: 'GeeksforGeeks',
    url: 'https://geeksforgeeks.org/user/PLACEHOLDER_YOUR_GFG_USERNAME',
    username: 'PLACEHOLDER_YOUR_GFG_USERNAME',
    icon: 'book-open',
    description: 'CS fundamentals, DSA articles and problem solutions.',
  },
]
