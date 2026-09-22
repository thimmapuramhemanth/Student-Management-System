import { API_BASE_URL } from './apiConfig.js';
import { ApiException, handleApiError } from '../../exception/apiException.js';

// We fetch all students and let main.js handle the filtering perfectly
export async function getStudents() {
    try {
        const response = await axios.get(`${API_BASE_URL}/students`);
        return response.data;
    } catch (error) {
        handleApiError(new ApiException("Failed to fetch students.", error.response?.status));
        return [];
    }
}

export async function getStudentById(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(new ApiException(`Failed to fetch student with ID ${id}.`, error.response?.status));
        return null;
    }
}

export async function addStudent(studentData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/students`, studentData);
        return response.data;
    } catch (error) {
        handleApiError(new ApiException("Failed to add student.", error.response?.status));
        throw error;
    }
}

export async function updateStudent(id, studentData) {
    try {
        const response = await axios.put(`${API_BASE_URL}/students/${id}`, studentData);
        return response.data;
    } catch (error) {
        handleApiError(new ApiException("Failed to update student.", error.response?.status));
        throw error;
    }
}

export async function deleteStudent(id) {
    try {
        await axios.delete(`${API_BASE_URL}/students/${id}`);
    } catch (error) {
        handleApiError(new ApiException("Failed to delete student.", error.response?.status));
        throw error;
    }
}