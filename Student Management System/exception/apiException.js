import { showToast } from '../js/utils.js';

export class ApiException extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiException";
        this.status = status;
    }
}

export function handleApiError(error) {
    console.error("API Error Log:", error);
    showToast(`API Error: ${error.message}`, 'error');
}