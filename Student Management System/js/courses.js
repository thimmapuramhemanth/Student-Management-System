import { getCourses, addCourse } from './service/courseService.js';
import { clearForm, showToast } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    document.getElementById('courseForm').addEventListener('submit', handleAddCourse);
});

async function loadCourses() {
    const courses = await getCourses();
    const tbody = document.getElementById('courseTableBody');
    tbody.innerHTML = '';

    courses.forEach(course => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="badge badge-primary">#${course.id}</span></td>
            <td><strong>${course.title}</strong><br><small class="text-muted">${course.duration}</small></td>
            <td>${course.instructor}</td>
            <td>${course.credits} Credits</td>
        `;
        tbody.appendChild(tr);
    });
}

async function handleAddCourse(event) {
    event.preventDefault();
    try {
        const title = document.getElementById('courseTitle').value;
        const instructor = document.getElementById('courseInstructor').value;
        const duration = document.getElementById('courseDuration').value;
        const credits = parseInt(document.getElementById('courseCredits').value);

        await addCourse({ title, instructor, duration, credits });
        showToast('Course added successfully!', 'success');
        
        clearForm('courseForm');
        loadCourses();
    } catch (error) {
        showToast('Failed to add course.', 'error');
    }
}