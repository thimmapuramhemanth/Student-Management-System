import { showToast } from '../js/utils.js';

export class ValidationException extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationException";
    }
}

export function handleValidationError(error) {
    console.warn("Validation Error Log:", error);
    showToast(`Validation Failed: ${error.message}`, 'error');
}