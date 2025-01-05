import { students, Student } from './students';

export { students };
export type { Student };

export const majors = [
  "Computer Engineering",
  "Electrical Engineering",
  "Telecommunications Engineering",
  "Mechanical Engineering",
  "Mechatronic Engineering",
  "Civil Engineering"
] as const;

// Get unique years from the students array
export const getUniqueYears = () => {
  const priorityNames = ["Ayman Mohammed", "Taha Parker"];
  const sortedStudents = students.sort((a, b) => {
    // Check if either student is in priority names
    const aIsPriority = priorityNames.includes(a.name);
    const bIsPriority = priorityNames.includes(b.name);

    if (aIsPriority && !bIsPriority) return -1;
    if (!aIsPriority && bIsPriority) return 1;
    if (aIsPriority && bIsPriority) {
      return priorityNames.indexOf(a.name) - priorityNames.indexOf(b.name);
    }

    // If neither is priority, sort by year and then name
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.name.localeCompare(b.name);
  });

  return Array.from(new Set(sortedStudents.map(student => student.year))).sort();
};