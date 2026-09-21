import type { SkillGroup } from '../sections/types'

const skills: SkillGroup[] = [
  {
    category: 'Languages',
    icon: 'code-2',
    skills: [
      { name: 'Java', level: 'primary' },
      { name: 'Python', level: 'secondary' },
      // { name: 'JavaScript', level: 'secondary' },
      // { name: 'TypeScript', level: 'secondary' },
      { name: 'SQL', level: 'primary' },
    ],
  },
  {
    category: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Spring Boot', level: 'primary' },
      { name: 'Spring MVC', level: 'primary' },
      { name: 'REST APIs', level: 'primary' },
      { name: 'Spring Data JPA', level: 'primary' },
      { name: 'Hibernate', level: 'secondary' },
      { name: 'Maven', level: 'primary' },
      { name: 'Node.js', level: 'secondary' },
      { name: 'Express.js', level: 'secondary' },
    ],
  },
  {
    category: 'Database',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', level: 'primary' },
      { name: 'MySQL', level: 'primary' },
      { name: 'MongoDB', level: 'secondary' },
      { name: 'DBMS', level: 'primary' },
    ],
  },
  {
    category: 'Frontend',
    icon: 'layout',
    skills: [
      { name: 'HTML', level: 'primary' },
      { name: 'CSS', level: 'primary' },
      { name: 'React', level: 'secondary' },
      { name: 'Tailwind CSS', level: 'secondary' },
      { name: 'Vite', level: 'secondary' },
    ],
  },
  {
    category: 'CS Fundamentals',
    icon: 'cpu',
    skills: [
      { name: 'DSA', level: 'primary' },
      { name: 'OOP', level: 'primary' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 'primary' },
      { name: 'GitHub', level: 'primary' },
      { name: 'IntelliJ IDEA', level: 'primary' },
      { name: 'VS Code', level: 'primary' },
      { name: 'Docker', level: 'secondary' },
      { name: 'Postman', level: 'primary' },
    ],
  },
  // {
  //   category: 'AI & Cloud',
  //   icon: 'brain',
  //   skills: [
  //     { name: 'IBM watsonx.ai', level: 'primary' },
  //     { name: 'Cloud Computing', level: 'secondary' },
  //     { name: 'DevOps', level: 'secondary' },
  //   ],
  // },
]

export default skills
