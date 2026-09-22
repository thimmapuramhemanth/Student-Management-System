import { getStudents, addStudent, updateStudent, deleteStudent } from './service/studentService.js';
import { ValidationException, handleValidationError } from '../exception/validationException.js';
import { clearForm, showToast } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
    
    // Bind search inputs
    document.getElementById('searchName')?.addEventListener('input', loadStudents);
    document.getElementById('filterCourse')?.addEventListener('input', loadStudents);
});

async function loadStudents() {
    const searchName = document.getElementById('searchName')?.value.toLowerCase().trim() || '';
    const filterCourse = document.getElementById('filterCourse')?.value.toLowerCase().trim() || '';
    
    let students = await getStudents();
    
    // Client-Side Filtering
    if (searchName) {
        students = students.filter(s => s.name?.toLowerCase().includes(searchName));
    }
    if (filterCourse) {
        students = students.filter(s => s.course?.toLowerCase().includes(filterCourse));
    }
    
    renderTable(students);
}

function renderTable(students) {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #a1a5b7; padding: 2rem;">No students found.</td></tr>`;
        return;
    }

    students.forEach(student => {
        const studentName = student.name || 'Unknown Name';
        const studentEmail = student.email || 'No email provided';
        const initial = studentName.charAt(0).toUpperCase();
        
        // Display the actual Database ID
        const displayId = student.id; 

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="badge badge-primary">#${displayId}</span></td>
            <td>
                <div class="user-info">
                    <div class="avatar-small">${initial}</div>
                    <div>
                        <strong style="color: #181c32;">${studentName}</strong><br>
                        <span style="font-size: 0.8rem; color: #a1a5b7;">${studentEmail}</span>
                    </div>
                </div>
            </td>
            <td>${student.course || '-'}</td>
            <td>${student.city || '-'}</td>
            <td style="display: flex; gap: 5px;">
                <button class="btn-icon" onclick="window.editStudent('${student.id}', '${studentName}', '${studentEmail}', '${student.phone || ''}', '${student.age || ''}', '${student.course || ''}', '${student.city || ''}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="window.deleteStudentHandler('${student.id}')" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();
    try {
        const id = document.getElementById('studentId').value;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        
        const phoneEl = document.getElementById('phone');
        const phone = phoneEl ? phoneEl.value.trim() : '';
        
        const ageEl = document.getElementById('age');
        const age = ageEl && ageEl.value ? parseInt(ageEl.value) : null;
        
        const course = document.getElementById('course').value.trim();
        
        const cityEl = document.getElementById('city');
        const city = cityEl ? cityEl.value.trim() : '';

        if (!name || !email || !course) {
            throw new ValidationException("Name, Email, and Course are required fields.");
        }

        const studentData = { name, email, phone, age, course, city, status: "Active" };
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        submitBtn.disabled = true;

        if (id) {
            await updateStudent(id, studentData);
            showToast('Student updated successfully!', 'success');
        } else {
            // Force strict numeric ID generation for the database
            const currentStudents = await getStudents();
            let maxId = 0;
            
            currentStudents.forEach(s => {
                const numericId = parseInt(s.id);
                if (!isNaN(numericId) && numericId > maxId) {
                    maxId = numericId;
                }
            });
            
            // Assign the next sequential number before sending to JSON server
            studentData.id = (maxId + 1).toString();
            
            await addStudent(studentData);
            showToast('Student added successfully!', 'success');
        }

        clearForm('studentForm');
        document.getElementById('studentId').value = '';
        document.getElementById('formTitle').innerHTML = '<i class="fas fa-user-plus"></i> Add Student';
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reload table to reflect changes
        await loadStudents();
    } catch (error) {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Student';
        }
        if (error instanceof ValidationException) {
            handleValidationError(error);
        } else {
            console.error("Submission error:", error);
        }
    }
}

window.editStudent = (id, name, email, phone, age, course, city) => {
    document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('course').value = course;
    
    if (document.getElementById('phone')) document.getElementById('phone').value = phone;
    if (document.getElementById('age')) document.getElementById('age').value = age !== 'null' ? age : '';
    if (document.getElementById('city')) document.getElementById('city').value = city !== 'undefined' ? city : '';
    
    document.getElementById('formTitle').innerHTML = '<i class="fas fa-user-edit"></i> Edit Student';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.deleteStudentHandler = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
        await deleteStudent(id);
        showToast('Student deleted successfully!', 'success');
        await loadStudents();
    }
};