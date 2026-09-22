import { showToast } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('settingsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Mocking a save delay
        const btn = e.target.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            showToast('Institution settings updated successfully!', 'success');
        }, 800);
    });
});