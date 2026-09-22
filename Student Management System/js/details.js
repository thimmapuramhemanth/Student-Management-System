import { getStudentById } from './service/studentService.js';
import { getQueryParam } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const studentId = getQueryParam('id');
    const container = document.getElementById('detailsContent');
    
    if (studentId) {
        const student = await getStudentById(studentId);
        if (student) {
            document.getElementById('avatar-letter').textContent = student.name.charAt(0);
            document.getElementById('detail-name').textContent = student.name;
            document.getElementById('detail-course').textContent = student.course;
            
            document.getElementById('info-id').textContent = student.id;
            document.getElementById('info-email').textContent = student.email;
            document.getElementById('info-phone').textContent = student.phone || 'N/A';
            document.getElementById('info-age').textContent = student.age ? `${student.age} years` : 'N/A';
            document.getElementById('info-city').textContent = student.city || 'N/A';
        } else {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-user-slash"></i><p>Student not found.</p></div>`;
        }
    } else {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>No Student ID provided.</p></div>`;
    }
});