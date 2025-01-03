export interface Student {
    name: string;
    year: number;
    major: string;
    portfolioLink: string;
}

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

