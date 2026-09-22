import { API_BASE_URL } from './apiConfig.js';
import { ApiException, handleApiError } from '../../exception/apiException.js';

export async function getCourses(searchQuery = '') {
    try {
        let url = `${API_BASE_URL}/courses`;
        if (searchQuery) url += `?title_like=${searchQuery}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        handleApiError(new ApiException("Failed to fetch courses.", error.response?.status));
        return [];
    }
}

export async function addCourse(courseData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/courses`, courseData);
        return response.data;
    } catch (error) {
        handleApiError(new ApiException("Failed to add course.", error.response?.status));
        throw error;
    }
}