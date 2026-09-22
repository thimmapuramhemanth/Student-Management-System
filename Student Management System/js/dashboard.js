import { getDashboardStats } from './service/dashboardService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const stats = await getDashboardStats();
    
    // Populate Stat Cards
    document.getElementById('stat-total-students').textContent = stats.totalStudents;
    document.getElementById('stat-active-students').textContent = stats.activeStudents;
    document.getElementById('stat-total-courses').textContent = stats.totalCourses;
    
    // Populate Recent Activity Table
    const tbody = document.getElementById('recent-activity-body');
    stats.recentStudents.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="user-info">
                    <div class="avatar-small">${student.name.charAt(0)}</div>
                    <strong>${student.name}</strong>
                </div>
            </td>
            <td>${student.course}</td>
            <td><span class="badge ${student.status === 'Active' ? 'badge-success' : 'badge-gray'}">${student.status || 'Active'}</span></td>
        `;
        tbody.appendChild(tr);
    });

    // Initialize Chart.js (Requires Chart.js CDN in HTML)
    const ctx = document.getElementById('enrollmentChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CS', 'Math', 'Physics', 'Biology', 'Chemistry'],
            datasets: [{
                label: 'Enrolled Students',
                data: [45, 25, 30, 15, 20],
                backgroundColor: '#4f46e5',
                borderRadius: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
});