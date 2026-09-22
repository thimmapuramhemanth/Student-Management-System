import { getStudents } from './studentService.js';
import { getCourses } from './courseService.js';

export async function getDashboardStats() {
    const students = await getStudents();
    const courses = await getCourses();
    
    const activeStudents = students.filter(s => s.status !== 'Inactive').length;
    
    return {
        totalStudents: students.length,
        activeStudents: activeStudents,
        totalCourses: courses.length,
        recentStudents: students.slice(-4).reverse()
    };
}