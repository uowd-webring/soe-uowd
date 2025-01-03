import { students } from './students';

// Available majors in the School of Engineering
export const majors = [
    "Computer Science",
    "Computer Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
] as const;


// Get unique years from the students array
export const getUniqueYears = () => {
    const years = Array.from(new Set(students.map(student => student.year))).sort();
    const aymanYear = students.find(s => s.name === "Ayman Mohammed")?.year;
    const tahaYear = students.find(s => s.name === "Taha Yaseen Parker")?.year;
    
    if (aymanYear && tahaYear) {
        return [aymanYear, tahaYear, ...years.filter(y => y !== aymanYear && y !== tahaYear)];
    }
    
    return years;
};
