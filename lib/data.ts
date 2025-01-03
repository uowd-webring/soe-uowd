// Types for our student entries
export interface Student {
  name: string;
  year: number;
  major: string;
  portfolioLink: string;
}

// Available majors in the School of Engineering
export const majors = [
  "Computer Science",
  "Computer Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
] as const;

// Sample data - in production, this could be loaded from a JSON file or API
export const students: Student[] = [
  {
    name: "Alex Thompson",
    year: 2024,
    major: "Computer Science",
    portfolioLink: "https://alexthompson.dev"
  },
  {
    name: "Sarah Chen",
    year: 2025,
    major: "Electrical Engineering",
    portfolioLink: "https://sarahchen.io"
  },
  // Add more student entries here
];

// Get unique years from the students array
export const getUniqueYears = () => {
  return Array.from(new Set(students.map(student => student.year))).sort();
};

